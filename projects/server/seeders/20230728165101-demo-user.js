'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // await queryInterface.bulkInsert('Users', [
    //   {
    //     username : "Sanji99",
    //     email : "sanji@gmail.com",
    //     password : "$2a$10$ZkQdFbPf0yMFxTU2yAyujeadvU9GlkxS5oaDj1Rj.3xZzZnfIt0ry",
    //     role : "Cashier",
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
