const Like = require("../models/like");
const Post = require("../models/Post");
const Rating = require("../models/Rating");
const clusterize = require("../utils/clusterize");

async function addLike(idPost, ctx) {
  try {
    // Buscar al usuario del post
    const PostFollowed = await Post.findById(idPost);
    const idUserFollowed = PostFollowed.idUser;

    //Guardar rating del usuario al otro usuario
    //Buscar si el rating ya existe
    const foundRating = await Rating.findOne({
      user: ctx.user.id,
      type: idUserFollowed,
    });

    if (foundRating) {
      await Rating.findOneAndUpdate(
        { user: ctx.user.id, type: idUserFollowed },
        {
          rating: foundRating.rating + 1,
        }
      );
    } else if (!foundRating) {
      // (Si no existe crear un nuevo rating )
      const newRating = new Rating({
        user: ctx.user.id,
        type: idUserFollowed,
        rating: 1,
      });

      await newRating.save();
    }

    //Consultará y devolverá un array de los ratings de la BD
    const ratings = await Rating.find();

    //limpiar array de ratings
    const cleanRatings = [];

    for (rat of ratings) {
      const newRat = {
        user: rat.user.toString(),
        item: rat.type.toString(),
        rating: rat.rating.toString(),
      };

      cleanRatings.push(newRat);
    }

    //Guardar el like
    const like = new Like({
      idPost,
      idUser: ctx.user.id,
    });

    like.save();

    //  Llamar al metodo de clusterize(array) para actualizarlo
    clusterize(cleanRatings);

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

async function deleteLike(idPost, ctx) {
  try {
    // Buscar al usuario del post
    const PostFollowed = await Post.findById(idPost);
    const idUserFollowed = PostFollowed.idUser;

    //  Buscar si el rating que ya existe
    const foundRating = await Rating.findOne({
      user: ctx.user.id,
      type: idUserFollowed,
    });

    if (foundRating) {
      await Rating.findOneAndUpdate(
        { user: ctx.user.id, type: idUserFollowed },
        {
          rating: foundRating.rating - 1,
        }
      );
    }

    //Consultará y devolverá un array de los ratings de la BD
    const ratings = await Rating.find();

    //limpiar array de ratings
    const cleanRatings = [];

    for (rat of ratings) {
      console.log("Rating actualizado", rat);
      const newRat = {
        user: rat.user.toString(),
        item: rat.type.toString(),
        rating: rat.rating.toString(),
      };

      cleanRatings.push(newRat);
    }

    //  Llamar al metodo de clusterize(array) para actualizarlo
    clusterize(cleanRatings);

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
