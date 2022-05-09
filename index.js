require("dotenv").config();
const { Client, Intents , MessageEmbed , MessageActionRow , MessageButton} = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES , Intents.FLAGS.GUILD_MEMBERS] });
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const mongoose = require("mongoose");
const Accounts = require("./models/Accounts.js")
let owner = ''//ايدي الي هيتحول لة
let probotid = ''//ايدي بروبوت
let owness = ''//ايدي الاونر الي هيضيف الحسابات
client.on("ready" , () => {
client.user.setPresence({status: 'idle',activities: [{name:"ThailandCodes"}]});
mongoose.connect(process.env.mongoose).then(() => {//ضروري تحط رابط داتا بيس mongoose
console.log("Connected to Database")//رابط شرح ازاي تجيب داتا بيس: https://www.youtube.com/watch?v=FuDX2Fk8FD8
}).catch(err => {
console.log(err)
})
const commands = [{
name : "ping",
description : `Show the ping of the ${client.user.tag}`
},{
name: "add", 
description: `Add accounts in the ${client.user.tag}`,
options:[{name: "type",description:"Accounts types",type:3,required:true,
choices:[{name: "Netflix",value: "netflix"},{name: "Minecraft",value: "minecraft"},
{name: "Steam",value: "steam"},{name: "Spotify",value: "spotify"}]}]
},{
name: "buy", 
description: `Buy accounts from the ${client.user.tag}`,
options:[{name: "type",description:"Accounts types",type:3,required:true,
choices:[{name: "Netflix",value: "netflix"},{name: "Minecraft",value: "minecraft"},
{name: "Steam",value: "steam"},{name: "Spotify",value: "spotify"},{name: "Google Play",value: "google"}]}]
},{
name:'stock',
description:`Show the account's stocks`
},{
name:"help",
description:"Show all commands of the bot"
}]
const rest = new REST({ version: '9' }).setToken(process.env.token);
(async () => {
try {
await rest.put(
Routes.applicationCommands(client.user.id),
{ body: commands },
);

console.log("Done Run ApplicationCommands");
} catch (error) {
console.error(error);
}
})();
})
client.on('interactionCreate', async interaction => {
if (!interaction.isCommand()) return;
await interaction.deferReply()
if(interaction.commandName == "ping"){
await interaction.editReply({content: "\`"+client.ws.ping+"\`",ephemeral:false});
} else 
if(interaction.commandName == "add"){
if(!owness.includes(interaction.user.id))return interaction.editReply({content: 'Hi..'});
if(interaction.user.bot)return;
let type = interaction.options.getString('type')
if(type == "netflix"){
let filter = u => u.author.id == interaction.user.id
let q1 = new MessageEmbed().setDescription(`
**يُرجى إرسال ايميل و باسورد الحسابات بالشكل ادناه:
email
password_here
price**
`).setColor("#2f3136")
const row = new MessageActionRow()
.addComponents(
new MessageButton()
.setCustomId('yes')
.setLabel('Ok')
.setEmoji('👍')
.setStyle('SUCCESS'),
);
let q2 = new MessageEmbed().setTitle(`
لقد انتهت عملية اضافة ثلاث حسابات اذا كنت تريد اضافة المزيد افعل الامر مجددأ
`).setColor("#2f3136")
var msg1;
await interaction.editReply({embeds:[q1],content:"يمكنك اضافة 3 حسابات في رسايل مختلفة ..\n**لا يسمح بـ وضع نفس الايميلات ..**"}).then(async int1 => {
interaction.channel.awaitMessages({filter,max:1,time: 100000}).then(async collected => {
collected.first().delete();
msg1 = collected.first().content;
let messageContentCheck = collected.first().content.split("\n")
let str = [];
let finalArray = [];
let Data;
for(let i = 0; i < messageContentCheck.length; i++){
if(messageContentCheck[i].length >= 1){
finalArray.push(messageContentCheck[i])
str.push(finalArray[0])
str.push(finalArray[1])
str.push(finalArray[2])
Data = await Accounts.findOne({email: finalArray[0] })
}
}
var msg2

if(Data){
return interaction.editReply({ephemeral:false,content:"هذا الايميل موجود بالفعل ..",embeds:[]})
}
if(!Data){
await new Accounts({
email: finalArray[0],
password: finalArray[1],
price: finalArray[2],
type: type,

}).save();
}
interaction.editReply({content:`يمكنك اضافة حسابين اثنين فقط`})
interaction.channel.awaitMessages({filter,max:1,time: 100000}).then(async collected => {
collected.first().delete();
msg2 = collected.first().content;
var msg3;
let messageContentCheck = collected.first().content.split("\n")
let str = [];
let finalArray = [];
let Data;
for(let i = 0; i < messageContentCheck.length; i++){
if(messageContentCheck[i].length >= 1){
finalArray.push(messageContentCheck[i])
str.push(finalArray[0])
str.push(finalArray[1])
str.push(finalArray[2])
Data = await Accounts.findOne({email: finalArray[0] })
}
}
var msg2
if(Data){
return interaction.editReply({ephemeral:false,content:"هذا الايميل موجود بالفعل ..",embeds:[]})
}
if(!Data){
await new Accounts({
email: finalArray[0],
password: finalArray[1],
price: finalArray[2],
type: type,

}).save();
}
interaction.editReply({content:`يمكنك اضافة حساب واحد الان فقط`})
interaction.channel.awaitMessages({filter,max:1,time: 100000}).then(async collected => {
collected.first().delete();
msg3 = collected.first().content;

let messageContentCheck = collected.first().content.split("\n")
let str = [];
let finalArray = [];
let Data;
for(let i = 0; i < messageContentCheck.length; i++){
if(messageContentCheck[i].length >= 1){
finalArray.push(messageContentCheck[i])
str.push(finalArray[0])
str.push(finalArray[1])
str.push(finalArray[2])
Data = await Accounts.findOne({email: finalArray[0] })
}
}
var msg2

if(Data){
return interaction.editReply({ephemeral:false,content:"هذا الايميل موجود بالفعل ..",embeds:[]})
}
if(!Data){
await new Accounts({
email: finalArray[0],
password: finalArray[1],
price: finalArray[2],
type: type,

}).save();
}

await interaction.editReply({embeds:[q2],components:[row],content:'_ _'}).then(async () =>{
const collector = interaction.channel.createMessageComponentCollector({ filter, max:1,time: 15000});
collector.on('collect', async i => {
if (i.customId === 'yes') {
await interaction.editReply({content: "> Thx you for sub on\nhttps://youtube.com/ThailandCodes",components:[],embeds:[]}).then(d => setTimeout(() => {
d.delete()
},3000))
}
})
})
})
})
})
})
}
if(type == "minecraft"){
let filter = u => u.author.id == interaction.user.id
let q1 = new MessageEmbed().setDescription(`
**يُرجى إرسال ايميل و باسورد الحسابات بالشكل ادناه:
Email
Password_here
Price**`).setColor("#2f3136")
const row = new MessageActionRow()
.addComponents(
new MessageButton()
.setCustomId('yes')
.setLabel('Ok')
.setEmoji('👍')
.setStyle('SUCCESS'),
);
let q2 = new MessageEmbed().setTitle(`
لقد انتهت عملية اضافة ثلاث حسابات اذا كنت تريد اضافة المزيد افعل الامر مجددأ
`).setColor("#2f3136")
var msg1;
await interaction.editReply({embeds:[q1],content:"يمكنك اضافة 3 حسابات في رسايل مختلفة ..\n**لا يسمح بـ وضع نفس الايميلات ..**"}).then(async int1 => {
interaction.channel.awaitMessages({filter,max:1,time: 100000}).then(async collected => {
collected.first().delete();
msg1 = collected.first().content;
let messageContentCheck = collected.first().content.split("\n")
let str = [];
let finalArray = [];
let Data;
for(let i = 0; i < messageContentCheck.length; i++){
if(messageContentCheck[i].length >= 1){
finalArray.push(messageContentCheck[i])
str.push(finalArray[0])
str.push(finalArray[1])
str.push(finalArray[2])
Data = await Accounts.findOne({email: finalArray[0] })
}
}
var msg2
if(Data){
return interaction.editReply({ephemeral:false,content:"هذا الايميل موجود بالفعل ..",embeds:[]})
}
if(!Data){
await new Accounts({
email: finalArray[0],
password: finalArray[1],
price: finalArray[2],
type: type,
}).save();
}
interaction.editReply({content:`يمكنك اضافة حسابين اثنين فقط`})
interaction.channel.awaitMessages({filter,max:1,time: 100000}).then(async collected => {
collected.first().delete();
msg2 = collected.first().content;
var msg3;
let messageContentCheck = collected.first().content.split("\n")
let str = [];
let finalArray = [];
let Data;
for(let i = 0; i < messageContentCheck.length; i++){
if(messageContentCheck[i].length >= 1){
finalArray.push(messageContentCheck[i])
str.push(finalArray[0])
str.push(finalArray[1])
str.push(finalArray[2])
Data = await Accounts.findOne({email: finalArray[0] })
}
}
var msg2
if(Data){
return interaction.editReply({ephemeral:false,content:"هذا الايميل موجود بالفعل ..",embeds:[]})
}
if(!Data){
await new Accounts({
email: finalArray[0],
password: finalArray[1],
price: finalArray[2],
type: type,

}).save();
}
interaction.editReply({content:`يمكنك اضافة حساب واحد الان فقط`})
interaction.channel.awaitMessages({filter,max:1,time: 100000}).then(async collected => {
collected.first().delete();
msg3 = collected.first().content;
let messageContentCheck = collected.first().content.split("\n")
let str = [];
let finalArray = [];
let Data;
for(let i = 0; i < messageContentCheck.length; i++){
if(messageContentCheck[i].length >= 1){
finalArray.push(messageContentCheck[i])
str.push(finalArray[0])
str.push(finalArray[1])
str.push(finalArray[2])
Data = await Accounts.findOne({email: finalArray[0] })
}
}
var msg2
if(Data){
return interaction.editReply({ephemeral:false,content:"هذا الايميل موجود بالفعل ..",embeds:[]})
}
if(!Data){
await new Accounts({
email: finalArray[0],
password: finalArray[1],
price: finalArray[2],
type: type,
}).save();
}
await interaction.editReply({embeds:[q2],components:[row],content:'_ _'}).then(async () =>{
const collector = interaction.channel.createMessageComponentCollector({ filter, max:2,time: 15000});
collector.on('collect', async i => {
if (i.customId === 'yes') {
await interaction.editReply({content: "Thx You for sub on\nhttps://youtube.com/ThailandCodes",components:[],embeds:[]}).then(d => setTimeout(() => {
d.delete()
},3000))
}
})
})
})
})
})
})
}
if(type == "steam"){
let filter = u => u.author.id == interaction.user.id
let q1 = new MessageEmbed().setDescription(`
**يُرجى إرسال ايميل و باسورد الحسابات بالشكل ادناه:
email
password_here
price**`).setColor("#2f3136")
const row = new MessageActionRow()
.addComponents(
new MessageButton()
.setCustomId('yes')
.setLabel('Ok')
.setEmoji('👍')
.setStyle('SUCCESS'),
);
let q2 = new MessageEmbed().setTitle(`
لقد انتهت عملية اضافة ثلاث حسابات اذا كنت تريد اضافة المزيد افعل الامر مجددأ
`).setColor("#2f3136")
var msg1;
await interaction.editReply({embeds:[q1],content:"يمكنك اضافة 3 حسابات في رسايل مختلفة ..\n**لا يسمح بـ وضع نفس الايميلات ..**"}).then(async int1 => {
interaction.channel.awaitMessages({filter,max:1,time: 100000}).then(async collected => {
collected.first().delete();
msg1 = collected.first().content;
let messageContentCheck = collected.first().content.split("\n")
let str = [];
let finalArray = [];
let Data;
for(let i = 0; i < messageContentCheck.length; i++){
if(messageContentCheck[i].length >= 1){
finalArray.push(messageContentCheck[i])
str.push(finalArray[0])
str.push(finalArray[1])
str.push(finalArray[2])
Data = await Accounts.findOne({email: finalArray[0] })
}
}
var msg2

if(Data){
return interaction.editReply({ephemeral:false,content:"هذا الايميل موجود بالفعل ..",embeds:[]})
}
if(!Data){
await new Accounts({
email: finalArray[0],
password: finalArray[1],
price: finalArray[2],
type: type,

}).save();
}
interaction.editReply({content:`يمكنك اضافة حسابين اثنين فقط`})
interaction.channel.awaitMessages({filter,max:1,time: 100000}).then(async collected => {
collected.first().delete();
msg2 = collected.first().content;
var msg3;
let messageContentCheck = collected.first().content.split("\n")
let str = [];
let finalArray = [];
let Data;
for(let i = 0; i < messageContentCheck.length; i++){
if(messageContentCheck[i].length >= 1){
finalArray.push(messageContentCheck[i])
str.push(finalArray[0])
str.push(finalArray[1])
str.push(finalArray[2])
Data = await Accounts.findOne({email: finalArray[0] })
}
}
var msg2

if(Data){
return interaction.editReply({ephemeral:false,content:"هذا الايميل موجود بالفعل ..",embeds:[]})
}
if(!Data){
await new Accounts({
email: finalArray[0],
password: finalArray[1],
price: finalArray[2],
type: type,

}).save();
}
interaction.editReply({content:`يمكنك اضافة حساب واحد الان فقط`})
interaction.channel.awaitMessages({filter,max:1,time: 100000}).then(async collected => {
collected.first().delete();
msg3 = collected.first().content;

let messageContentCheck = collected.first().content.split("\n")
let str = [];
let finalArray = [];
let Data;
for(let i = 0; i < messageContentCheck.length; i++){
if(messageContentCheck[i].length >= 1){
finalArray.push(messageContentCheck[i])
str.push(finalArray[0])
str.push(finalArray[1])
str.push(finalArray[2])
Data = await Accounts.findOne({email: finalArray[0] })
}
}
var msg2

if(Data){
return interaction.editReply({ephemeral:false,content:"هذا الايميل موجود بالفعل ..",embeds:[]})
}
if(!Data){
await new Accounts({
email: finalArray[0],
password: finalArray[1],
price: finalArray[2],
type: type,

}).save();
}

await interaction.editReply({embeds:[q2],components:[row],content:'_ _'}).then(async () =>{
const collector = interaction.channel.createMessageComponentCollector({ filter, max:2,time: 15000});
collector.on('collect', async i => {
if (i.customId === 'yes') {
await interaction.editReply({content: "Thx You for sub on\nhttps://youtube.com/ThailandCodes",components:[],embeds:[]}).then(d => setTimeout(() => {
d.delete()
},3000))
}
})
})
})
})
})
})
}

if(type == "spotify"){
let filter = u => u.author.id == interaction.user.id
let q1 = new MessageEmbed().setDescription(`
**يُرجى إرسال ايميل و باسورد الحسابات بالشكل ادناه:
email
password_here
price**`).setColor("#2f3136")
const row = new MessageActionRow()
.addComponents(
new MessageButton()
.setCustomId('yes')
.setLabel('Ok')
.setEmoji('👍')
.setStyle('SUCCESS'),
);
let q2 = new MessageEmbed().setTitle(`
لقد انتهت عملية اضافة ثلاث حسابات اذا كنت تريد اضافة المزيد افعل الامر مجددأ
`).setColor("#2f3136")
var msg1;
await interaction.editReply({embeds:[q1],content:"يمكنك اضافة 3 حسابات في رسايل مختلفة ..\n**لا يسمح بـ وضع نفس الايميلات ..**"}).then(async int1 => {
interaction.channel.awaitMessages({filter,max:1,time: 100000}).then(async collected => {
collected.first().delete();
msg1 = collected.first().content;
let messageContentCheck = collected.first().content.split("\n")
let str = [];
let finalArray = [];
let Data;
for(let i = 0; i < messageContentCheck.length; i++){
if(messageContentCheck[i].length >= 1){
finalArray.push(messageContentCheck[i])
str.push(finalArray[0])
str.push(finalArray[1])
str.push(finalArray[2])
Data = await Accounts.findOne({email: finalArray[0] })
}
}
var msg2

if(Data){
return interaction.editReply({ephemeral:false,content:"هذا الايميل موجود بالفعل ..",embeds:[]})
}
if(!Data){
await new Accounts({
email: finalArray[0],
password: finalArray[1],
price: finalArray[2],
type: type,

}).save();
}
interaction.editReply({content:`يمكنك اضافة حسابين اثنين فقط`})
interaction.channel.awaitMessages({filter,max:1,time: 100000}).then(async collected => {
collected.first().delete();
msg2 = collected.first().content;
var msg3;
let messageContentCheck = collected.first().content.split("\n")
let str = [];
let finalArray = [];
let Data;
for(let i = 0; i < messageContentCheck.length; i++){
if(messageContentCheck[i].length >= 1){
finalArray.push(messageContentCheck[i])
str.push(finalArray[0])
str.push(finalArray[1])
str.push(finalArray[2])
Data = await Accounts.findOne({email: finalArray[0] })
}
}
var msg2
if(Data){
return interaction.editReply({ephemeral:false,content:"هذا الايميل موجود بالفعل ..",embeds:[]})
}
if(!Data){
await new Accounts({
email: finalArray[0],
password: finalArray[1],
price: finalArray[2],
type: type,
}).save();
}
interaction.editReply({content:`يمكنك اضافة حساب واحد الان فقط`})
interaction.channel.awaitMessages({filter,max:1,time: 100000}).then(async collected => {
collected.first().delete();
msg3 = collected.first().content;
let messageContentCheck = collected.first().content.split("\n")
let str = [];
let finalArray = [];
let Data;
for(let i = 0; i < messageContentCheck.length; i++){
if(messageContentCheck[i].length >= 1){
finalArray.push(messageContentCheck[i])
str.push(finalArray[0])
str.push(finalArray[1])
str.push(finalArray[2])
Data = await Accounts.findOne({email: finalArray[0] })
}
}
var msg2
if(Data){
return interaction.editReply({ephemeral:false,content:"هذا الايميل موجود بالفعل ..",embeds:[]})
}
if(!Data){
await new Accounts({
email: finalArray[0],
password: finalArray[1],
price: finalArray[2],
type: type,
}).save();
}
await interaction.editReply({embeds:[q2],components:[row],content:'_ _'}).then(async () =>{
const collector = interaction.channel.createMessageComponentCollector({ filter, max:2,time: 15000});
collector.on('collect', async i => {
if (i.customId === 'yes') {
await interaction.editReply({content: "Thx You for sub on\nhttps://youtube.com/ThailandCodes",components:[],embeds:[]}).then(d => setTimeout(() => {
d.delete()
},3000))
}
})
})
})
})
})
})
}
} else 
if(interaction.commandName == "buy"){
let type = interaction.options.getString('type')
if(type == 'netflix'){
const tax = require("probot-tax")
const account1 = await Accounts.find({type: type})
if(account1.length <= 0)return interaction.editReply({content: "لا يوجد حسابات لهذا النوع"})
const acc = account1[Math.floor(Math.random() * account1.length)]
const resulting = tax.taxs(acc.price)
let embedme = new MessageEmbed().setDescription(
`للحصول على الحساب برجاء تحويل : ${acc.price} ، الى : <@${owner}> عن طريق الامر التالي :
\`\`\`#credit <@${owner}> ${resulting}\`\`\``
).setColor("#2f3136").setThumbnail(interaction.user.avatarURL({dynamic:true})).setTitle('عملية التحويل').setTimestamp().setURL("https://youtube.com/c/ThailandCodes").setFooter({text: 'تايلاند اون توب والباقي فوتوشوب'})
const filter = response =>
response.content.startsWith(
`**:moneybag: | ${interaction.user.username}, has transferred `
) && response.content.includes(`${owner}`) && response.author.id === probotid && response.content.includes(Number(acc.price));
await interaction.editReply({embeds:[embedme]})
interaction.channel.awaitMessages({filter,max:1,time: 100000}).then(async collected => {
await interaction.editReply({content: 'تم ارسال جميع معلومات الحساب في الخاص ..',embeds:[]})
await interaction.user.send({embeds:[new MessageEmbed().addField(`Email:`,`${acc.email}`,true).addField(`Password`,`${acc.password}`,true).setTimestamp().setThumbnail(interaction.guild.iconURL({dynamic:true})).setColor("#2f3136").setFooter({text: `تايلاند اون توب والباقي فوتوشوب `}).setTitle("Netfilx Account's").setURL("https://netflix.com")]})
await Accounts.deleteOne({email: acc.email})
})
}

if(type == 'minecraft'){
const tax = require("probot-tax")
const account1 = await Accounts.find({type: type})
if(account1.length <= 0)return interaction.editReply({content: "لا يوجد حسابات لهذا النوع"})
const acc = account1[Math.floor(Math.random() * account1.length)]
const resulting = tax.taxs(acc.price)
let embedme = new MessageEmbed().setDescription(
`للحصول على الحساب برجاء تحويل : ${acc.price} ، الى : <@${owner}> عن طريق الامر التالي :
\`\`\`#credit <@${owner}> ${resulting}\`\`\``
).setColor("#2f3136").setThumbnail(interaction.user.avatarURL({dynamic:true})).setTitle('عملية التحويل').setTimestamp().setURL("https://youtube.com/c/ThailandCodes").setFooter({text: 'تايلاند اون توب والباقي فوتوشوب'})
const filter = response =>
response.content.startsWith(
`**:moneybag: | ${interaction.user.username}, has transferred `
) && response.content.includes(`${owner}`) && response.author.id === probotid && response.content.includes(Number(acc.price));
await interaction.editReply({embeds:[embedme]})
interaction.channel.awaitMessages({filter,max:1,time: 100000}).then(async collected => {
await interaction.editReply({content: 'تم ارسال جميع معلومات الحساب في الخاص ..',embeds:[]})
await interaction.user.send({embeds:[new MessageEmbed().addField(`Email:`,`${acc.email}`,true).addField(`Password`,`${acc.password}`,true).setTimestamp().setThumbnail(interaction.guild.iconURL({dynamic:true})).setColor("#2f3136").setFooter({text: `تايلاند اون توب والباقي فوتوشوب `}).setTitle("Minecraft Account's").setURL("https://minecraft.net")]})
await Accounts.deleteOne({email: acc.email})
})
}

if(type == 'steam'){
const tax = require("probot-tax")
const account1 = await Accounts.find({type: type})
if(account1.length <= 0)return interaction.editReply({content: "لا يوجد حسابات لهذا النوع"})
const acc = account1[Math.floor(Math.random() * account1.length)]
const resulting = tax.taxs(acc.price)
let embedme = new MessageEmbed().setDescription(
`للحصول على الحساب برجاء تحويل : ${acc.price} ، الى : <@${owner}> عن طريق الامر التالي :
\`\`\`#credit <@${owner}> ${resulting}\`\`\``
).setColor("#2f3136").setThumbnail(interaction.user.avatarURL({dynamic:true})).setTitle('عملية التحويل').setTimestamp().setURL("https://youtube.com/c/ThailandCodes").setFooter({text: 'تايلاند اون توب والباقي فوتوشوب'})
const filter = response =>
response.content.startsWith(
`**:moneybag: | ${interaction.user.username}, has transferred `
) && response.content.includes(`${owner}`) && response.author.id === probotid && response.content.includes(Number(acc.price));
await interaction.editReply({embeds:[embedme]})
interaction.channel.awaitMessages({filter,max:1,time: 100000}).then(async collected => {
await interaction.editReply({content: 'تم ارسال جميع معلومات الحساب في الخاص ..',embeds:[]})
await interaction.user.send({embeds:[new MessageEmbed().addField(`Email:`,`${acc.email}`,true).addField(`Password`,`${acc.password}`,true).setTimestamp().setThumbnail(interaction.guild.iconURL({dynamic:true})).setColor("#2f3136").setFooter({text: `تايلاند اون توب والباقي فوتوشوب `}).setTitle("Steam Account's").setURL("https://store.steampowered.com")]})
await Accounts.deleteOne({email: acc.email})
})
}
if(type == 'spotify'){
const tax = require("probot-tax")
const account1 = await Accounts.find({type: type})
if(account1.length <= 0)return interaction.editReply({content: "لا يوجد حسابات لهذا النوع"})
const acc = account1[Math.floor(Math.random() * account1.length)]
const resulting = tax.taxs(acc.price)
let embedme = new MessageEmbed().setDescription(
`للحصول على الحساب برجاء تحويل : ${acc.price} ، الى : <@${owner}> عن طريق الامر التالي :
\`\`\`#credit <@${owner}> ${resulting}\`\`\``
).setColor("#2f3136").setThumbnail(interaction.user.avatarURL({dynamic:true})).setTitle('عملية التحويل').setTimestamp().setURL("https://youtube.com/c/ThailandCodes").setFooter({text: ':copyright: ThaialndCodes & OnlyMahmoud'})
const filter = response =>
response.content.startsWith(
`**:moneybag: | ${interaction.user.username}, has transferred `) && response.content.includes(`${owner}`) && response.author.id === probotid && response.content.includes(Number(acc.price));
await interaction.editReply({embeds:[embedme]})
interaction.channel.awaitMessages({filter,max:1,time: 100000}).then(async collected => {
await interaction.editReply({content: 'تم ارسال جميع معلومات الحساب في الخاص ..',embeds:[]})
await interaction.user.send({embeds:[new MessageEmbed().addField(`Email:`,`${acc.email}`,true).addField(`Password`,`${acc.password}`,false).setTimestamp().setThumbnail(interaction.user.avatarURL({dynamic:true})).setColor("#2f3136").setFooter({text: `:copyright: ThaialndCodes & OnlyMahmoud`}).setTitle("Spotify Account's").setURL("https://spotify.com")]})
await Accounts.deleteOne({email: acc.email})
})
}
} else 
if(interaction.commandName == "stock"){
let net = (await Accounts.find({type: 'netflix'})).length;
let min = (await Accounts.find({type: 'minecraft'})).length;
let ste = (await Accounts.find({type: 'steam'})).length;
let spo = (await Accounts.find({type: 'spotify'})).length;
let embed = new MessageEmbed()
.addField(`Netflix Stock's:`,`${net} Stock`,true)
.addField(`Minecraft Stock's:`,`${min} Stock`,true)
.addField(`Steam Stock's:`,`${ste} Stock`,true)
.addField(`Spotify Stock's:`,`${spo} Stock`,true)
.setColor("#2f3136")
.setThumbnail(interaction.user.avatarURL({dynamic:true}))
.setTitle(`Stocks Shop's`).setURL("https://thailandcodes.top")
.setFooter({text: interaction.guild.name,iconURL: interaction.guild.iconURL({dynamic:true})})
.setTimestamp()
await interaction.editReply({embeds:[embed]})
} else 
if(interaction.commandName == "help"){
let embed = new MessageEmbed()
.addField(`/add`,`**\`لاضافة حسابات في البوت\`**`,true)
.addField(`/buy`,`**\`لشراء حسابات من البوت\`**`,true)
.addField(`/stock`,`**\`لرائية الحسابات المتوفره في البوت\`**`,true)
.addField(`/ping`,`**\`رائية بنج البوت\`**`,false)
.setColor("#2f3136")
.setTitle(`Help Command`).setURL("https://thailandcodes.top")
.setThumbnail(interaction.user.avatarURL({dynamic:true}))
.setFooter({text: interaction.guild.name,iconURL: interaction.guild.iconURL({dynamic:true})})
.setTimestamp()
await interaction.editReply({embeds:[embed]})
}
})



client.login(process.env.token)
