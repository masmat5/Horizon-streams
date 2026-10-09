// Errors whose message is safe to show to the admin (bad input). Anything else is a 500.
class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ValidationError';
  }
}

module.exports = { ValidationError };
