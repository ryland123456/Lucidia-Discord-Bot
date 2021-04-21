from datetime import datetime
import discord
import json
from typing import Optional

from discord.ext import commands, tasks
from discord.utils import get

from utils.cog_class import Cog
from utils.ctx_class import MyContext

active_suggestions = {}

with open('staff.json') as f:
    data = json.load(f)
    staff = data
class SuggestionCog(Cog):
    @commands.command()
    async def suggest(self, ctx: MyContext, *, suggestion):
        """
        Suggest something for Lucidia!
        """
        suggestionChannel = self.bot.get_channel(834551330294333491)
        await suggestionChannel.trigger_typing()
        staffRole: discord.Role = get(ctx.guild.roles, id=759004351116607520)
        staff_mention: str = staffRole.mention
        embed = discord.Embed(title='Suggestion', color=0x8C52FF)
        embed.add_field(name='Suggestor:', value=ctx.author.mention, inline=False)
        embed.add_field(name='Suggestion:', value=suggestion, inline=False)
        embed.add_field(name='Voting:', value=f'React with :white_check_mark: to vote for the suggestion\nReact with :x: to vote against this suggestion\n{staff_mention} can deny a suggestion with :octagonal_sign:', inline=False)
        timestamp = datetime.now()
        embed.set_footer(text=timestamp)
        try:
            msg = await suggestionChannel.send(embed=embed)
            await msg.add_reaction("✅")
            await msg.add_reaction("❌")
            await msg.add_reaction("🛑")
        except discord.HTTPException:
            await ctx.send('Failed to send suggestion to due Discord Error. Try again later.')
        else:
            await ctx.send('Suggestion sent!')
            active_suggestions[msg.id] = suggestion

    @commands.Cog.listener()
    async def on_raw_reaction_add(self, payload: discord.RawReactionActionEvent):
        if payload.user_id == self.bot.user.id: return
        guild: discord.Guild = self.bot.get_guild(payload.guild_id)
        staffRole = get(guild.roles, id=759004351116607520)
        if payload.emoji.name == "🛑" and payload.channel_id == 834551330294333491:
            if payload.user_id in staff and payload.message_id in active_suggestions:
                denied_suggestion = discord.Embed(title="Denied Suggestion!", description="This suggestion was denied by Lucidia Staff.", color=0x8C52FF)
                denied_suggestion.add_field(name="Suggestion", value=active_suggestions[payload.message_id])
                channel: discord.TextChannel = self.bot.get_channel(payload.channel_id)
                msg: discord.Message = await channel.fetch_message(payload.message_id)
                timestamp = datetime.now()
                denied_suggestion.set_footer(text=timestamp)
                await msg.edit(embed=denied_suggestion)
                await msg.clear_reactions()
            else:
                user: Optional[discord.User] = await self.bot.fetch_user(payload.user_id)
                if user is not None:
                    await user.send("You don't have permission to deny this suggestion!")

setup = SuggestionCog.setup
