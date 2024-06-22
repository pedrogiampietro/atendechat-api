import { QueryInterface } from "sequelize";
import { hash } from "bcryptjs";

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.sequelize.transaction(async t => {
      const userExist = await queryInterface.rawSelect(
        "Users",
        {
          where: { email: "admin@admin.com" },
          transaction: t
        },
        ["id"]
      );

      if (!userExist) {
        const passwordHash = await hash("123456", 8);
        await queryInterface.bulkInsert(
          "Users",
          [
            {
              name: "Admin",
              email: "admin@admin.com",
              profile: "admin",
              passwordHash,
              companyId: 1,
              createdAt: new Date(),
              updatedAt: new Date(),
              super: true
            }
          ],
          { transaction: t }
        );
      }
    });
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkDelete("Users", { email: "admin@admin.com" });
  }
};
