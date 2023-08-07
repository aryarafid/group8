'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    //      await queryInterface.bulkInsert('Categories', [
    //       {
    //         name : "Makanan",
    //         createdAt: "2023-01-27 07:52:27",
    //         updatedAt: "2023-01-27 07:52:27",
    //   },
    //   {
    //     name : "Minuman",
    //     createdAt: "2023-01-27 07:52:27",
    //         updatedAt: "2023-01-27 07:52:27",
    //   }
    // ], {});
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('Categories', null, {});
  }
};
