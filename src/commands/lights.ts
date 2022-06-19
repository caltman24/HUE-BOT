// TODO: add `lights` command that returns a list of lights and their IDs
import { SlashCommandBuilder } from "@discordjs/builders";
import { Command } from "../bot.types";
import { fetchLights, getLightIds, id } from "../api/hue";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("lights")
    .setDescription("Return a list of lights and their IDs"),
  async execute(interaction) {
    const idList = await getLightIds(fetchLights);
    const lightIds = Object.keys(idList) as id[];
    const lightNames = Object.values(idList);
    const lightList = lightIds.map((id, i) => `${id}: ${lightNames[i]}`);
    await interaction.reply({
      content: `${lightList.join("\n")}`,
      ephemeral: true,
    });
  },
} as Command;
