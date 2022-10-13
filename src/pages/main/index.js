import pickedChatArray from "./index.tmpl.js";

const chats = pickedChatArray;

const chatContainer = document.querySelector(".message-tape");

const elems = document.getElementsByClassName("chat-list__list-element");

let obj = {
	elem: null
};

for (let i = 0; i < elems.length; ++i)
{
	elems[i].onclick = function() {
		if (this.classList.contains("checked")) return;
		chatContainer.textContent = "";
		chatContainer.appendChild(chats[i])
		if (obj.elem !== null) obj.elem.classList.remove("checked");
		this.classList.add("checked");
		obj.elem = this;
		chats[i].querySelector(".message-tape__chat").scrollBy(0, chats[i].querySelector(".message-tape__chat").scrollHeight)
	}
}

for (let i of chats)
{
	i.querySelector(".grip-container").onclick = function() {
		this.querySelector(".add-user").classList.toggle("none");
	}
	i.querySelector(".attachment-container").onclick = function() {
		this.querySelector(".attachment").classList.toggle("none");
	}
}
