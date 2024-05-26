const { SlashCommandBuilder, EmbedBuilder } = require("@discordjs/builders");
const { useQueue } = require("discord-player");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("removeteta")
    .setDescription("Salteo la canción")
    .addIntegerOption((option) =>
      option.setName("cual").setDescription("Que teta saco").setRequired(true)
    ),

  execute: async ({ interaction }) => {
    const number = interaction.options.getString("cual");
    const queue = useQueue(interaction.guildId);

    if (!queue) {
      return interaction.reply("No hay canciones en la cola actualmente.");
    }

    if (number < 1 || number > queue.tracks.length) {
      return interaction.reply(
        "Por favor, ingresa un número válido dentro del rango de canciones en la               cola."
      );
    }

    const track = queue.tracks.data[number - 1];
    queue.node.remove(number - 1);

    await interaction.reply({
      embeds: [
        new EmbedBuilder().setDescription(
          `**Teta removida:** \n ${track.title}`
        ),
      ],
    });
  },
};
