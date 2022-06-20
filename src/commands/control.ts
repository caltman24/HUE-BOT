import { SlashCommandBuilder } from "@discordjs/builders";
import { Command } from "../bot.types";
import {
  controlLight,
  fetchLights,
  getCurrentHue,
  getCurrentSaturation,
  getCurrentBrightness,
  getLightIds,
  id,
} from "../api/hue";

// TODO: Add "state" command to dd the ability to turn off light without changing other values
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
    const idList = await getLightIds(fetchLights);
    const lightIds = Object.keys(idList) as id[];
    const existingLight = lightIds.includes(lightId.toString());
    if (existingLight) {
      const currentHue = await getCurrentHue(lightId);
      const currentSat = await getCurrentSaturation(lightId);
      const currentBri = await getCurrentBrightness(lightId);
      const hue = interaction?.options.getInteger("light-hue") || currentHue;
      const sat = interaction?.options.getInteger("light-sat") || currentSat;
      const bri = interaction?.options.getInteger("light-bri") || currentBri;
      controlLight(lightId, { on: true, hue, sat, bri });
      await interaction.editReply(
        `Changed light ${lightId}\nhue: ${hue}\nbri: ${bri}\nsat: ${sat}`
      );
    } else {
      await interaction.editReply(`Light ${lightId} not found`);
    }
  },
} as Command;
