const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v10");
const { Client, GatewayIntentBits, Collection } = require("discord.js");
const { Player } = require("discord-player");
const TOKEN =
  "MTIyMzM3MDcyMzA0NTkzNzIxMg.GsIW0B.eObD3JjZL5kUx5OQtf6SlGXU11sG2O4Zgvi4n8";
const CLIENT_ID = "1223370723045937212";
const fs = require("fs");
const path = require("path");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildMembers,
  ],
});

// List of all commands
const commands = [];
client.commands = new Collection();

const commandsPath = path.join(__dirname, "commands"); // E:\yt\discord bot\js\intro\commands
const commandFiles = fs
  .readdirSync(commandsPath)
  .filter((file) => file.endsWith(".js"));
for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);

  client.commands.set(command.data.name, command);
  commands.push(command.data.toJSON());
}

// Add the player on the client
client.player = new Player(client);

client.on("ready", () => {
  // Get all ids of the servers
  const guild_ids = client.guilds.cache.map((guild) => guild.id);

  const rest = new REST({ version: "9" }).setToken(TOKEN); //process.env.TOKEN
  for (const guildId of guild_ids) {
    rest
      .put(Routes.applicationGuildCommands(CLIENT_ID, guildId), {
        body: commands,
      })
      .then(() =>
        console.log("Successfully updated commands for guild " + guildId)
      )
      .catch(console.error);
  }
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;

  const command = client.commands.get(interaction.commandName);
  if (!command) return;

  try {
    await command.execute({ client, interaction });
  } catch (error) {
    console.error(error);
    await interaction.reply({
      content: "There was an error executing this command",
    });
  }
});

client.player.extractors.loadDefault();
client.login(TOKEN);