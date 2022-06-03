module.exports = {
  up: async (queryInterface) => {
    /**
     * Add seed commands here.
     *
     * Example:
     */
    await queryInterface.bulkInsert(
      'devices',
      [
        {
          id: 1,
          version: "35001",
          tags: "1;2",
        },
        {
          id: 2,
          version: "35001",
          tags: "3;4",
        },
        {
          id: 3,
          version: "35001",
          tags: "5;6",
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
    await queryInterface.bulkDelete('devices', null, {});
  },
};
