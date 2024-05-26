const { SlashCommandBuilder } = require("@discordjs/builders");
const { useQueue } = require("discord-player");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("exit")
    .setDescription("Se va sin tocar teta"),
  execute: async ({ interaction }) => {
    const queue = useQueue(interaction.guildId);
    queue.delete();

    await interaction.reply("Dejame tocar medio pixel de teta");
  },
};
