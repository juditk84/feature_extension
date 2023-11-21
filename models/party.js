'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class party extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  party.init({
    party: DataTypes.STRING,
    organ: DataTypes.STRING,
    webpage: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'party',
  });
  return party;
};