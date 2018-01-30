/////////////////////////////////////////
const Discord = require('discord.js'); //
const client = new Discord.Client();   //
/////////////////////////////////////////

/////////// Voice Channel IDs ////////////
const sdtd="381528497518280715";	//
const afk="282889782726754304"		//
const bf1="323542986459971594";		//
const gmod="381729382894403594";	//
const gtav="338009048064720896";	//
const mainVC="283524890944995328";	//
const other="282956805829689355";	//
const r6s="314111621498929153";		//
const sanctum="384816512923336734";	//
const tera="387927871160844289";	//
const wt="284250139143438338";		//
//////////////////////////////////////////

////////////////// Bot Settings //////////////////
const botName="Mover"; //Bot Name		//
const statusCmd="!status"; //Status command	//
const toggleCmd="!toggle"; //Toggle command	//
//////////////////////////////////////////////////

let userSettings=[]; //Array to store objects of players and their settings.


client.on('ready', () => { //If the bot is ready.
	client.user.setUsername(botName); //Change the bot name to predefined value.
	console.log(botName+" Reporting for duty!"); //Just some log.
});

client.on('message', message => { //If message event is captured
	let username=message.author.username; //get the username of the message sender
	if (message.content === toggleCmd) { //if the user typed the toggle command
		if(modifyUserSettings(username)){ //Call the modify function (returns true/false)
			message.author.send('You have toggled my ability to move you to ON. (Hint: you can always check your status by typing '+statusCmd+'.)'); //Send a private message to the player
		}else{
			message.author.send('You have toggled my ability to move you to OFF. (Hint: you can always check your status by typing '+statusCmd+'.)');
		}
	}else if (message.content == statusCmd){ //If user typed the status command
		if(allowedToMove(username)){ //Call the allowed to move function (returns true/false)
			message.author.send('I\'m allowed to move you.'); //Send a private message to the palyer
		}else{
			message.author.send('I\'m not allowed to move you!');
		}
	}
});

function modifyUserSettings(username){ // The modify function
	let allowedStatus; //To store the status
	
	if(userSettings.length==0){ //if the userSettings array is empty
		let user={name:username, allowed:false}; //make an object with username and allowed status
		userSettings.push(user); //add it to array
		return false; //Return false to tell the user, that the bot is no longer allowed to move the player
	}else{ //If the userSettings array is not empty
		for (let i in userSettings) { //Loop through the array
			if (userSettings[i].name == username){ //Check for the username
				if(userSettings[i].allowed==true){ //if the bot is allowed to move the player
					allowedStatus=false; //toggle it (Bot is no longer allowed to move the player)
				}else{ //If the bot is not allowed to move the player
					allowedStatus=true; //toggle it (Bot is now allowed to move the player)
				}
				userSettings[i].allowed=allowedStatus; //Update the user settings in the array
				return allowedStatus; //Return if the bot is allowed to move the player or not
				break; //Stop this loop, we found the user and updated the settings!
			}
		}
	}
}

function allowedToMove(username){ //Check if bot is allowed to move the player (AKA the status function)
	if(userSettings.length==0){ //If the userSettings array is empty
		let user={name:username, allowed:true}; //make and object with username and allowed status
		userSettings.push(user); //add it to the array
		return true; //Return that the bot is allowed to move the player
	}else{ //userSettings array is not empty
		for(let i in userSettings) { //loop through the array
			if(userSettings[i].name == username){ //check for username
				return userSettings[i].allowed; ////Return if the bot is allowed to move the player or not
				break; //Stop this loop, we found the user and returned the status!
			}
		}
	}
}

