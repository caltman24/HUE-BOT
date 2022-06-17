import * as fs from "node:fs";
import * as path from "node:path";
import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v9";
import { Collection } from "discord.js";
import { Command } from "./bot.types";
import { config } from "dotenv";
config();
const { GUILD_ID, CLIENT_ID, TOKEN } = process.env;

const commands: Collection<unknown, Command>[] = [];
const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs
  .readdirSync(commandsPath)
  .filter((file) => file.endsWith(".js") || file.endsWith(".ts"));

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  commands.push(command.data.toJSON());
}

const rest = new REST({ version: "9" }).setToken(TOKEN);

rest
  .put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), {
    body: commands,
  })
  .then(() => console.log("Successfully deployed commands!"))
  .catch(console.error);
