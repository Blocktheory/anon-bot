
require('dotenv').config();
const WEB_APP_URL = "https://t.me/anonethindiabot/verify";
const QR_CODE_URL = "https://t.me/anonethindiabot/QRCode"
let events =
    [{
        title: "Eth India",
        desc: "Description for Eth India",
        image: "https://pbs.twimg.com/card_img/1731936556791869441/VcN1pLLO?format=png&name=4096x4096",
        id: "1"
    }, {
        title: "Pragma India",
        desc: "Description for Pragma India",
        image: "https://storage.googleapis.com/ethglobal-api-production/events%2Fyf95p%2Flogo%2F1694008136857_Pragam_Logo.jpeg",
        id: "2"
    }, {
        title: "G20 Summit",
        desc: "The Group of Twenty (G20) summit is an annual gathering of leaders from the world's major economies to discuss and coordinate on global economic issues. The G20 was established in 1999 in response to the financial crises of the late 1990s, with the first summit held in 2008 during the global financial crisis. The participating countries include both developed and emerging economies, representing a diverse range of perspectives and interests.",
        image: "https://images.thequint.com/thequint%2F2022-11%2F241ac0a8-9317-4d4f-83ea-cca724bcc14a%2FUntitled_design__4_.png?auto=format%2Ccompress&fmt=webp&width=720&w=1200",
        id: "3"
    }];


const QRCode = require('qrcode')
const { Telegraf, Markup } = require('telegraf')
const { message } = require('telegraf/filters');
const getEvents = require('./contractcalls').getEvents;
const registerEvent = require('./contractcalls').registerEvent;

const bot = new Telegraf(process.env.BOT_TOKEN)
bot.start(async (ctx) => {
    const telegramId = ctx.update.message.from.username;
    const res = await getEvents({ telegramId });
    if (res.length == 0) {
        ctx.reply(`Welcome, lets get you started. But first we need to verify the user ${WEB_APP_URL}`)
    } else {
        ctx.reply('Welcome back! You can check the upcoming events (/events) and registered events from the commands menu. (/registered)')
    }
})
bot.help((ctx) => ctx.reply('Reach out to @chandherThunder'))
bot.on(message('sticker'), (ctx) => ctx.reply('👍'))
bot.hears('hi', (ctx) => ctx.reply('Hey there'))




bot.command('events', (ctx) => {
    const keyboard = Markup.inlineKeyboard(
        events.map(event => Markup.button.callback(event.title, event.id))
    );
    ctx.reply("Here are the events you can register to: ", keyboard)
});

bot.command('registered', async (ctx) => {
    // HERE CALL FOR REGISTERED EVENTS
    const telegramId = ctx.update.message.from.username;

    const res = await getEvents({ telegramId });
    const result = [];
    res.forEach(contract => {
        let id = contract[0].toString();
        let name = contract[1];
        let creator = contract[2];

        console.log(`ID: ${id}, Name: ${name}, Creator: ${creator}`);
        result.push({ name: name, id: id })
    });


    const keyboard = Markup.inlineKeyboard(
        result.map(event => Markup.button.callback(event.name, JSON.stringify({ id: event.id, type: 'QR' })))
    );

    ctx.reply("Here are the events that you have registered:", keyboard)
});

bot.on('callback_query', async (ctx) => {
    const data = ctx.callbackQuery.data;
    const event = events.find(event => event.id == data)
    if (!event) {
        const jdata = JSON.parse(data);
        const username = ctx.update.callback_query.from.username;
        if (jdata?.type == 'register') {
            // HERE CALL FOR REGISTRATION OF EVENT

            registerEvent({ eventId: jdata.id, telegramId: username });
            ctx.reply(`You are registered ${jdata?.id}!`);
        } else if (jdata?.type == 'QR') {
            const event = events.find(event => event.id == jdata.id)
            ctx.reply(`You have registered ${event.title}, here is your Check in QR Code: ${QR_CODE_URL}`);
        }
        else {
            ctx.reply(`Could not find the event`);
        }
    } else {

        const buttons = Markup.inlineKeyboard([Markup.button.callback('Register', JSON.stringify({ id: event.id, type: "register" }))]);

        // contract calling us

        await ctx.replyWithPhoto(
            { url: event.image },
            {
                caption: event.title,
                parse_mode: 'MarkdownV2'
            }
        );
        ctx.reply(`Do you want to register for the ${event.title}:`, buttons)
    }

});

bot.launch()

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))