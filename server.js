require('dotenv').config()
const { Client, IntentsBitField } = require('discord.js')
const translate = require('translate-google')

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildPresences,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
})

const prefix = '!translate' // Bot command prefix

client.on('ready', () => {
  console.log(`Logged in as ${client.user.username}`)
})

client.on('messageCreate', async (message) => {
  //   console.log(message.content)
  if (message.author.bot || !message.content.startsWith(prefix)) return

  const args = message.content.slice(prefix.length).trim().split(/ +/)
  const texts = args.slice(2).join(' ')
  const sourceLang = args[0]
  const targetLang = args[1]

  if (args[0] === 'codes') {
    message.channel.send('https://cloud.google.com/translate/docs/languages')
  } else if (args[0] === 'help') {
    message.channel.send(
      '!translate <source language code> <target language code> <text> Example: !translate en bn Hello'
    )
  } else {
    try {
      const translation = await translate(texts, {
        from: sourceLang,
        to: targetLang,
      })
      message.channel.send(
        `**Translation (${sourceLang} to ${targetLang}):**\n${translation}`
      )
    } catch (error) {
      console.error(error)
      message.channel.send(error.message)
    }
  }
})

const token = process.env.DISCORD_TOKEN
client.login(token)
