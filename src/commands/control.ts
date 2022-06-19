import { SlashCommandBuilder } from "@discordjs/builders";
import { Command } from "../bot.types";
import {
  controlLight,
  fetchLights,
  getCurrentHue,
  getLightIds,
  id,
} from "../api/hue";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("control")
    .setDescription("Control a light's Hue, Saturation, and Brightness")
    .addIntegerOption((option) =>
      option
        .setName("light-id")
        .setDescription("ID of light to control")
        .setRequired(true)
    )
    .addIntegerOption((option) =>
      option.setName("light-hue").setDescription("Hue value: 0 - 65535")
    )
    .addIntegerOption((option) =>
      option.setName("light-sat").setDescription("Saturation value: 0 - 254")
    )
    .addIntegerOption((option) =>
      option.setName("light-bri").setDescription("Brightness value: 0 - 254")
    )
    .setDefaultMemberPermissions(0),

  async execute(interaction) {
    await interaction.deferReply();
    const lightId = interaction?.options.getInteger("light-id");
    const currentHue = await getCurrentHue(lightId);
    const hue = interaction?.options.getInteger("light-hue") || currentHue;
    const sat = interaction?.options.getInteger("light-sat") || 254;
    const bri = interaction?.options.getInteger("light-bri") || 254;
    const idList = await getLightIds(fetchLights);
    const lightIds = Object.keys(idList) as id[];
    const existingLight = lightIds.includes(lightId.toString());
    if (existingLight) {
      controlLight(lightId, { on: true, hue, bri, sat });
      await interaction.editReply(
        `Changed light ${lightId}\nhue: ${hue}\nbri: ${bri}\nsat: ${sat}`
      );
    } else {
      await interaction.editReply(`Light ${lightId} not found`);
    }
  },
} as Command;
