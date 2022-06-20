# HUE-BOT

<div align="center">
  <br>
  <p>
    <img src="https://res.cloudinary.com/drvo6kdsl/image/upload/f_auto,q_auto/v1655453253/site/bots/hue-bot-avatar-black_256x256_hllikm.jpg" alt="discord.js" />
  </p>
</div>

<p align="center">
  <br>
  <a href="https://discord.gg/3aR5MxGCrB">
    <img src="https://discord.com/api/guilds/576849541077401602/widget.png?style=shield" alt="Discord Server">
  </a>
  <a href="https://www.npmjs.com/package/discord.js">
    <img src="https://badgen.net/badge/Discord.js/v13.8.0/#5865F2?icon=discord" alt="Discord.JS">
  </a>
  <a href="https://nodejs.org">
    <img src="https://badgen.net/npm/node/discord.js" alt="Node version">
  </a>
  <br><br>
</p>

Hue Bot is a work in progress bot for Discord servers build on top of [discord.js](https://discord.js.org) using [node.js](https://nodejs.org). This bot will be able to connect to your philip hue bridge and control your devices with commands

## Upcoming Features:

### Commands

- `/lights`&nbsp; -> Lists all lights and their corresponding ids
- `/control [lightID] [on/off] [hue <0 - 65535>] [sat <0 - 254>] [bri <0 - 254>]`&nbsp; -> Control the specified light's on/off state and color
- `/random [lightID] [on/off]`&nbsp; -> Set the specified light's color to random
- `/hue [lightID] [hue <0 - 65535>]`&nbsp; -> Set the specified light's hue
- `/saturation [lightID] [sat <0 - 254>]`&nbsp; -> Set the specified light's saturation level
- `/brightness [lightID] [bri <0 - 254>]`&nbsp; -> Set the specified light's brightness level
