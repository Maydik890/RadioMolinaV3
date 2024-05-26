const { SlashCommandBuilder, EmbedBuilder } = require("@discordjs/builders");
const { QueryType, useMainPlayer } = require("discord-player");

let RadioMolinaFM = [
  "https://www.youtube.com/watch?v=qXOrx-bHiQ0",
  "https://www.youtube.com/watch?v=K2337TdVN7g",
  "https://www.youtube.com/watch?v=0jYpTMufJAo",
  "https://www.youtube.com/watch?v=UBodADVfCWE",
  "https://www.youtube.com/watch?v=0K_8iOFZCFU",
];

module.exports = {
  data: new SlashCommandBuilder()
    .setName("play")
    .setDescription("Busco y reproduzco tetas en YouTube")
    .addStringOption((option) =>
      option
        .setName("teta")
        .setDescription("URL o palabras clave de búsqueda")
        .setRequired(true)
    ),

  execute: async ({ client, interaction }) => {
    // Make sure the user is inside a voice channel

    const memberDM = interaction.member;
    const memberKick = interaction.member.voice;

    const query = interaction.options.getString("teta");

    if (!query) {
      return interaction.reply(
        "Dale flaco, pasa una URL o palabras clave de búsqueda"
      );
    }

    if (!interaction.member.voice.channel)
      return interaction.reply("Dale flaco entra al canal o te toco la teta");

    // Create a play queue for the server
    const queue = await client.player.nodes.create(interaction.guild);
    const isUrl = query.startsWith("https://");
    const player = useMainPlayer();

    player.on("error", (error) => {
      console.error(`Error emitted from the queue: ${error.message}`);
    });

    player.on("playerError", (error) => {
      console.error(`Error emitted from the player: ${error.message}`);
    });

    const channel = interaction.member.voice.channel;

    // Wait until you are connected to the channel
    if (!queue.connection) await queue.connect(channel);

    let embed = new EmbedBuilder();

    // Search for the song using the discord-player
    let result;
    if (isUrl) {
      result = await client.player.search(query, {
        requestedBy: interaction.user,
        searchEngine: QueryType.AUTO,
      });
    } else {
      result = await client.player.search(query, {
        requestedBy: interaction.user,
        searchEngine: QueryType.AUTO,
      });
    }

    // finish if no tracks were found
    if (result.tracks.length === 0)
      return interaction.reply("No encontre ninguna teta");

    // Add the track to the queue
    const song = result.tracks[0];
    await queue.addTrack(song);
    //const songPlay = queue.tracks.data[0];
    console.log(
      "La queue tiene al agregar la cancion buscada: " + queue.tracks
    );

    //Add RadioMolinaFM to the Queue
    let randomSongIndex = Math.floor(Math.random() * RadioMolinaFM.length);
    let randomSong = RadioMolinaFM[randomSongIndex];
    let radioMolinaTrack = await client.player.search(randomSong, {
      requestedBy: interaction.user,
      searchEngine: QueryType.AUTO,
    });

    console.log("Queue al agregar RadioMolinaFM: " + queue.tracks.data);

    //The bot will say what song its beeing added.
    embed
      .setDescription(
        `**[${song.title}](${song.url})** Estoy por tocarle una teta`
      )
      .setThumbnail(song.thumbnail)
      .setFooter({ text: `Duration: ${song.duration}` });
    await interaction.reply({
      embeds: [embed],
    });

    // Play the track if it isn't already playing and removes the duplicate
    if (!queue.isPlaying()) {
      await queue.play(song);
      queue.removeTrack(0);
      console.log("");
      console.log("Radio molina?" + queue.tracks.data[0]);
      console.log("Now Playing: " + song);
    }
    await queue.addTrack(radioMolinaTrack.tracks[0]);

    //Has a 1% chance to discconect the member that called RadioMolina to the channel
    if (true) {
      const randomNumber = Math.floor(Math.random() * 100) + 1;
      if (randomNumber <= 1) {
        memberKick.setChannel(null, "Te toque la teta muy fuerte, perdon");
        memberDM.send("A CASA BOBO TE FUISTE KICKEADO");
      }
    }
  },
};
