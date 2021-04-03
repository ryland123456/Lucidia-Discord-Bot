import discord

from discord.ext import commands
from discord.utils import get

from utils.cog_class import Cog
from utils.ctx_class import MyContext

class LucidiaInfo(Cog):
    @commands.command()
    async def faqs(self, ctx: MyContext):
        """
        Returns the Lucidia Frequently Asked Questions
        """
        embed = discord.Embed(title='Lucidia FAQs', color=0x8C52FF)
        embed.add_field(name='How do I switch languages?', value='Lucidia supports many languages! You can find a complete list, and change your lingual preference at https://www.lucidia.us/multilingual.', inline=False)
        embed.add_field(name='What is the link to yor website?', value='Our website is available at https://www.lucidia.us/.', inline=False)
        embed.add_field(name='How do I visit your blog?', value='We post articles, and updates on our blog at https://www.lucidia.us/blog.', inline=False)
        embed.add_field(name='How do I view all of the updates?', value='A list of all of our updates is available at https://www.lucidia.us/blog/tags/_update.', inline=False)
        embed.add_field(name='How do I apply for staff positions?', value='We are currently not accepting any applications. Stay tuned for more available positions later!', inline=False)
        embed.add_field(name='Where is Lucidia based?', value='Lucidia is based in New York, New York, USA.', inline=False)
        embed.add_field(name='What is the link to your forum?', value='We have a forum! Come join us at https://forum.lucidia.us/.', inline=False)
        embed.add_field(name='What is the link to your GitHub?', value='We store some of our source code at https://github.com/lucidialearning. Come check it out!', inline=False)
        embed.add_field(name='What is Lucidia Learning?', value='Lucidia Learning is a group of teenagers trying to change learning around the world to make online learning as easy as possible', inline=False)
        await ctx.send(embed=embed)

    @commands.command(aliases=['webpage', 'web'])
    async def website(self, ctx: MyContext):
        """
        Returns the Lucidia Website Link
        """
        await ctx.send('The Lucidia Learning Website is available at https://lucidia.us!')

setup = LucidiaInfo.setup