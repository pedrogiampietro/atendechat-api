import { QueryInterface } from "sequelize";

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.sequelize.transaction(async t => {
      const settingExist = await queryInterface.rawSelect(
        "Settings",
        {
          where: { key: "allTicket" },
          transaction: t
        },
        ["id"]
      );

      if (!settingExist) {
        await queryInterface.bulkInsert(
          "Settings",
          [
            {
              key: "allTicket",
              value: "disabled",
              createdAt: new Date(),
              updatedAt: new Date()
            }
          ],
          { transaction: t }
        );
      }
    });
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkDelete("Settings", { key: "allTicket" });
  }
};
