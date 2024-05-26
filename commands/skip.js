const { SlashCommandBuilder } = require("@discordjs/builders");
const { useQueue } = require("discord-player");
const { MessageEmbed } = require("discord.js");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("skip")
    .setDescription("Salteo la canción"),

  execute: async ({ interaction }) => {
    const queue = useQueue(interaction.guildId);

    if (queue) {
      queue.node.skip();
      await interaction.reply("Dejo de tocarle la teta");
    } else {
      await interaction.reply("No hay canción actual para saltar");
    }
  },
};
