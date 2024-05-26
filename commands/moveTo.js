const { SlashCommandBuilder, EmbedBuilder } = require("@discordjs/builders");
const { useQueue } = require("discord-player");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("mover")
    .setDescription("Muevo la canción")
    .addIntegerOption((option) =>
      option.setName("cual").setDescription("Que teta saco").setRequired(true)
    )
    .addIntegerOption((option) =>
      option
        .setName("donde")
        .setDescription("Donde meto la teta")
        .setRequired(true)
    ),

  execute: async ({ interaction }) => {
    const cancionMover = interaction.options.getInteger("cual");
    const dondeMover = interaction.options.getInteger("donde");
    const queue = useQueue(interaction.guildId);

    if (!queue) {
      return interaction.reply("No hay canciones en la cola actualmente.");
    }

    if (dondeMover < 1 || dondeMover > queue.tracks.length) {
      return interaction.reply(
        "Por favor, ingresa un número válido dentro del rango de canciones en la               cola."
      );
    }

    const track = queue.tracks.data[cancionMover - 1];
    queue.moveTrack(cancionMover - 1, dondeMover - 1);

    await interaction.reply({
      embeds: [
        new EmbedBuilder().setDescription(
          `**Teta movida:** \n **${track.title}** a la posición **${dondeMover}**`
        ),
      ],
    });
  },
};
