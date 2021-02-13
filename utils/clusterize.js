// Recoge el array de ratings, para poder hacer hacer el clustering y guardar el cluster

const recommender = require("../utils/recommender-node");

async function clusterize(ratings) {
  if (ratings.length <= 3) {
    // recommender.setupFromArray(ratings, 1, "./clusters.json").then((data) => {
    recommender.setupFromArray(ratings, 1).then((data) => {
      //Hacer algo una vez se cargan los ratings
    });
  } else if (ratings.length > 3) {
    recommender.setupFromArray(ratings, 2).then((data) => {
      //Hacer algo una vez se cargan los ratings
    });
  } else if (ratings.length > 6) {
    recommender.setupFromArray(ratings, 3).then((data) => {
      //Hacer algo una vez se cargan los ratings
    });
  } else if (ratings.length > 9) {
    recommender.setupFromArray(ratings, 4).then((data) => {
      //Hacer algo una vez se cargan los ratings
    });
  } else if (ratings.length > 12) {
    recommender.setupFromArray(ratings, 5).then((data) => {
      //Hacer algo una vez se cargan los ratings
    });
  }
}
module.exports = clusterize;
