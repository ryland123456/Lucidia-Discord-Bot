import discord
import random
import math

from discord.ext import commands
from discord.utils import get

from utils.ctx_class import MyContext
from utils.cog_class import Cog

class MathCog(Cog):
    @commands.group()
    async def math(self, ctx: MyContext):
        if not ctx.invoked_subcommand:
            await ctx.send("Lucidia Math Command!\nSyntax: `+math <option> <number/equation>`")

    @math.command()
    async def sqrt(self, ctx: MyContext, *, number):
        """
        Returns the square root of a number you specify
        """
        try:
            input = int(number)
            result = math.sqrt(input)
            embed = discord.Embed(title='Equation Results', color=0x8C52FF)
            embed.add_field(name='Equation', value=f'Square Root of {input}', inline=False)
            embed.add_field(name='Solution', value=str(result), inline=False)
            await ctx.send(embed=embed)
        except ValueError as e:
            await ctx.send(f'Unable to find square root: {e}')

    @math.command()
    async def solve(self, ctx: MyContext, *, equation):
        """
        Solves an equation that you enter as an argument
        """
        try:
            input = equation
            result = eval(input)
            embed = discord.Embed(title='Equation Results', color=0x8C52FF)
            embed.add_field(name='Equation', value=input, inline=False)
            embed.add_field(name='Solution', value=str(result), inline=False)
            await ctx.send(embed=embed)
        except ZeroDivisionError:
            await ctx.send("You can't divide 0 into 0!")

    @math.command()
    async def pi(self, ctx: MyContext):
        """
        Returns the number Pi
        """
        embed = discord.Embed(title='Equation Results', color=0x8C52FF)
        embed.add_field(name='Equation', value='pi', inline=False)
        embed.add_field(name='Solution', value=str(math.pi), inline=False)
        await ctx.send(embed=embed)





setup = MathCog.setup