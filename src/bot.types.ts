import { SlashCommandBuilder } from "@discordjs/builders";
import { Client, Collection, CommandInteraction } from "discord.js";

export interface Command {
  data: SlashCommandBuilder;
  execute(interaction: CommandInteraction): Promise<void>;
}

export interface ApplicationClient extends Client {
  commands: Collection<unknown, Command>;
}
