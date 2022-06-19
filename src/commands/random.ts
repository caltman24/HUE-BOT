import { SlashCommandBuilder } from "@discordjs/builders";
import { Command } from "../bot.types";
import { controlLight, hues, randomHue } from "../api/hue";
import { CommandInteractionOptionResolver } from "discord.js";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("random")
    .setDescription("Set office light to random")
    .addIntegerOption((option) =>
      option
        .setName("light-id")
        .setDescription("ID of light to control")
        .setRequired(true)
    ),
  async execute(interaction) {
    const hue = randomHue();
    const lightId = interaction.options.getInteger("light-id");
    controlLight(lightId, { on: true, hue });
    await interaction.reply(`Changed light ${lightId} to hue ${hue}`);
  },
} as Command;
