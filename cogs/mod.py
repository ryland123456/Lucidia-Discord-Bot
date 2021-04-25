import discord

from discord.ext import commands

from utils.cog_class import Cog
from utils.ctx_class import MyContext
from utils.models import get_from_db


async def mute(ctx: MyContext, user: discord.User, reason=None):
    role = discord.utils.get(ctx.guild.roles, name='Muted')
    if not role:
        try:
            muted = await ctx.guild.create_role(name='Muted')
            for channel in ctx.guild.channels:
                await channel.set_permissions(muted, send_messages=False)
        except discord.Forbidden:
            return await ctx.send('Permissions Error. Check the bot\'s permissions')
        await user.add_roles(muted)
        await ctx.send(f'{user.mention} has been muted by {ctx.author.mention} for {reason}')
    else:
        await user.add_roles(role)
        await ctx.send(f'{user.mention} has been muted by {ctx.author.mention} for {reason}')

async def dmMessage1(ctx: MyContext, user: discord.User, reason, type, moderator, caseNum):
    embed = discord.Embed(title=f'You have been {type} from {ctx.guild.name}!', description=f'You violated one of our rules, so you have been punished. You can appeal this ban at https://lucidialearning.com/appeals', color=0x8C52FF)
    embed.add_field(name='Reason', value=reason, inline=False)
    embed.add_field(name='Case Number', value=caseNum, inline=False)
    embed.add_field(name='Responsible Moderator', value=moderator, inline=False)
    await user.send(embed=embed)

async def logger(ctx: MyContext, user: discord.user, reason, type, moderator, caseNum):
    db_guild = await get_from_db(ctx.guild)
    channel = discord.utils.get(ctx.guild.channels, id=db_guild.logChan)
    embed = discord.Embed(title=f'Disciplinary Action: {type}', color=0x8C52FF)
    embed.add_field(name='Victim', value=user, inline=False)
    embed.add_field(name='Reason', value=reason, inline=False)
    embed.add_field(name='Case Number', value=caseNum, inline=False)
    embed.add_field(name='Responsible Moderator', value=moderator, inline=False)
    await channel.send(embed=embed)
    


class Moderation(Cog):
    @commands.has_permissions(ban_members=True)
    @commands.command()
    async def ban(self, ctx: MyContext, user: discord.User = None, *, reason=None):
        """
        Bans a member from the guild
        """
        if not user:
            return await ctx.send('You need to specify a user!')

        if not reason:
            reason = 'no reason specified'

        try:
            db_guild = await get_from_db(ctx.guild)
            await dmMessage1(ctx, user, reason, "banned", ctx.author, db_guild.caseNum)
            await logger(ctx, user, reason, "Ban", ctx.author, db_guild.caseNum)
            db_guild.caseNum = db_guild.caseNum + 1
            await db_guild.save()
            await ctx.guild.ban(user, reason=f"Banned by {ctx.author} for {reason}")
            await ctx.send(f":boom: {user} has been banned! (Permanently)")
        except discord.Forbidden:
            return await ctx.send('Permission Error. Check the bot\'s permissions.')

    @commands.has_permissions(ban_members=True)
    @commands.command()
    async def softban(self, ctx: MyContext, user: discord.User = None, *, reason=None):
        """
        Bans a user temporarily
        """
        if not user:
            return await ctx.send('You need to specify a user!')

        if not reason:
            reason = 'no reason specified'

        try:
            db_guild = await get_from_db(ctx.guild)
            await dmMessage1(ctx, user, reason, "banned", ctx.author, db_guild.caseNum)
            await logger(ctx, user, reason, "Ban", ctx.author, db_guild.caseNum)
            db_guild.caseNum = db_guild.caseNum + 1
            await db_guild.save()
            await ctx.guild.ban(user, reason=f'Banned by {ctx.author} for {reason}')
            await ctx.guild.unban(user, reason='Softban')
            await ctx.send(f':boom: {user} has been softbanned!')
        except discord.Forbidden:
            return await ctx.send('Permission Error. Check the bot\'s permissions')

    @commands.has_permissions(manage_messages=True)
    @commands.command()
    async def mute(self, ctx: MyContext, user: discord.User = None, *, reason=None):
        """
        Prevents a user from communicating in chat
        """
        if not user:
            return await ctx.send('You need to specify a user!')

        if not reason:
            reason = 'no reason specified'

        db_guild = await get_from_db(ctx.guild)
        await dmMessage1(ctx, user, reason, "muted", ctx.author, db_guild.caseNum)
        await logger(ctx, user, reason, "Ban", ctx.author, db_guild.caseNum)
        db_guild.caseNum = db_guild.caseNum + 1
        await db_guild.save()
        await mute(ctx, user, reason)
        await ctx.send(f':boom: {user} has been muted!')

    @commands.has_permissions(manage_channels=True)
    @commands.command()
    async def purge(self, ctx: MyContext, number: int):
        """
        Deletes messages in bulk
        """
        await ctx.channel.purge(limit=number + 1)
        await ctx.send(f'`{number}` messages deleted in bulk')

    @commands.has_permissions(manage_messages=True)
    @commands.command()
    async def unmute(self, ctx: MyContext, user: discord.User = None):
        """
        Unmutes a muted member
        """
        if not user:
            return await ctx.send('You need to specify a user!')

        try:
            await user.remove_roles(discord.utils.get(ctx.guild.roles, name='Muted'))
            await ctx.send(f'{user.mention} unmuted')
        except discord.HTTPException:
            return await ctx.send(f'It appears {user.mention} is not muted!')

    @commands.has_permissions(kick_members=True)
    @commands.command()
    async def kick(self, ctx: MyContext, user: discord.User = None, reason=None):
        """
        Kicks a member
        """

        if not user:
            return await ctx.send('You need to specify a user!')

        try:
            db_guild = await get_from_db(ctx.guild)
            await dmMessage1(ctx, user, reason, "kicked", ctx.author, db_guild.caseNum)
            await logger(ctx, user, reason, "Ban", ctx.author, db_guild.caseNum)
            db_guild.caseNum = db_guild.caseNum + 1
            await db_guild.save()
            await ctx.guild.kick(user, reason=reason)
            await ctx.send(f':boom: {user} has been kicked!')
        except discord.Forbidden:
            await ctx.send('Permission Error. Check the bot\'s permissions.')

setup = Moderation.setup