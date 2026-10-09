const mysql = require('mysql2/promise');

// In production a missing DB setting must fail loudly, not silently fall back to "root / no password".
function dbConfig() {
  const env = process.env;
  if (env.NODE_ENV === 'production') {
    const missing = ['DB_HOST', 'DB_USER', 'DB_NAME'].filter((k) => !env[k]);
    if (env.DB_PASSWORD === undefined) missing.push('DB_PASSWORD'); // may be empty on a local DB, but must be set on purpose
    if (missing.length) throw new Error(`Missing environment variables: ${missing.join(', ')}`);
  }
  return {
    host: env.DB_HOST || 'localhost',
    port: Number(env.DB_PORT || 3306),
    user: env.DB_USER || 'root',
    password: env.DB_PASSWORD || '',
    database: env.DB_NAME || 'horizonstream',
  };
}

// One pool + one schema check per Node process (survives Next.js dev hot reloads).
function getPool() {
  if (!global.__hsPool) {
    global.__hsPool = mysql.createPool({
      ...dbConfig(),
      waitForConnections: true,
      connectionLimit: 8,
      queueLimit: 100, // beyond this, fail fast instead of piling up requests forever
      connectTimeout: 10000,
      charset: 'utf8mb4',
      timezone: 'Z', // store and read every DATETIME as UTC
    });
  }
  return global.__hsPool;
}

const SCHEMA = `
CREATE TABLE IF NOT EXISTS posts (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  slug VARCHAR(190) NOT NULL,
  title VARCHAR(255) NOT NULL,
  category VARCHAR(60) NOT NULL DEFAULT 'News',
  excerpt VARCHAR(600) NOT NULL DEFAULT '',
  content MEDIUMTEXT NOT NULL,
  image VARCHAR(500) NOT NULL DEFAULT '',
  author VARCHAR(120) NOT NULL DEFAULT 'HorizonStream IPTV Team',
  status ENUM('draft','published') NOT NULL DEFAULT 'published',
  published_at DATETIME NOT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_posts_slug (slug),
  KEY idx_posts_listing (status, published_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`;

async function db() {
  const pool = getPool();
  if (!global.__hsSchema) {
    global.__hsSchema = pool.query(SCHEMA).catch((err) => {
      global.__hsSchema = null; // retry on next request
      throw err;
    });
  }
  await global.__hsSchema;
  return pool;
}

module.exports = { db, getPool };
