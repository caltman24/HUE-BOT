import { SlashCommandBuilder } from "@discordjs/builders";
import { Command } from "../bot.types";
import { fetchLights, getLightIds, id } from "../api/hue";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("lights")
    .setDescription("Return a list of lights and their IDs")
    .setDefaultMemberPermissions(0),
  async execute(interaction) {
    await interaction.deferReply({ ephemeral: true });
    const idList = await getLightIds(fetchLights);
    const lightIds = Object.keys(idList) as id[];
    const lightNames = Object.values(idList);
    const lightList = lightIds.map((id, i) => `${id}: ${lightNames[i]}`);
    await interaction.editReply(lightList.join("\n"));
  },
} as Command;
