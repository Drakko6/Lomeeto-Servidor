const { gql } = require("apollo-server");

const typeDefs = gql`
  type User {
    id: ID
    name: String
    username: String
    email: String
    breed: String
    years: Int
    months: Int
    owner: String
    description: String
    password: String
    createdAt: String
    avatar: String
    #para confirmar por correo
    confirmed: Boolean
    state: String
    town: String
  }

  type Token {
    token: String
  }

  type UpdateAvatar {
    status: Boolean
    urlAvatar: String
  }

  type Publish {
    status: Boolean #si se subio
    urlFile: String # url de amazon
  }

  type Post {
    id: ID
    idUser: User
    file: String
    typeFile: String
    createdAt: String
    text: String
  }

  type Comment {
    idPost: ID
    idUser: User
    comment: String
    createAt: String
  }

  type FeedPost {
    id: ID
    idUser: User
    file: String
    typeFile: String
    createdAt: String
    text: String
  }

  #INPUTS
  input UserInput {
    name: String!
    username: String!
    email: String!
    password: String!
    state: String!
    town: String!
  }

  input LoginInput {
    email: String!
    password: String!
  }

  input UserUpdateInput {
    name: String
    email: String
    currentPassword: String
    newPassword: String
    breed: String
    years: Int
    months: Int
    owner: String
    description: String
  }

  input CommentInput {
    idPost: ID
    comment: String
  }

  input PostInput {
    file: Upload
    text: String
  }

  #QUERY
  type Query {
    #User
    getUser(id: ID, username: String): User
    search(search: String): [User]

    #Follow
    isFollow(username: String!): Boolean
    getFollowers(username: String!): [User]
    getFolloweds(username: String!): [User]
    getNotFolloweds: [User]

    #Post
    getPosts(username: String!): [Post]
    getPostFolloweds: [FeedPost]

    #Comment
    getComments(idPost: ID!): [Comment]

    #Like
    isLike(idPost: ID!): Boolean
    countLikes(idPost: ID!): Int
  }

  type Mutation {
    #User
    register(input: UserInput): User
    login(input: LoginInput): Token
    updateAvatar(file: Upload): UpdateAvatar
    deleteAvatar: Boolean
    updateUser(input: UserUpdateInput): Boolean
    deleteUser: Boolean
    confirmUser(token: String): Boolean

    #Follow
    follow(username: String!): Boolean
    unFollow(username: String!): Boolean

    #Post
    publish(input: PostInput): Publish

    #Comment
    addComment(input: CommentInput): Comment

    #Like
    addLike(idPost: ID!): Boolean
    deleteLike(idPost: ID!): Boolean
  }
`;

module.exports = typeDefs;
