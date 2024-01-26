import { Message, EmbedBuilder, ChannelType, Guild } from 'discord.js';

export async function serverCommand(message: Message) {
	const guild = (await message.guild?.fetch()) as Guild;
	const owner = await message.guild?.fetchOwner();
	const createdDate = new Date(guild.createdAt).toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' });
	const embed = new EmbedBuilder()
		.setColor('#0099ff')
		.setTitle(guild.name)
		.addFields(
			{ name: '基本情報', value: `名前: ${guild.name}(${guild.id})\n作成日: ${createdDate}\nオーナー: ${owner}` },
			{
				name: '統計',
				value: `メンバー数: ${guild.memberCount}\nテキストチャンネル数: ${
					guild.channels.cache.filter((c) => c.type === ChannelType.GuildText).size
				}\nボイスチャンネル数: ${
					guild.channels.cache.filter((c) => c.type === ChannelType.GuildVoice).size
				}\nカテゴリー数: ${guild.channels.cache.filter((c) => c.type === ChannelType.GuildCategory).size}\n絵文字数: ${guild.emojis.cache.size}`
			}
		)
		.setThumbnail(guild.iconURL());
	message.reply({ embeds: [embed] });
}
