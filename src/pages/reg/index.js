import mainhbs from "./main.hbs"
import {hbsToHtml, modulateClasses} from "../../utils/converter"
import mainPage from "../main/index"
import authorPage from "../author/index"
import * as styles from "./styles.module.scss"

//making a main element

let thisPage = hbsToHtml(mainhbs())

thisPage.querySelector("button").onclick = (e) => {
	e.preventDefault();
	mainPage();
}

thisPage.querySelector(".link").onclick = () => {
	authorPage();
}

thisPage = modulateClasses(thisPage, styles)

const pageExport = function(){
	document.getElementById("root").textContent = "";
	document.getElementById("root").appendChild(thisPage);
}

export default pageExport;