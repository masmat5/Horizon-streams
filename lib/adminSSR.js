const { getSession } = require('./auth');

// getServerSideProps helper: redirect to the login page unless an admin session exists.
function adminOnly(inner) {
  return async (ctx) => {
    if (!getSession(ctx.req)) return { redirect: { destination: '/admin/login', permanent: false } };
    ctx.res.setHeader('Cache-Control', 'no-store');
    return inner ? inner(ctx) : { props: {} };
  };
}

module.exports = { adminOnly };
