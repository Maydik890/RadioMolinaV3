const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder().setName("tetaflip").setDescription("Teta?"),

  async execute({ interaction }) {
    const num = Math.floor(Math.random() * 2);

    if (num === 1) {
      await interaction.reply("Teta izquierda");
    } else {
      return await interaction.reply("Teta derecha");
    }
  },
};
