const { User, Post } = require("../db.js");

async function login(req, res) {
  const { password, phoneNumber } = req.body;
  const allUsers = await User.findAll();
  const userLogin = allUsers.filter(
    (element) =>
      element.password === password && element.phoneNumber === phoneNumber
  );
  if (!userLogin.length) {
    return res.json({
      msj: "La contraseña o el numero de telefono no coinciden",
    });
  }
  return res.json(userLogin);
}

async function register(req, res) {
  const { name, lastName, password, phoneNumber, location } = req.body;
  const allUsers = await User.findAll();
  const filter = allUsers.filter(
    (element) => phoneNumber === element.phoneNumber
  );
  if (filter.length)
    return res.json({ msj: "Este numero ya se encuentra registrado" });
  const newUser = await User.create({
    name,
    lastName,
    password,
    phoneNumber,
    location,
  });
  res.json([newUser]);
}

module.exports = { login, register };
