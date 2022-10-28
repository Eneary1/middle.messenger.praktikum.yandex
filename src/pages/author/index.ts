import "../../../.d"
import mainhbs from "./main.hbs"
import mainPage from "../main/index"
import regPage from "../reg/index"
import {Container} from "../../utils/container";
import * as styles from "./styles.module.scss"

//making a main element

const thisPage = new Container(mainhbs());

thisPage.getContent().querySelector("button")!.addEventListener("click", (e) => {
	e.preventDefault();
	mainPage();
})

thisPage.getContent().querySelector(".link")!.addEventListener("click", () => {
	regPage();
})

thisPage.modulateClasses(styles)

const pageExport = function(){
	document.getElementById("root")!.textContent = "";
	document.getElementById("root")!.appendChild(thisPage.getContent());
}

export default pageExport;
