'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

     await queryInterface.bulkInsert('magics', [{
       magic: 'cambio climatico', 
       createdAt: new Date(),
       updatedAt: new Date()
     },
     {
      magic: 'problemas de vivienda', 
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      magic: 'politicas sociales', 
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
    
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
