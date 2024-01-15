const jwt = require('jsonwebtoken');

const generateToken = (username) => {
  return jwt.sign({ username }, process.env.TOKEN_KEY, { expiresIn: '15 days' });
};

module.exports = { generateToken };
