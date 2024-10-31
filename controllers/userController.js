const User = require('../models/User');

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  // Регистрация логика
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  // Логика входа
};

module.exports = { registerUser, loginUser };