import mainhbs from "./main.hbs"
import {hbsToHtml, modulateClasses} from "../../utils/converter"
import userPage from "../user/index"
import * as styles from "./styles.module.scss"

//making a main element

let thisPage = hbsToHtml(mainhbs())

thisPage.querySelector("button").onclick = (e) => {
	e.preventDefault();
	userPage();
}

const pageExport = function(){
	document.getElementById("root").textContent = "";
	document.getElementById("root").appendChild(thisPage);
}

export default pageExport;