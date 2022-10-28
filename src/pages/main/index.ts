import "../../../.d";
import {pickedChatArray, chatBars} from "./index.tmpl";
import mainhbs from "./main.hbs";
import {modulateClasses} from "../../utils/converter";
import userPage from "../user/index";
import {Container} from "../../utils/container";
import * as styles from "./styles.module.scss";

//making a main element

const thisPage = new Container(mainhbs());

//appending chatBars

chatBars.forEach(i => {
	thisPage.getContent().querySelector(".chat-list__list-container")!.appendChild(i);
})

const chatContainer = thisPage.getContent().querySelector(".message-tape");
const elems = thisPage.getContent().getElementsByClassName("chat-list__list-element");

//work with fake apis

let elem: HTMLElement | null = null;

for (let i = 0; i < elems.length; ++i)
{
	const scrollable = pickedChatArray[i].querySelector(".message-tape__chat");
	const checked = styles["checked"]
	elems[i].addEventListener("click", function() {
		if (this.classList.contains(checked)) return;
		chatContainer!.textContent = "";
		chatContainer!.appendChild(pickedChatArray[i])
		if (elem) {
			elem.classList.remove(checked);
		}
		this.classList.add(checked);
		elem = this;
		scrollable!.scrollBy(0, scrollable!.scrollHeight)
	})
}

pickedChatArray.forEach(i => {
	i.querySelector(".grip-container")!.addEventListener("click", function() {
		this.querySelector(`.${styles["add-user"]}`).classList.toggle("none");
	})
	i.querySelector(".attachment-container")!.addEventListener("click", function() {
		this.querySelector(`.${styles["attachment"]}`).classList.toggle("none");
	})
})

thisPage.getContent().querySelector(".profile")?.addEventListener(("click"), () => {
	userPage();
})

thisPage.modulateClasses(styles)

pickedChatArray.forEach(i => {
	i = modulateClasses(i, styles)
})

const pageExport = function(){
	document.getElementById("root")!.textContent = "";
	document.getElementById("root")!.appendChild(thisPage.getContent());
}

export default pageExport;
