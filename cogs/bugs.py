from datetime import datetime
import discord

from discord.ext import commands, menus

from utils.cog_class import Cog
from utils.ctx_class import MyContext

class BugReportsCog(Cog):
    @commands.command(aliases=['bug', 'bugreport', 'br', 'issue'])
    async def reportbug(self, ctx: MyContext, *, reporttext):
        """
        Report a Bug with Lucidia
        """
        web = await BugMenu('Click :desktop: to report as a Website bug, or click :robot: to report as a Discord Bot bug').prompt(ctx)
        if web:
            channel = await self.bot.fetch_channel(834554764620595220)
        if not web:
            channel = await self.bot.fetch_channel(834551360925073448)
        embed = discord.Embed(title='Bug Report', color=self.bot.color)
        embed.add_field(name='Reporter:', value=ctx.author.mention, inline=False)
        embed.add_field(name='Bug:', value=reporttext, inline=False)
        timestamp = datetime.now()
        embed.set_footer(text=timestamp)
        await channel.send(embed=embed)

        await ctx.send('Bug Report sent!')

setup = BugReportsCog.setup

class BugMenu(menus.Menu):
    def __init__(self, msg):
        super().__init__(timeout=30.0, delete_message_after=True)
        self.msg = msg
        self.result = None

    async def send_initial_message(self, ctx, channel):
        return await channel.send(self.msg)

    @menus.button('🖥️')
    async def web(self, payload):
        self.result = True
        self.stop()

    @menus.button('🤖')
    async def bot(self, payload):
        self.result = False
        self.stop()

    async def prompt(self, ctx):
        await self.start(ctx, wait=True)
        return self.result
