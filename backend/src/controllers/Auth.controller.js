const Doctor = require('../models/Doctor.model');
const { generateToken } = require('../utils/auth/jwtUtils');

class AuthController {
  constructor() {}
  async login(req, res) {
    try {
      const { username, password } = req.body;
      const data = await Doctor.findOne({
        where: {
          username,
        },
      });
      if (!data) {
        throw new Error('Không tìm thấy user');
      }
      if (data.password !== password) {
        throw new Error('Password nhập vào không chính xác');
      }
      const accessToken = generateToken(username);
      return res.status(200).json(accessToken);
    } catch (e) {
      return res.status(500).json({ success: false, message: e.message });
    }
  }
}

module.exports = new AuthController();
