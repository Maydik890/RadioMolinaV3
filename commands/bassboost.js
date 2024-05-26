const { SlashCommandBuilder, EmbedBuilder } = require("@discordjs/builders");
const { useQueue } = require("discord-player");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("tetaboost")
    .setDescription("Boosteo las tetas"),

  execute: async ({ interaction }) => {
    const queue = useQueue(interaction.guildId);
    queue.filters.equalizer.setEQ(queue.filters.equalizerPresets.FullBass);
    queue.node.setVolume(1000);
    await interaction.reply("Boosteando teta");
  },
};
