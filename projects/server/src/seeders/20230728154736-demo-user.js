'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('user', [
      {
        email : "usop@gmail.com",
        username : "Usop99",
        password : "$2a$10$Ld5F6BHFiIZ6iPX6sugsIuoOIpnE4CD5ci.WUm97vUqGDYNlqclY.",
        role : "admin",
        imgUrl : "",
        isDisabled : 0,
        createdAt: "2023-01-27 07:52:27",
        updatedAt: "2023-01-27 07:52:27"

    }], {});
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('user', null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
