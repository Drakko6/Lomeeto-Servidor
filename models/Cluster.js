const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ClusterSchema = Schema(
  {
    cluster: {
      type: Object,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Cluster", ClusterSchema);
