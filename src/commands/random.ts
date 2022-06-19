import { SlashCommandBuilder } from "@discordjs/builders";
import { Command } from "../bot.types";
import {
  controlLight,
  fetchLights,
  getLightIds,
  id,
  randomHue,
} from "../api/hue";

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
    await interaction.deferReply();
    const lightId = interaction.options.getInteger("light-id");
    const idList = await getLightIds(fetchLights);
    const lightIds = Object.keys(idList) as id[];
    const existingLight = lightIds.includes(lightId.toString());
    if (existingLight) {
      const hue = randomHue();
      controlLight(lightId, { on: true, hue });
      await interaction.editReply(`Changed light ${lightId} to hue ${hue}`);
    } else {
      await interaction.editReply(`Light ${lightId} not found`);
    }
  },
} as Command;
