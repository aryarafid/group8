'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.bulkInsert('Products', [
      {
        name : "Mie Goreng Jawa",
        categoryId : 1,
        productImg : "",
        modal_produk : 2000,
        harga_produk : 4000,
        quantity : 2,
        description : "Mie Goreng Jawa",
        createdAt: "2023-01-27 07:52:27",
        updatedAt: "2023-01-27 07:52:27",
        isActive : 1
     },
     {
      name : "Es Teh",
      categoryId : 2,
      productImg : "",
      modal_produk : 500,
      harga_produk : 2000,
      quantity : 2,
      description : "Es Teh",
      createdAt: "2023-01-27 07:52:27",
      updatedAt: "2023-01-27 07:52:27",
      isActive : 1
     }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Products', null, {});
  }
};
