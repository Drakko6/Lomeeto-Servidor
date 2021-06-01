const Post = require("../models/Post");
const awsUploadImage = require("../utils/aws-upload-image");
const { v4: uuidv4 } = require("uuid");
const User = require("../models/User");
const Follow = require("../models/Follow");
const recommender = require("../utils/recommender-node");

async function publish(input, ctx) {
  const { id } = ctx.user;
  const { createReadStream, mimetype } = await input.file;
  const extension = mimetype.split("/")[1];

  const fileName = `post/${uuidv4()}.${extension}`;

  const fileData = createReadStream();

  try {
    const result = await awsUploadImage(fileData, fileName);
    const post = new Post({
      idUser: id,
      file: result,
      typeFile: mimetype.split("/")[0],
      text: input.text,
      // createAt: Date.now(),
    });

    post.save();

    return {
      status: true,
      urlFile: result,
    };
  } catch (error) {
    return {
      status: null,
      urlFile: "",
    };
  }
}

async function getPosts(username) {
  const user = await User.findOne({ username });
  if (!user) throw new Error("Usuario no encontrado");

  const posts = await Post.find()
    .where({ idUser: user._id })
    .sort({ createdAt: -1 })
    .populate("idUser");

  return posts;
}

async function getPostFolloweds(ctx) {
  const followeds = await Follow.find({ idUser: ctx.user.id }).populate(
    "follow"
  ); //el populate saca todos los que estamos siguiendo
  const followedsList = [];

  for await (const data of followeds) {
    followedsList.push(data.follow);
  }

  const postList = [];

  const postsPropios = await Post.find()
    .where({ idUser: ctx.user.id })
    .sort({ createdAt: -1 })
    .limit(1)
    .populate("idUser");
  postList.push(...postsPropios);

  for await (const data of followedsList) {
    const posts = await Post.find()
      .where({
        idUser: data._id,
      })
      .sort({ createdAt: -1 })
      .populate("idUser");

    // .limit(5); //si queremos limitar para no sacar todas los post
    postList.push(...posts);
  }

  const result = postList.sort((a, b) => {
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  return result;
}

//QUERY PARA SUGERENCIAS
async function getRecommendedPosts(ctx) {
  let businesses = [];

  //  Se sacan las tres categorias recomendadas para este usuario
  const items = await recommender.recommend(ctx.user.id, 3);
  // console.log(items);
  //Buscar los posts de usuarios NEGOCIOS NO SEGUIDOS DE LOS TIPOS RECOMENDADOS
  //  Se sacan los usuarios negocio de los tipos recomendados
  for await (const type of items) {
    const users = await User.find({ business: true })
      .where("type")
      .equals(type.itemId);

    businesses.push(...users);
  }

  // Se recorren los negocios para saber si se siguen y así sacar sus posts
  const recommendedBuses = [];

  for await (const business of businesses) {
    //businesses.forEach(async (business) => {
    const isFind = await Follow.findOne({ idUser: ctx.user.id })
      .where("follow")
      .equals(business._id);

    if (!isFind) {
      //Si no se sigue, se verifica que sea de la misma ciudad y no sea al mismo usuario
      if (
        business._id.toString() !== ctx.user.id.toString() &&
        business.state === ctx.user.state &&
        business.town === ctx.user.town
      ) {
        recommendedBuses.push(business);
      }
    }
  }

  //Se tendrá un array de usuarios negocios, buscar los posts de estos y pushear a un array para devolverlos
  let posts = [];

  for await (const bus of recommendedBuses) {
    // recommendedBuses.forEach(async (bus) => {
    let busPosts = await Post.find()
      .where({ idUser: bus._id })
      .sort({ createdAt: -1 })
      .populate("idUser");
    posts.push(...busPosts);
  }

  return posts;
}

module.exports = {
  publish,
  getPosts,
  getPostFolloweds,
  getRecommendedPosts,
};
