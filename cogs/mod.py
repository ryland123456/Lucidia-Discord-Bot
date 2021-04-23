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

async def dmMessage1(ctx: MyContext, user: discord.User, reason, type):
    db_guild = await get_from_db(ctx.guild)
    embed = discord.embed(title=f'You have been {type} from {ctx.guild.name}!', description=f'You violated one of our rules, so you have been punished. You can appeal this ban at https://lucidialearning.com/appeals')


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
            await ctx.guild.ban(user, reason=f"Banned by {ctx.author} for {reason}")
            await ctx.send(f"{user.mention} banned by {ctx.author.mention} for {reason}")
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
            await ctx.guild.ban(user, reason=f'Banned by {ctx.author} for {reason}')
            await ctx.guild.unban(user, reason='Softban')
            await ctx.send(f'{user.mention} softbanned by {ctx.author.mention} for {reason}')
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

        await mute(ctx, user, reason)

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

    @commands.has_permissions(ban_members=True)
    @commands.command()
    async def unban(self, ctx: MyContext, user: discord.User = None, *, reason = None):
        """
        Unbans a user
        """
        if not user:
            return await ctx.send('You need to specify a user!')

        if not reason:
            reason = 'no reason specified'

        try:
            await ctx.guild.unban(user, reason=f'Unbanned by {ctx.author} for {reason}')
            await ctx.send(f'{user.mention} unbanned by {ctx.author.mention} for {reason}')
        except discord.Forbidden:
            return await ctx.send('Permissions Error. Check the bot\'s permissions')


setup = Moderation.setup
