const { User, Post } = require("../db.js");

async function getUsers(req, res) {
  const allUsers = await User.findAll();
  if (!allUsers.length) return res.json({ msj: "Lista de usuarios vacia" });
  res.json(allUsers);
}

async function putUser(req, res) {
  const { idUser, newName, newLastname } = req.body;
  if (!idUser) {
    return res.send("Se requiere la id de el usuario");
  }
  if (newName) {
    await User.update(
      { name: newName },
      {
        where: {
          id: idUser,
        },
      }
    );
  }
  if (newLastname) {
    await User.update(
      { lastName: newLastname },
      {
        where: {
          id: idUser,
        },
      }
    );
  }
  res.json({
    msj: "Los datos de el usuario an sido actualizados correctamente",
  });
}

module.exports = { getUsers, putUser };
