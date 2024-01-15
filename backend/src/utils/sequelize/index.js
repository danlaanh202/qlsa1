const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  'quan_ly_sieu_am',
  'root',
  'danlaanh202',
  {
    host: 'localhost',
    dialect: 'mysql'
  }
)

module.exports = sequelize;