import discord

from discord.ext import commands

from utils.cog_class import Cog
from utils.ctx_class import MyContext

class JoinLeaveMessaages(Cog):
    @commands.Cog.listener()
    async def on_member_join(self, member: discord.Member):
        channel = self.bot.get_channel(834553737443016744)
        fmt = "{} has joined"
        await channel.send(fmt.format(member))

    @commands.Cog.listener()
    async def on_member_remove(self, member: discord.Member):
        channel = self.bot.get_channel(834553737443016744)
        fmt = '{} has left'
        await channel.send(fmt.format(member))

setup = JoinLeaveMessaages.setup
