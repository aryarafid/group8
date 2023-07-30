'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // await queryInterface.bulkInsert('Users', [
    //   {
    //     username : "Afdal26",
    //     email : "afdalmaulanaaa@gmail.com",
    //     password : "$2a$10$55zNsnbZgunsNzUdJLTLQe26BAuOMQ5lW52xbIIgmrLQyzj13QKBm",
    //     role : "Admin",
    //     isActive : true,
    //     imgProfile : null,
    //     createdAt: "2023-01-27 07:52:27",
    //     updatedAt: "2023-01-27 07:52:27"
    //  }], {});

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});

  }
};
