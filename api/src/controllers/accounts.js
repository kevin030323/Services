const { User } = require("../db.js");

async function login(req, res) {
  const { password, phoneNumber } = req.body;
  const user = await User.findOne({ where: { phoneNumber: phoneNumber } });

  const userLogin = user !== null ? user.password === password : false;

  if (!userLogin) {
    return res.json({
      msj: "La contraseña o el numero de telefono no coinciden",
    });
  }
  res.status(200).json([user]);
}

async function register(req, res) {
  const { name, lastName, password, phoneNumber, location } = req.body;
  const allUsers = await User.findOne({ where: { phoneNumber: phoneNumber } });
  if (allUsers !== null)
    return res
      .status(404)
      .json({ msj: "Este numero ya se encuentra registrado" });

  const newUser = await User.create({
    name,
    lastName,
    password,
    phoneNumber,
    location,
  });
  res.status(200).json([newUser]);
}

module.exports = { login, register };
