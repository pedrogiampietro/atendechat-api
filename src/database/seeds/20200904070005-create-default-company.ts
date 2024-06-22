import { QueryInterface } from "sequelize";

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.sequelize.transaction(async t => {
      // Verifica se já existe um plano com o nome "Plano 1"
      const plansExist = await queryInterface.rawSelect(
        "Plans",
        {
          where: { name: "Plano 1" },
          transaction: t
        },
        ["id"]
      );

      // Se não existir, insere o plano
      if (!plansExist) {
        await queryInterface.bulkInsert(
          "Plans",
          [
            {
              name: "Plano 1",
              users: 10,
              connections: 10,
              queues: 10,
              value: 30,
              createdAt: new Date(),
              updatedAt: new Date()
            }
          ],
          { transaction: t }
        );
      }

      // Verifica se já existe uma empresa com o nome "Empresa 1"
      const companiesExist = await queryInterface.rawSelect(
        "Companies",
        {
          where: { name: "Empresa 1" },
          transaction: t
        },
        ["id"]
      );

      // Se não existir, insere a empresa
      if (!companiesExist) {
        await queryInterface.bulkInsert(
          "Companies",
          [
            {
              name: "Empresa 1",
              planId: plansExist || 1, // Certifica-se de que o planId está correto
              dueDate: "2093-03-14 04:00:00+01",
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
    return queryInterface.sequelize.transaction(async t => {
      await queryInterface.bulkDelete(
        "Companies",
        { name: "Empresa 1" },
        { transaction: t }
      );
      await queryInterface.bulkDelete(
        "Plans",
        { name: "Plano 1" },
        { transaction: t }
      );
    });
  }
};
