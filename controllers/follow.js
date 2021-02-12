const Follow = require("../models/Follow");
const User = require("../models/User");
const Rating = require("../models/Rating");
const clusterize = require("../utils/clusterize");

async function follow(username, ctx) {
  const userFound = await User.findOne({ username });
  if (!userFound) throw new Error("Usuario no encontrado");

  try {
    const follow = new Follow({
      idUser: ctx.user.id,
      follow: userFound._id,
    });

    // TO DO:
    // Es un negocio? Consultar BD USER  Ver bandera
    if (userFound.business) {
      //Si es negocio, buscar Rating con idUser y tipo de negocio y aumentar el contador

      const foundRating = await Rating.findOne({ idUser: ctx.user.id });

      await Rating.findByIdAndUpdate(ctx.user.id, { rating: this.rating + 1 });

      if (!foundRating) {
        // (Si no existe crear un nuevo rating )
        const newRating = new Rating({
          idUser: ctx.user.id,
          type: userFound.type,
          rating: 1,
        });

        newRating.save();
      }
    }

    //Consultará y devolverá un array de los ratings de la BD
    //  Llamar al metodo de clusterize(array) para actualizarlo
    const ratings = await Rating.find();

    console.log(ratings);

    clusterize(ratings);

    follow.save();
    return true;
  } catch (error) {
    console.log(error);

    return false;
  }
}

async function isFollow(username, ctx) {
  const userFound = await User.findOne({ username });
  if (!userFound) throw new Error("Usuario no encontrado");

  const follow = await Follow.find({ idUser: ctx.user.id })
    .where("follow")
    .equals(userFound._id);

  if (follow.length > 0) {
    return true;
  }
  return false;
}

async function unFollow(username, ctx) {
  const userFound = await User.findOne({ username });

  const follow = await Follow.deleteOne({ idUser: ctx.user.id })
    .where("follow")
    .equals(userFound._id);

  if (follow.deletedCount > 0) {
    return true;
  }

  return false;
}

async function getFollowers(username) {
  const user = await User.findOne({ username });

  const followers = await Follow.find({ follow: user._id }).populate("idUser"); //devuelve todos los que en follow tengan el id del username mandado, el populate saca todos los usuarios

  const followersList = [];

  for await (const data of followers) {
    followersList.push(data.idUser);
  }
  return followersList;
}

async function getFolloweds(username) {
  const user = await User.findOne({ username });

  const followeds = await Follow.find({ idUser: user._id }).populate("follow");

  const followedsList = [];

  for await (const data of followeds) {
    followedsList.push(data.follow);
  }

  return followedsList;
}

async function getNotFolloweds(ctx) {
  const users = await User.find().limit(20);

  const arrayUsers = [];

  for await (const user of users) {
    const isFind = await Follow.findOne({ idUser: ctx.user.id })
      .where("follow")
      .equals(user._id);

    if (!isFind) {
      if (
        //que no es el mismo usuario
        // condicion que es mismo estado y ciudad
        user._id.toString() !== ctx.user.id.toString() &&
        user.state === ctx.user.state &&
        user.town == ctx.user.town
      ) {
        arrayUsers.push(user);
      }
    }
  }

  return arrayUsers;
}

//  TO DO:
//  que en el registro se pregunte el tipo y se ponga diferente formulario, lo de preferencias igual (FRONT)

//  se usará una bandera para saber si es negocio -> Cambiar las opciones dependiendo de esto  BUSSINESS?  (FRONT)
//  CAMBIAR EL REGISTRO PARA QUE GUARDE ESTA INFO (FRONT)

// en el feed se presentarán posts con la etiqueta publicidad, mezclados con los de seguidos (FRONT)
// (Se deben mezclar en el FRONT las dos consultas)

module.exports = {
  follow,
  isFollow,
  unFollow,
  getFollowers,
  getFolloweds,
  getNotFolloweds,
};
