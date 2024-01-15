const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const accessToken = req.header('X-Auth-Token');
  if (!accessToken) {
    return res.status(403).json('Token is required');
  }
  try {
    const decoded = jwt.verify(accessToken, process.env.TOKEN_KEY);
    req.user = decoded;
    return next();
  } catch (e) {
    return res.status(401).json('Invalid token');
  }
};

module.exports = { verifyToken };
