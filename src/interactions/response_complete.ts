import { AutocompleteInteraction, Guild } from "discord.js";
import { readFileSync } from "fs";
import { ServerResponseData } from "../Utils/ServerData";

export async function responseComplete(interaction: AutocompleteInteraction) {
    const focusedValue = interaction.options.getFocused();
    const rawData = readFileSync('./database/responses.json', 'utf-8');
    const data: Record<string, ServerResponseData> = JSON.parse(rawData);
    const choices = [] as string[];
    const serverData = data[(interaction.guild as Guild).id];
    if (!serverData || Object.keys(serverData).length === 0) return;
    Object.keys(data[(interaction.guild as Guild).id]).forEach(key => {
        choices.push(key);
    });
    const filtered = choices.filter(choice => choice.startsWith(focusedValue));
    await interaction.respond(
        filtered.map(choice => ({ name: choice, value: choice })),
    );
}