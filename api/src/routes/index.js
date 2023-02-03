const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
const { getUsers, putUser } = require("../controllers/users.js");
const { login, register } = require("../controllers/accounts.js");
const { getPosts, newPost, deletePost } = require("../controllers/posts.js");

router.get("/users", getUsers);
router.put("/user", putUser);

router.get("/posts", getPosts);
router.post("/newPosts", newPost);
router.put("/newPosts", deletePost);

router.post("/newUser", register);
router.post("/login", login);

module.exports = router;