client.on('presenceUpdate', (oldMember, newMember) => { //if the presenceUpdate event happened
	if(newMember.presence.game!==null){//If user is playing a game 
		if(newMember.voiceChannelID==undefined){ //Not in a voice channel
		}else{ //In a voice channel
			if(allowedToMove(newMember.user.username)){ //If the bot is allowed to move the player
				if(newMember.voiceChannelID==afk){ //If the user is in the AFK channel
					console.log(newMember.user.username+" is AFK; not going to bother."); //log it. Because why not
				}else{//User is not in the AFK channel
					if(newMember.presence.game.name=="7 Days To Die"){ //if user is playing "7 Days To Die"
						console.log(newMember.user.username+" is now playing "+newMember.presence.game.name+" and has been moved from "+client.channels.get(newMember.voiceChannelID).name+" to "+client.channels.get(sdtd).name); //log
						newMember.setVoiceChannel(sdtd); //Move user to "7 Days To Die" voice channel
					}else if(newMember.presence.game.name=="Battlefield 1"){
						console.log(newMember.user.username+" is now playing "+newMember.presence.game.name+" and has been moved from "+client.channels.get(newMember.voiceChannelID).name+" to "+client.channels.get(bf1).name);
						newMember.setVoiceChannel(bf1);
					}else if(newMember.presence.game.name=="Garry's Mod"){
						console.log(newMember.user.username+" is now playing "+newMember.presence.game.name+" and has been moved from "+client.channels.get(newMember.voiceChannelID).name+" to "+client.channels.get(gmod).name);
						newMember.setVoiceChannel(gmod);
					}else if(newMember.presence.game.name=="Grand Theft Auto V"){
						console.log(newMember.user.username+" is now playing "+newMember.presence.game.name+" and has been moved from "+client.channels.get(newMember.voiceChannelID).name+" to "+client.channels.get(gtav).name);
						newMember.setVoiceChannel(gtav);
					}else if(newMember.presence.game.name=="Tom Clancy's Rainbow Six Siege"){
						console.log(newMember.user.username+" is now playing "+newMember.presence.game.name+" and has been moved from "+client.channels.get(newMember.voiceChannelID).name+" to "+client.channels.get(r6s).name);
						newMember.setVoiceChannel(r6s);
					}else if(newMember.presence.game.name=="Sanctum 2"){
						console.log(newMember.user.username+" is now playing "+newMember.presence.game.name+" and has been moved from "+client.channels.get(newMember.voiceChannelID).name+" to "+client.channels.get(sanctum).name);
						newMember.setVoiceChannel(sanctum);
					}else if(newMember.presence.game.name=="TERA"){
						console.log(newMember.user.username+" is now playing "+newMember.presence.game.name+" and has been moved from "+client.channels.get(newMember.voiceChannelID).name+" to "+client.channels.get(tera).name);
						newMember.setVoiceChannel(tera);
					}else if(newMember.presence.game.name=="War Thunder"){
						console.log(newMember.user.username+" is now playing "+newMember.presence.game.name+" and has been moved from "+client.channels.get(newMember.voiceChannelID).name+" to "+client.channels.get(wt).name);
						newMember.setVoiceChannel(wt);
					}else{ //If channel doesn't exist for the game move to other.
						console.log(newMember.user.username+" is now playing "+newMember.presence.game.name+" and has been moved from "+client.channels.get(newMember.voiceChannelID).name+" to "+client.channels.get(other).name);
						newMember.setVoiceChannel(other);
					}
				}
			}
		}
	}else{ //Stopped playing a game
		if(newMember.voiceChannelID==undefined){//Not in a voice channel
		}else{//is in a voice channel so move back to main
			if(newMember.voiceChannelID==afk){//If the user is in the AFK channel
			}else{
				if(allowedToMove(newMember.user.username)){//If the bot is allowed to move the player
					newMember.setVoiceChannel(mainVC); //Move user to main voice channel
					console.log(newMember.user.username+" is not in a game anymore and was moved to "+client.channels.get(mainVC).name); //log.
				}
			}
		}
	}
});
client.login('XYZ'); //Secret bot token.


/*

newMember.user.id - User ID
newMember.user.username - Username
newMember.setVoiceChannel(mainVC) - set voice channel
newMember.presence.game.name - Game name
newMember.voiceChannelID - get voicechannel ID




TODO: If there's no room with a game name, make it.



*/
