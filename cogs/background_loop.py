import random
import discord

from discord.ext import commands, tasks
from utils.cog_class import Cog


class BackgroundLoop(Cog):
    def __init__(self, bot, *args, **kwargs):
        super().__init__(bot, *args, **kwargs)
        self.index = 0
        self.background_loop.start()
        self.presence.start()

    def cog_unload(self):
        self.background_loop.cancel()

    @tasks.loop(minutes=15)
    async def background_loop(self):
        pass

    @background_loop.before_loop
    async def before(self):
        await self.bot.wait_until_ready()
    
    @tasks.loop(seconds=30)
    async def presence(self):
        statusChooser = random.randint(1, 3)
        if statusChooser == 1:
            messages1 = [
                "wix.js",
                "discord.py",
                "headaches",
                "the aeneid game",
                "spin the bottle",
                "a game",
                "marketing",
                "stackoverflow",
                "Bot Rev. 2",
                "with your expensive toys",
                "cards",
                "with duck tape",
                "New website :eyes:",
                "New Logo :eyes:",
                "Green is the new purple",
            ]
            messageCount1 = len(messages1)
            randInt1 = random.randint(0, int(messageCount1) - 1)
            status1 = messages1[randInt1]
            await self.bot.change_presence(activity=discord.Game(name=str(status1)))
        if statusChooser == 2:
            messages2 = [
                "ryland ranting",
                "ryland saying his passwords outloud in vc",
                "static",
                "whitenoise",
                "asmr",
                "minecraft music",
                "hydro ranting",
                "hydro talking to himself",
                "ryland ranting about track (again)",
                ":uwu:",
                "dsc.gg/lucidia"
            ]
            messageCount2 = len(messages2)
            randInt2 = random.randint(0, int(messageCount2) - 1)
            status2 = messages2[randInt2]
            await self.bot.change_presence(activity=discord.Activity(type=discord.ActivityType.listening, name=str(status2)))
        if statusChooser == 3:
            messages3 = [
                "ryland exposing company secrets",
                "sitemap",
                "kraft mac-n-cheese",
                "ltt",
                "mysite",
                "covid bot ?",
                "hydro doxxing himself",
                "curling",
                "thomas and friends",
                "dOGbone's minecraft streams"
            ]
            messageCount3 = len(messages3)
            randInt3 = random.randint(0, int(messageCount3) - 1)
            status3 = messages3[randInt3]
            await self.bot.change_presence(activity=discord.Activity(type=discord.ActivityType.watching, name=str(status3))


    @presence.before_loop
    async def before(self):
        await self.bot.wait_until_ready()
setup = BackgroundLoop.setup
