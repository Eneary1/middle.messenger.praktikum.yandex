import {pickedChatArray} from "./index.tmpl.js";

import {chatBars} from "./index.tmpl.js";

import styles from "bundle-text:./styles.css"

import mainhbs from "bundle-text:./main.hbs"

import convert from "../../utils/html_converter"

import userPage from "../user/index.js";

const styleElement = document.getElementById("styles")

//making a main element

const main = convert(mainhbs)

//appending chatBars

const container = main.querySelector(".chat-list__list-container");

for (let i of chatBars)
{
	container.appendChild(i);
}

const chatContainer = main.querySelector(".message-tape");

const elems = main.getElementsByClassName("chat-list__list-element");

//work with fake apis

let obj = {
	elem: null
};

for (let i = 0; i < elems.length; ++i)
{
	elems[i].onclick = function() {
		if (this.classList.contains("checked")) return;
		chatContainer.textContent = "";
		chatContainer.appendChild(pickedChatArray[i])
		if (obj.elem !== null) obj.elem.classList.remove("checked");
		this.classList.add("checked");
		obj.elem = this;
		pickedChatArray[i].querySelector(".message-tape__chat").scrollBy(0, pickedChatArray[i].querySelector(".message-tape__chat").scrollHeight)
		console.log("A")
	}
}

for (let i of pickedChatArray)
{
	i.querySelector(".grip-container").onclick = function() {
		this.querySelector(".add-user").classList.toggle("none");
	}
	i.querySelector(".attachment-container").onclick = function() {
		this.querySelector(".attachment").classList.toggle("none");
	}
}

main.querySelector(".profile").onclick = () => {
	userPage();
}

const pageExport = function(){
	
	//adding html and classes to an index.html

	document.getElementById("root").textContent = "";

	document.getElementById("root").append(main);

	styleElement.textContent = styles

}

export default pageExport;

