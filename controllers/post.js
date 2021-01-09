const Post = require("../models/Post");
const awsUploadImage = require("../utils/aws-upload-image");
const { v4: uuidv4 } = require("uuid");
const User = require("../models/User");
const Follow = require("../models/Follow");

async function publish(input, ctx) {
  console.log(input);

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

module.exports = {
  publish,
  getPosts,
  getPostFolloweds,
};
