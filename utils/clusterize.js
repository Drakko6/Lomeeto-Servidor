// Recoge el array de ratings, para poder hacer hacer el clustering y guardar el cluster

const recommender = require("../utils/recommender-node");

async function clusterize(ratings) {
  if (ratings.length > 40) {
    recommender.setupFromArray(ratings, 20).then((data) => {
      //Hacer algo una vez se cargan los ratings
    });
  } else if (ratings.length > 33) {
    recommender.setupFromArray(ratings, 12).then((data) => {
      //Hacer algo una vez se cargan los ratings
    });
  } else if (ratings.length > 30) {
    recommender.setupFromArray(ratings, 11).then((data) => {
      //Hacer algo una vez se cargan los ratings
    });
  } else if (ratings.length > 27) {
    recommender.setupFromArray(ratings, 10).then((data) => {
      //Hacer algo una vez se cargan los ratings
    });
  } else if (ratings.length > 24) {
    recommender.setupFromArray(ratings, 9).then((data) => {
      //Hacer algo una vez se cargan los ratings
    });
  } else if (ratings.length > 21) {
    recommender.setupFromArray(ratings, 8).then((data) => {
      //Hacer algo una vez se cargan los ratings
    });
  } else if (ratings.length > 18) {
    recommender.setupFromArray(ratings, 7).then((data) => {
      //Hacer algo una vez se cargan los ratings
    });
  } else if (ratings.length > 15) {
    recommender.setupFromArray(ratings, 6).then((data) => {
      //Hacer algo una vez se cargan los ratings
    });
  } else if (ratings.length > 12) {
    recommender.setupFromArray(ratings, 5).then((data) => {
      //Hacer algo una vez se cargan los ratings
    });
  } else if (ratings.length > 9) {
    recommender.setupFromArray(ratings, 4).then((data) => {
      //Hacer algo una vez se cargan los ratings
    });
  } else if (ratings.length > 6) {
    recommender.setupFromArray(ratings, 3).then((data) => {
      //Hacer algo una vez se cargan los ratings
    });
  } else if (ratings.length > 3) {
    recommender.setupFromArray(ratings, 2).then((data) => {
      //Hacer algo una vez se cargan los ratings
    });
  }
}
module.exports = clusterize;
