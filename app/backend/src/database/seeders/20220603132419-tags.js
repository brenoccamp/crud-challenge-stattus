module.exports = {
  up: async (queryInterface) => {
    /**
     * Add seed commands here.
     *
     * Example:
     */
    await queryInterface.bulkInsert(
      'tags',
      [
        {
          id: 1,
          name: "São Paulo",
          color: "#000"
        },
        {
          id: 2,
          name: "Sorocaba",
          color: "#fff"
        },
        {
          id: 3,
          name: "Rio de Janeiro",
          color: "#303030"
        },
        {
          id: 4,
          name: "Angra",
          color: "#313131"
        },
        {
          id: 5,
          name: "Minas Gerais",
          color: "#414141"
        },
        {
          id: 6,
          name: "Belo Horizonte",
          color: "#515151"
        }
    ],
      {},
    );
  },

  down: async (queryInterface) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     */
    await queryInterface.bulkDelete('tags', null, {});
  },
};
