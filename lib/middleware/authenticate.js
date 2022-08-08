const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
  /*
    TODO: Check for the session cookie and verify
    its contents using jsonwebtoken, then
    assign the payload to req.user
  */
  try {
    console.log('in auth');
    const cookie = req.cookies && req.cookies[process.env.COOKIE_NAME];
    if (!cookie) throw new Error('You must be signed in to continue');
    const user = jwt.verify(cookie, process.env.JWT_SECRET);
    req.user = user;
    next();
  } catch (e) {
    e.message = 'You must be signed in to continue';
    e.status = 401;
    next(e);
  }
};
