const { ValidationError } = require('./errors');

// Wraps an API route: method allow-list + one place that turns errors into JSON.
// ValidationError -> 400 with its message. Anything else -> logged, generic 500 (no internals leaked).
function handle(methods, fn) {
  return async (req, res) => {
    try {
      if (!methods.includes(req.method)) {
        res.setHeader('Allow', methods.join(', '));
        return res.status(405).json({ error: 'Method not allowed' });
      }
      return await fn(req, res);
    } catch (err) {
      if (err instanceof ValidationError) return res.status(400).json({ error: err.message });
      console.error('[api]', req.method, req.url, err);
      if (!res.headersSent) return res.status(500).json({ error: 'Something went wrong on the server. Please try again.' });
      return undefined;
    }
  };
}

module.exports = { handle };
