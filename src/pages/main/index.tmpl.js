import Handlebars from "handlebars"

//templates

import chatElement from "bundle-text:./chat-bar.hbs"

import pickedChat from "bundle-text:./chat-list.hbs"

//users' objects

const chatObject = {
	chatObject: []
}

const chat = {
	chat: []
}

let mes = []

//fake api

for (let i = 0; i < 35; ++i)
{
	mes.push({
		class: "message-tape__sender",
		content: "URAURAURAURAURAURAURAURAURAURAURAURAURAURAURAURAURAURAURAURAURAURAURAURAURAURAURAURAURAURAURAURAURAURAURAURAURAURAURAURAURAURAURAURAURAURAURA"
	},
	{
		class: "message-tape__reciever",
		content: "ura?ura?ura?ura?ura?ura?ura?ura?ura?ura?ura?ura?ura?ura?ura?ura?ura?ura?ura?ura?ura?ura?ura?ura?ura?ura?ura?ura?ura?ura?ura?"
	})
}

for (let i = 0; i < 10; ++i)
{
	chatObject.chatObject.push({
		name: "ivan",
		text: mes[0].content,
		date: Date().match(/..:../)[0],
		incoming: 5
	})

	chat.chat.push({
		i: i,
		message: mes
	})
}

let elHelper;

//add chat bar

const comp = Handlebars.compile(chatElement);

const content = comp(chatObject)

elHelper = document.createElement("div");

elHelper.innerHTML = content;

const chatBars = Array.from(elHelper.children)

//actual chat list

const compiledPickedChat = Handlebars.compile(pickedChat);

const pickedChatResult = compiledPickedChat(chat)

elHelper = document.createElement("div");

elHelper.innerHTML = pickedChatResult;

const pickedChatArray = Array.from(elHelper.children)

export {pickedChatArray, chatBars}