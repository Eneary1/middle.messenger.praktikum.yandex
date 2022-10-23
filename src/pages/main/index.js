import {pickedChatArray} from "./index.tmpl.js";
import {chatBars} from "./index.tmpl.js";
import mainhbs from "bundle-text:./main.hbs"
import converter from "../../utils/converter"
import userPage from "../user/index.js";
import * as styles from "./styles.module.scss"

//making a main element

let main = converter.hbsToHtml(mainhbs)

//appending chatBars

chatBars.forEach(i => {
	main.querySelector(".chat-list__list-container").appendChild(i);
})

const chatContainer = main.querySelector(".message-tape");
const elems = main.getElementsByClassName("chat-list__list-element");

//work with fake apis

let obj = {
	elem: null
};

for (let i = 0; i < elems.length; ++i)
{
	const scrollable = pickedChatArray[i].querySelector(".message-tape__chat");
	const checked = styles["checked"]
	elems[i].onclick = function() {
		if (this.classList.contains(checked)) return;
		chatContainer.textContent = "";
		chatContainer.appendChild(pickedChatArray[i])
		if (obj.elem !== null) obj.elem.classList.remove(checked);
		this.classList.add(checked);
		obj.elem = this;
		scrollable.scrollBy(0, scrollable.scrollHeight)
	}
}

pickedChatArray.forEach((i) => {
	i.querySelector(".grip-container").onclick = function() {
		this.querySelector(`.${styles["add-user"]}`).classList.toggle("none");
	}
	i.querySelector(".attachment-container").onclick = function() {
		this.querySelector(`.${styles["attachment"]}`).classList.toggle("none");
	}
})

main.querySelector(".profile").onclick = () => {
	userPage();
}

main = converter.modulateClasses(main, styles)
pickedChatArray.forEach(i => {
	i = converter.modulateClasses(i, styles)
})

const pageExport = function(){
	document.getElementById("root").textContent = "";
	document.getElementById("root").appendChild(main);
}

export default pageExport;

