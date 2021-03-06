import discord
import json
import sys
import time

from discord.ext import commands

from utils.cog_class import Cog
from utils.ctx_class import MyContext

with open('release.json') as f:
    data = json.load(f)
    release = data['lbVersion']


class Utilities(Cog):
    @commands.command()
    async def version(self, ctx: MyContext):
        """
        Returns current bot version
        """
        verEmbed = discord.Embed(title="Lucidia Version Info", description='', color=self.bot.color)
        verEmbed.add_field(name='Version', value=data['lbVersion'], inline='true')
        verEmbed.add_field(name='Release Date', value=data['releaseDate'], inline='true')
        verEmbed.add_field(name='Have Issues?', value='Let us know at our Git page!\n https://git.lucidia.us/LucidiaLearning/Lucidia-Discord-Bot', inline='false')
        verEmbed.add_field(name='System Info', value=f'Running Python {sys.version_info.major}.{sys.version_info.minor}.{sys.version_info.micro} on {sys.platform}', inline='true')
        await ctx.send(embed=verEmbed)

    @commands.command()
    async def invite(self, ctx: MyContext):
        """
        Grabs the invite links for this bot and the Lucidia Discord Server
        """
        inviteEmbed = discord.Embed(title='Lucidia Invite Links', color=self.bot.color)
        inviteEmbed.add_field(name='Bot Invite', value='https://discord.com/oauth2/authorize?client_id=795777717982724106&scope=bot&permissions=805309458', inline=True)
        inviteEmbed.add_field(name='Support Server Invite', value='https://discord.gg/mQC6akazyG')
        inviteEmbed.set_footer(text=f'Current Bot Version: v{release}')
        await ctx.send(embed=inviteEmbed)

    @commands.command()
    async def credits(self, ctx: MyContext):
        """
        Returns the credits for Lucidia
        """
        hydro: discord.User = await self.bot.fetch_user(711960088553717781)
        ry: discord.User = await self.bot.fetch_user(712687059113869323)
        eyes: discord.User = await self.bot.fetch_user(138751484517941259)
        hydro_mention: str = hydro.mention
        ry_mention: str = ry.mention
        eyes_mention: str = eyes.mention
        creditsEmbed = discord.Embed(title='Lucidia Credits', color=self.bot.color)
        creditsEmbed.add_field(name='Developer', value=hydro_mention)
        creditsEmbed.add_field(name='Developer', value=ry_mention)
        creditsEmbed.add_field(name='Bot Framework Developer', value=eyes_mention)
        creditsEmbed.set_footer(text=f'Current Bot Version: v{release}')
        await ctx.send(embed=creditsEmbed)

    @commands.command()
    async def ping(self, ctx: MyContext):
        """
        Check that the bot is online, give the latency between the bot and discord servers.
        """
        _ = await ctx.get_translate_function()

        t_1 = time.perf_counter()
        await ctx.trigger_typing()  # tell Discord that the bot is "typing", which is a very simple request
        t_2 = time.perf_counter()
        time_delta = round((t_2 - t_1) * 1000)  # calculate the time needed to trigger typing
        await ctx.send(_("Pong. ??? Time taken: {miliseconds}ms", miliseconds=time_delta))  # send a message telling the user the calculated ping time


setup = Utilities.setup
