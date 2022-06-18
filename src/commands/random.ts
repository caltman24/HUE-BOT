import { SlashCommandBuilder } from "@discordjs/builders";
import { Command } from "../bot.types";
import { controlLight, hues, randomHue } from "../api/fetchLights";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("random")
    .setDescription("Set office light to random"),
  async execute(interaction) {
    const hue = randomHue();
    const light: string = "12";
    controlLight(light, {on: true, hue});
    await interaction.reply(`Changed light ${light} to hue ${hue}`);
  },
} as Command;
