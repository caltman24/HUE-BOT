import { SlashCommandBuilder } from "@discordjs/builders";
import { Command } from "../bot.types";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Replies with Pong!"),
  async execute(interaction) {
    await interaction.reply("pong");
  },
} as Command;
