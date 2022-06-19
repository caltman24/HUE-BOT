import { SlashCommandBuilder } from "@discordjs/builders";
import { Command } from "../bot.types";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("List all commands"),
  async execute(interaction) {
    await interaction.reply("Upcoming Feature");
  },
} as Command;
