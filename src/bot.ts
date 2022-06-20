import { config } from "dotenv";
config();
import { Client, Collection, CommandInteraction, Intents } from "discord.js";
import { ApplicationClient } from "./bot.types";
const { TOKEN } = process.env;
import * as fs from "node:fs";
import * as path from "node:path";

const client = new Client({
  intents: [Intents.FLAGS.GUILDS],
}) as ApplicationClient;

// TODO: Commands - /hue; /sat; /bri /state;
client.commands = new Collection();
const commandPath = path.join(__dirname, "commands");
const commandFiles = fs
  .readdirSync(commandPath)
  .filter((file) => file.endsWith(".ts") || file.endsWith(".js"));

for (const file of commandFiles) {
  const filePath = path.join(commandPath, file);
  const command = require(filePath);
  client?.commands.set(command?.data.name, command);
}

client.once("ready", () => {
  const { user } = client;
  console.log(`Logged in as ${user.tag}!`);
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;

  const command = client?.commands.get(interaction.commandName);
  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply("Something went wrong!");
  }
});

client.login(TOKEN);
