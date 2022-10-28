import mainhbs from "./main.hbs"
import {hbsToHtml, modulateClasses} from "../../utils/converter"
import mainPage from "../main/index"
import passwordPage from "../change_password/index"
import dataPage from "../change_data/index"
import * as styles from "./styles.module.scss"

const styleElement = document.getElementById("styles")

//making a main element

let thisPage = hbsToHtml(mainhbs())

// main.querySelector("#link").onclick = () => {
// 	authorPage();
// }

thisPage.querySelector("#exit").onclick = () => {
	mainPage()
}

thisPage.querySelector("#pass").onclick = () => {
	passwordPage()
}

thisPage.querySelector("#data").onclick = () => {
	dataPage()
}

const pageExport = function(){
	document.getElementById("root").textContent = "";
	document.getElementById("root").appendChild(thisPage);
}

export default pageExport;
