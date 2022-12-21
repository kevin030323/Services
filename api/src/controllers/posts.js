const { User, Post } = require("../db.js");

async function getPosts(req, res) {
  const allPosts = await Post.findAll();
  if (!allPosts.length)
    return res.json({ msj: "Lista de publicaciones vacia" });
  res.json(allPosts);
}

async function newPost(req, res) {
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
}

async function putPost(req, res) {
  const { idPost } = req.body;
  const newPost = await Post.destroy({
    where: {
      id: idPost,
    },
  });
  res.send("Publicacion Eliminada correactamente");
}

module.exports = { getPosts, newPost, putPost };
