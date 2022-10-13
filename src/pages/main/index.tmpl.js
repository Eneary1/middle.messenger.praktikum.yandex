//templates

import chatElement from "bundle-text:./chat-bar.tmpl.hbs"

import pickedChat from "bundle-text:./chat-list.tmpl.hbs"

//users' objects

const chatObject = {
	chatObject: []
}

const chat = {
	chat: []
}

mes = []

//fake api

for (let i = 0; i < 35; ++i)
{
	mes.push({
		class: "message-tape__sender",
		content: "URAURAURAURAURAURAURAURAURAURAURAURAURAURAURAURAURAURAURAURAURAURAURAURAURAURAURAURAURAURAURAURAURAURAURAURAURAURAURAURAURAURAURAURAURAURAURAURA"
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

const container = document.querySelector(".chat-list__list-container");

for (let i of Array.from(elHelper.children))
{
	container.appendChild(i);
}

//actual chat list

const compiledPickedChat = Handlebars.compile(pickedChat);

const pickedChatResult = compiledPickedChat(chat)

elHelper = document.createElement("div");

elHelper.innerHTML = pickedChatResult;

const pickedChatArray = Array.from(elHelper.children)

export default pickedChatArray