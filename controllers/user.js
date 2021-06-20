const User = require("../models/User");
const Follow = require("../models/Follow");
const Comment = require("../models/Comment");
const Post = require("../models/Post");
const Like = require("../models/like");
const Rating = require("../models/Rating");

const Confirmation = require("../models/Confirmation");
const clusterize = require("../utils/clusterize");

const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const awsUploadImage = require("../utils/aws-upload-image");
const sendMail = require("../utils/sendMail");
const createConfirmationUrl = require("../utils/createConfirmationUrl");

function createToken(user, SECRET_KEY, expiresIn) {
  const {
    id,
    name,
    email,
    username,
    state,
    town,
    business,
    type,
    preferences,
  } = user;
  const payload = {
    id,
    name,
    email,
    username,
    state,
    town,
    business,
    type,
    preferences,
  };
  return jwt.sign(payload, SECRET_KEY, { expiresIn });
}

async function register(input) {
  const newUser = input;
  newUser.email = newUser.email.toLowerCase();
  newUser.username = newUser.username.toLowerCase();
  const { email, username, password } = newUser;

  //Revisamos si el correo está en uso
  const foundEmail = await User.findOne({ email });
  if (foundEmail) throw new Error("El email ya está en uso");

  //Revisamos si el username está en uso
  const foundUsername = await User.findOne({ username });
  if (foundUsername) throw new Error("El nombre de usuario ya está en uso");

  //Encriptar
  const salt = await bcryptjs.genSaltSync(10);
  newUser.password = await bcryptjs.hash(password, salt);

  if (!foundEmail && !foundUsername) {
    try {
      const user = new User(newUser);
      user.save();

      await sendMail(newUser.email, createConfirmationUrl(user._id));

      return user;
    } catch (error) {
      console.log(error);
    }
  }

  return null;
}

async function login(input) {
  const { email, password } = input;

  //ver si el usuario existe
  const userFound = await User.findOne({
    email: email.toLowerCase(),
  });
  if (!userFound) throw new Error("Usuario o contraseña incorrecta");
  const passwordSuccess = await bcryptjs.compare(password, userFound.password);
  if (!passwordSuccess) throw new Error("Usuario o contraseña incorrecta");

  if (!userFound.confirmed) throw new Error("Usuario no confirmado");

  return {
    token: createToken(userFound, process.env.SECRET_KEY, "24h"),
  };
}

async function getUser(id, username) {
  let user = null;
  if (id) user = await User.findById(id);
  if (username) user = await User.findOne({ username });
  if (!user) throw new Error("El usuario no existe");

  return user;
}

async function updateAvatar(file, ctx) {
  const { id } = ctx.user;
  const { createReadStream, mimetype } = await file;
  const extension = mimetype.split("/")[1];
  const imageName = `avatar/${id}.${extension}`;
  const fileData = createReadStream();

  try {
    const result = await awsUploadImage(fileData, imageName);
    await User.findByIdAndUpdate(id, { avatar: result });

    return {
      status: true,
      urlAvatar: result,
    };
  } catch (error) {
    return {
      status: false,
      urlAvatar: null,
    };
  }
}

async function deleteAvatar(ctx) {
  const { id } = ctx.user;

  try {
    await User.findByIdAndUpdate(id, { avatar: "" });
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function registerFirstPreferences(input, ctx) {
  // APAGAR ESTA FUNCIÓN EN EL FRONT
  //  Se ejecutará después de hacer primer login
  //Se saca el id del context y se busca el user con este
  const { id } = ctx.user;
  try {
    const user = await User.findById(id);

    await User.findByIdAndUpdate(id, { preferences: input.preferences });

    // // Recoger las recomendaciones del input y hacer primer clusterización (llamar a clusterize(arrayRatings))
    // const firstRatings = input.preferences;
    // //Guardar los primeros Ratings (3)
    // for await (const preference of firstRatings) {
    //   let newRating = new Rating({
    //     user: user._id,
    //     type: preference,
    //     rating: 1,
    //   });

    //   await newRating.save();
    // }

    // //llamar a clusterize para actualizar
    // const ratings = await Rating.find();

    // const cleanRatings = [];

    // for (rat of ratings) {
    //   const newRat = {
    //     user: rat.user.toString(),
    //     item: rat.type,
    //     rating: rat.rating.toString(),
    //   };

    //   cleanRatings.push(newRat);
    // }

    // await clusterize(cleanRatings);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function updateUser(input, ctx) {
  const { id } = ctx.user;

  try {
    if (input.currentPassword && input.newPassword) {
      //CAMBIAR contraseña

      //comprobar contraseña
      const userFound = await User.findById(id);
      const passwordSuccess = await bcryptjs.compare(
        input.currentPassword,
        userFound.password
      );

      //si no es, lanzar error
      if (!passwordSuccess) throw new Error("Contraseña incorrecta");

      //si sí es, se encripta y se actualiza la contraseña
      const salt = await bcryptjs.genSaltSync(10);
      const newPasswordCrypt = await bcryptjs.hash(input.newPassword, salt);

      await User.findByIdAndUpdate(id, { password: newPasswordCrypt });
    } else {
      //CAMBIAR OTROS DATOS DEL USUARIO
      await User.findByIdAndUpdate(id, input);
    }

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

async function search(search) {
  const users = await User.find({
    name: { $regex: search, $options: "i" },
  });

  return users;
}

async function deleteUser(ctx) {
  const { id } = ctx.user;

  try {
    //buscar todos los likes y borrarlos al y del usuario
    await Like.remove({
      idUser: ctx.user.id,
    });

    //buscar todos los post del usuario y borrarlos
    await Post.remove({ idUser: ctx.user.id });

    //buscar todos los seguidos y seguidores del usuario y borrarlos
    await Follow.remove({ idUser: ctx.user.id }); //seguidores

    await Follow.remove({ follow: ctx.user.id }); //seguidos

    //buscar todos los comentarios de y al
    await Comment.remove({ idUser: ctx.user.id });

    //borrar usuario
    await User.findByIdAndDelete(id);

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

async function confirmUser(token) {
  confirm = await Confirmation.findOne({ token });
  if (!confirm) return false;

  try {
    await User.findOneAndUpdate(
      {
        _id: confirm.idUser,
      },
      { confirmed: true }
    );

    //confirm._id
    await Confirmation.findOneAndDelete({ token });

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

module.exports = {
  register,
  login,
  getUser,
  updateAvatar,
  deleteAvatar,
  updateUser,
  search,
  deleteUser,
  confirmUser,
  registerFirstPreferences,
};
