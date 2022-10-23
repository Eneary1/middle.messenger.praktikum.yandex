import mainhbs from "bundle-text:./main.hbs"
import converter from "../../utils/converter"
import mainPage from "../main/index.js"
import regPage from "../reg/index.js"
import * as styles from "./styles.module.scss"

//making a main element

let thisPage = converter.hbsToHtml(mainhbs)

thisPage.querySelector("button").onclick = (e) => {
	e.preventDefault();
	mainPage();
}

thisPage.querySelector("#link").onclick = () => {
	regPage();
}

thisPage = converter.modulateClasses(thisPage, styles)

const pageExport = function(){
	document.getElementById("root").textContent = "";
	document.getElementById("root").appendChild(thisPage);
}

export default pageExport;
