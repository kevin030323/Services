const { Router } = require("express");
const { User, Post } = require("../db.js");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get("/users", async (req, res) => {
  const allUsers = await User.findAll();
  if (!allUsers.length) return res.json({ msj: "Lista de usuarios vacia" });
  res.json(allUsers);
});

router.get("/posts", async (req, res) => {
  const allPosts = await Post.findAll();
  if (!allPosts.length)
    return res.json({ msj: "Lista de publicaciones vacia" });
  res.json(allPosts);
});

router.post("/login", async (req, res) => {
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
});

router.post("/newUser", async (req, res) => {
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
});

router.put("/user", async (req, res) => {
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
});

router.post("/newPosts", async (req, res) => {
  const {
    title,
    rangePriceOne,
    rangePriceTwo,
    location,
    idUser,
    nameUser,
    phoneNumber,
  } = req.body;
  let rangePrice = `${rangePriceOne}-${rangePriceTwo}`;
  const newPost = await Post.create({
    title,
    rangePrice,
    location,
    idUser,
    nameUser,
    phoneNumber,
  });
  res.send("Publicacion creada,");
});

router.put("/newPosts", async (req, res) => {
  const { idPost } = req.body;
  const newPost = await Post.destroy({
    where: {
      id: idPost,
    },
  });
  res.send("Publicacion Eliminada correactamente");
});

module.exports = router;
