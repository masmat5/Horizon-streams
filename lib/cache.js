// Tiny in-memory TTL cache so a traffic spike hits MySQL once a minute, not once per visitor.
// The app runs as one Node process, so a plain Map is enough; admin writes clear it.
//
// Concurrent misses for the same key share ONE loader call (single-flight). Without this, 100 visitors
// arriving together after a cache expiry would run 100 identical queries and overflow the DB pool.
const store = global.__hsCache || (global.__hsCache = new Map());

async function cached(key, ttlMs, loader, missTtlMs = ttlMs) {
  const hit = store.get(key);
  if (hit && hit.expires > Date.now()) return hit.promise;

  if (store.size > 500) store.clear(); // hard cap: search queries are user-controlled keys

  const entry = { expires: Infinity, promise: null };
  entry.promise = Promise.resolve()
    .then(loader)
    .then((value) => {
      entry.expires = Date.now() + (value == null ? missTtlMs : ttlMs);
      return value;
    })
    .catch((err) => {
      if (store.get(key) === entry) store.delete(key); // never cache failures
      throw err;
    });
  store.set(key, entry);
  return entry.promise;
}

function clearCache() {
  store.clear();
}

module.exports = { cached, clearCache };
