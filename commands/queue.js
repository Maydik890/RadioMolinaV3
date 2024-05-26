const { SlashCommandBuilder, EmbedBuilder } = require("@discordjs/builders");
const { useQueue } = require("discord-player");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("queue")
    .setDescription("te muestro las tetas que estan en la queue"),
  execute: async ({ interaction }) => {
    const queue = useQueue(interaction.guildId);
    if (!queue) {
      return interaction.reply("No hay tetas en la queue");
    }
    const queueString = queue.tracks.data
      .slice(0, 10)
      .map((song, i) => {
        return `${i + 1} - ${song.title} - ${song.duration}\ `;
      })
      .join("\n");

    const currentSong = queue.currentTrack;

    await interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setDescription(
            `**Reproduciendo ahora:** \n ${currentSong.title} - ${currentSong.duration} \n\n **Tetas en la queue:** \n ${queueString}`
          )
          .setThumbnail(currentSong.thumbnail)
          .setFooter({ text: `Que ganas de chupar unas tetas` }),
      ],
    });
  },
};
