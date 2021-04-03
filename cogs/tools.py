import discord
import json
import sys

from discord.ext import commands
from discord.utils import get

from utils.cog_class import Cog
from utils.ctx_class import MyContext

with open('release.json') as f:
    data = json.load(f)
    release = data['lbVersion']

class ToolsCog(Cog):
    @commands.command()
    async def version(self, ctx: MyContext):
        verEmbed = discord.Embed(title="Lucidia Version Info", description='', color=0x8C52FF)
        verEmbed.add_field(name='Version', value=data['lbVersion'], inline='true')
        verEmbed.add_field(name='Release Date', value=data['releaseDate'], inline='true')
        verEmbed.add_field(name='Have Issues?', value='Let us know at our GitHub page!\n https://github.com/LucidiaLearning/Lucidia-Discord-Bot', inline='false')
        verEmbed.add_field(name='System Info', value=f'Running Python {sys.version_info.major}.{sys.version_info.minor}.{sys.version_info.micro} on {sys.platform}', inline='true')
        await ctx.send(embed=verEmbed)

    @commands.command()
    async def invite(self, ctx: MyContext):
        inviteEmbed = discord.Embed(title='Lucidia Invite Links', color=0x8C52FF)
        inviteEmbed.add_field(name='Bot Invite', value='https://discord.com/oauth2/authorize?client_id=795777717982724106&scope=bot&permissions=805309458', inline=True)
        inviteEmbed.add_field(name='Support Server Invite', value='https://discord.gg/mQC6akazyG')
        inviteEmbed.set_footer(text=f'Current Bot Version: v{release}')
        await ctx.send(embed=inviteEmbed)

    @commands.command()
    async def credits(self, ctx: MyContext):
        hydro: discord.User = await self.bot.fetch_user(711960088553717781)
        kai: discord.User =  await self.bot.fetch_user(780818479376236555)
        ry: discord.User = await self.bot.fetch_user(712687059113869323)
        eyes: discord.User = await self.bot.fetch_user(138751484517941259)
        hydro_mention: str = hydro.mention
        kai_mention: str = kai.mention
        ry_mention: str = ry.mention
        eyes_mention: str = eyes.mention
        creditsEmbed = discord.Embed(title='Lucidia Credits', color=0x8C52FF)
        creditsEmbed.add_field(name='Developer', value=hydro_mention)
        creditsEmbed.add_field(name='Developer', value=kai_mention)
        creditsEmbed.add_field(name='Developer/Lucidia Executive', value=ry_mention)
        creditsEmbed.add_field(name='Bot Framework Developer', value=eyes_mention)
        creditsEmbed.set_footer(text=f'Current Bot Version: v{release}')
        await ctx.send(embed=creditsEmbed)


setup = ToolsCog.setup