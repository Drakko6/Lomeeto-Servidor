const Like = require("../models/like");

function addLike(idPost, ctx) {
  try {
    const like = new Like({
      idPost,
      idUser: ctx.user.id,
    });

    like.save();

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

async function deleteLike(idPost, ctx) {
  try {
    await Like.findOneAndDelete({ idPost }).where({
      idUser: ctx.user.id,
    });

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

async function isLike(idPost, ctx) {
  try {
    const result = await Like.findOne({ idPost }).where({
      idUser: ctx.user.id,
    });

    if (!result) throw new Error("No se ha dado like");
    return true;
  } catch (error) {
    console.log(error);

    return false;
  }
}

async function countLikes(idPost) {
  try {
    const result = await Like.countDocuments({ idPost });

    return result;
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  addLike,
  deleteLike,
  isLike,
  countLikes,
};
