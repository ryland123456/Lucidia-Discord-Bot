from datetime import datetime
import discord
import dateutil

from discord.ext import commands, tasks
from discord.utils import get

from utils.cog_class import Cog
from utils.ctx_class import MyContext

class SuggestionCog(Cog):
    @commands.command()
    async def suggest(self, ctx: MyContext, *, suggestion):
        """
        Suggest something for Lucidia!
        """
        suggestionChannel = self.bot.get_channel(756310243046195330)
        await suggestionChannel.trigger_typing()
        ry: discord.User = await self.bot.fetch_user(712687059113869323)
        ry_mention: str = ry.mention
        embed = discord.Embed(title='Suggestion', color=0x8C52FF)
        embed.add_field(name='Suggestor:', value=ctx.author.mention, inline=False)
        embed.add_field(name='Suggestion:', value=suggestion, inline=False)
        embed.add_field(name='Voting:', value=f'React with :white_check_mark: to vote for the suggestion\nReact with :x: to vote against this suggestion\n{ry_mention} can deny a suggestion with :octagonal_sign:', inline=False)
        timestamp = datetime.now()
        embed.set_footer(text=timestamp)
        msg = await suggestionChannel.send(embed=embed)
        await msg.add_reaction("✅")
        await msg.add_reaction("❌")
        await msg.add_reaction("🛑")
        await ctx.send('Suggestion sent!')

setup = SuggestionCog.setup