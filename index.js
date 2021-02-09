const Discord = require("discord.js");
const axios = require('axios').default;
const path = require( 'path' );
const express = require( 'express' );
const open = require( 'open' );
const fs = require('fs');
const jsonfile = require('jsonfile');
var colors = require("colors")
const notifier = require('node-notifier');
var setTitle = require('console-title');
var center = require('center-align');

var client = new Discord.Client({
	autoReconnect: true,
});
client.events = new Discord.Collection();
client.commands = new Discord.Collection();
client.cooldowns = new Discord.Collection();
        
const {
    prefix,
    token,
    token_snipe,
    joins,
    uid,
    waittime,
    config_port
    } = require("./config.json");

client.on('ready', () => {
    setTitle("RoboBot Selfbot | Fastest Selfbot");
    console.log( '                                                               ' );
    console.log(center( '██████╗  ██████╗ ██████╗  ██████╗     ██████╗  ██████╗ ████████╗    ' ));
    console.log(center( '██╔══██╗██╔═══██╗██╔══██╗██╔═══██╗    ██╔══██╗██╔═══██╗╚══██╔══╝    ' ));
    console.log(center( '██████╔╝██║   ██║██████╔╝██║   ██║    ██████╔╝██║   ██║   ██║       ' ));
    console.log(center( '██╔══██╗██║   ██║██╔══██╗██║   ██║    ██╔══██╗██║   ██║   ██║       ' ));
    console.log(center( '██║  ██║╚██████╔╝██████╔╝╚██████╔╝    ██████╔╝╚██████╔╝   ██║       ' ));
    console.log(center( '╚═╝  ╚═╝ ╚═════╝ ╚═════╝  ╚═════╝     ╚═════╝  ╚═════╝    ╚═╝       ' ));
    console.log(center( `Logged in as ${client.user.tag} and sniping stuff in ${client.guilds.size} guilds!\n\n` ));
    console.log( '\x1b[40m%s\x1b[0m', `Nitro Sniper Online!`);
    console.log( '\x1b[40m%s\x1b[0m', `Giveaway Sniper Online!\n`);
    console.log( '\x1b[40m%s\x1b[0m', `Bot Online And Ready To Use!`);
    console.log( '     ');
});

( async function() {
    
    const app = express();
    const port = config_port;

    const host = `http://127.0.0.1:` + port;

    app.use( '/web', express.static( path.join( __dirname, './src/www' ) ) );

    app.use( '/files/images', express.static( path.join( __dirname, './src/static/images' ) ) );

    app.get( '/api/images', ( req, res ) => {
        res.contentType( 'application/json' );
        res.sendFile( path.join( __dirname, './src/static/jsons/images.json' ) );
    } );

    app.listen( port , async () => {

    } );

} )();


client.on('message', async message => {
    var start = new Date()
    function getDateTime() {

        var date = new Date();
    
        var hour = date.getHours();
        hour = (hour < 10 ? "0" : "") + hour;
    
        var min  = date.getMinutes();
        min = (min < 10 ? "0" : "") + min;
    
        var sec  = date.getSeconds();
        sec = (sec < 10 ? "0" : "") + sec;
    
    
        return hour + ":" + min + ":" + sec;
    
    }
    var time = new Date() - start
    if(message.content.includes('discord.gift') || message.content.includes('discordapp.com/gifts/')) {

        if(message.channel.type == "DM") {
            var ct = "DM" 
         } else {
            var ct = message.guild.name
         }

        var gift = /(discord\.(gift)|discordapp\.com\/gift)\/.+[a-z]/
        var link = gift.exec(message.content);
        if(!link) return;
        var gcode = link[0].split('/')[1];

        console.log(`[${getDateTime()}] | Unknown code from ${message.author.tag} in ${ct} | ${time}ms`);
        axios({
            method: 'POST',
            url: `https://discordapp.com/api/v6/entitlements/gift-codes/${gcode}/redeem`, 
            headers: 
            {
            'Authorization': token 
            }
        }).then(
            () => {console.log(`[${getDateTime()}] | Claimed Nitro from ${message.author.tag} in ${ct} | ${time}`);
            }
        ).catch(ex => console.log('                 '));
    }
})
 
  client.login(token_snipe)