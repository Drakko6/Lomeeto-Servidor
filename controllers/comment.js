const Comment = require("../models/Comment");

async function addComment(input, ctx) {
  try {
    const comment = new Comment({
      idPost: input.idPost,
      idUser: ctx.user.id,
      comment: input.comment,
    });
    comment.save();
    return comment;
  } catch (error) {
    console.error(error);
  }
}

async function getComments(idPost) {
  const result = await Comment.find({ idPost }).populate("idUser");

  return result;
}

module.exports = {
  addComment,
  getComments,
};
