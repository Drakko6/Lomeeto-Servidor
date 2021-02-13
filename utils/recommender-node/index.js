var nodeRecommender = {};

var datamodel = require("./lib/datamodel");
var recommender = require("./lib/recommender");
const Cluster = require("../../models/Cluster");

nodeRecommender.setupFromArray = function (dataAray, k) {
  return new Promise(function (resolve, reject) {
    datamodel
      .loadDatasetFromArray(dataAray)
      .then((data) => {
        var users = data.users;
        var items = data.items;
        datamodel
          .getClusters(data.matrix, k)
          .then(async (clusters) => {
            var fileData = {
              users: users.colArray(),
              items: items.values,
              clusters: clusters,
            };

            //verificar si ya existe
            const isClusterExist = await Cluster.findOne();

            //Escribir en BD
            if (isClusterExist) {
              //hacer solo update
              await Cluster.findOneAndUpdate({
                cluster: fileData,
              });
            } else {
              const cluster = new Cluster({ cluster: fileData });

              await cluster.save();
            }

            resolve(users.colArray());
          })
          .catch((err) => reject(err));
      })
      .catch((err) => reject(err));
  });
};

nodeRecommender.recommend = function (userId, n) {
  return new Promise(function (resolve, reject) {
    recommender
      .recommend(userId, n)
      .then((items) => {
        resolve(items);
      })
      .catch((err) => reject(err));
  });
};

module.exports = nodeRecommender;
