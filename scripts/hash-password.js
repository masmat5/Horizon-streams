// Usage: npm run admin:hash -- "your password"
// Prints the value to put in ADMIN_PASSWORD_HASH.
const { hashPassword } = require('../lib/auth');

const pw = process.argv[2];
if (!pw || pw.length < 10) {
  console.error('Give a password of at least 10 characters:  npm run admin:hash -- "your password"');
  process.exit(1);
}
console.log(hashPassword(pw));
