import { QueryInterface } from "sequelize";

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.sequelize.transaction(async t => {
      const settings = [
        { key: "chatBotType", value: "text" },
        { key: "sendGreetingAccepted", value: "disabled" },
        { key: "sendMsgTransfTicket", value: "disabled" },
        { key: "sendGreetingMessageOneQueues", value: "disabled" },
        { key: "userRating", value: "disabled" },
        { key: "scheduleType", value: "queue" },
        { key: "CheckMsgIsGroup", value: "enabled" },
        { key: "call", value: "disabled" },
        { key: "ipixc", value: "" },
        { key: "tokenixc", value: "" },
        { key: "ipmkauth", value: "" },
        { key: "clientidmkauth", value: "" },
        { key: "clientsecretmkauth", value: "" },
        { key: "asaas", value: "" }
      ];

      for (const setting of settings) {
        const settingExist = await queryInterface.rawSelect(
          "Settings",
          {
            where: { key: setting.key, companyId: 1 },
            transaction: t
          },
          ["id"]
        );

        if (!settingExist) {
          await queryInterface.bulkInsert(
            "Settings",
            [
              {
                key: setting.key,
                value: setting.value,
                companyId: 1,
                createdAt: new Date(),
                updatedAt: new Date()
              }
            ],
            { transaction: t }
          );
        }
      }
    });
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkDelete("Settings", { companyId: 1 });
  }
};
