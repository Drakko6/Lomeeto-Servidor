const userController = require("../controllers/user");
const followController = require("../controllers/follow");
const postController = require("../controllers/post");
const commentController = require("../controllers/comment");
const likeController = require("../controllers/like");

const resolvers = {
  Query: {
    //User
    getUser: (_, { id, username }) => userController.getUser(id, username),
    search: (_, { search }) => userController.search(search),

    //Follow
    isFollow: (_, { username }, ctx) =>
      followController.isFollow(username, ctx),

    getFollowers: (_, { username }) => followController.getFollowers(username),
    getFolloweds: (_, { username }) => followController.getFolloweds(username),
    getNotFolloweds: (_, {}, ctx) => followController.getNotFolloweds(ctx),

    //Post
    getPosts: (_, { username }) => postController.getPosts(username),
    getPostFolloweds: (_, {}, ctx) => postController.getPostFolloweds(ctx), //del contexto se saca el id del usuario logueado

    //Comment
    getComments: (_, { idPost }) => commentController.getComments(idPost),

    //Like
    isLike: (_, { idPost }, ctx) => likeController.isLike(idPost, ctx),
    countLikes: (_, { idPost }) => likeController.countLikes(idPost),
  },
  Mutation: {
    //User
    register: (_, { input }) => userController.register(input),
    login: (_, { input }) => userController.login(input),
    updateAvatar: (_, { file }, ctx) => userController.updateAvatar(file, ctx),
    deleteAvatar: (_, {}, ctx) => userController.deleteAvatar(ctx),
    updateUser: (_, { input }, ctx) => userController.updateUser(input, ctx),
    deleteUser: (_, {}, ctx) => userController.deleteUser(ctx),
    confirmUser: (_, { token }) => userController.confirmUser(token),

    //Follow
    follow: (_, { username }, ctx) => followController.follow(username, ctx),
    unFollow: (_, { username }, ctx) =>
      followController.unFollow(username, ctx),

    //Post
    publish: (_, { input }, ctx) => postController.publish(input, ctx),

    //Comment
    addComment: (_, { input }, ctx) => commentController.addComment(input, ctx),

    //Like
    addLike: (_, { idPost }, ctx) => likeController.addLike(idPost, ctx),
    deleteLike: (_, { idPost }, ctx) => likeController.deleteLike(idPost, ctx),
  },
};

module.exports = resolvers;
