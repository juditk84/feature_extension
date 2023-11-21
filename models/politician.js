'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class politician extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  politician.init({
    name: DataTypes.STRING,
    email_adress: DataTypes.STRING,
    msgs_sent: DataTypes.STRING,
    organ: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'politician',
  });
  return politician;
};