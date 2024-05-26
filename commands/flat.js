const { SlashCommandBuilder, EmbedBuilder } = require("@discordjs/builders");
const { useQueue } = require("discord-player");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("normalidad")
    .setDescription("Vuelvo a la normalidad"),

  execute: async ({ interaction }) => {
    const queue = useQueue(interaction.guildId);
    queue.filters.equalizer.setEQ(queue.filters.equalizerPresets.Flat);
    queue.node.setVolume(100);
    await interaction.reply("Volvi del hentai");
  },
};
