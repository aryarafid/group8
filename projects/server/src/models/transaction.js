"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Transaction.init(
    {
      id: DataTypes.INTEGER,
      date: DataTypes.NOW,
      user_id: DataTypes.INTEGER,
      total: DataTypes.INTEGER,
      isCompleted: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Transaction",
      freezeTableName: true,
    }
  );
  return Transaction;
};
