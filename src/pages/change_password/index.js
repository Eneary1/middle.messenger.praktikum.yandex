import mainhbs from "bundle-text:./main.hbs"

import styles from "bundle-text:./styles.css"

import convert from "../../utils/converter"

import userPage from "../user/index.js"

const styleElement = document.getElementById("styles")

//making a main element

const main = convert.hbsToHtml(mainhbs)

main.querySelector("button").onclick = (e) => {
	e.preventDefault();
	userPage();
}

const pageExport = function(){
	styleElement.textContent = styles
	document.getElementById("root").textContent = "";
	document.getElementById("root").append(main);
}

export default pageExport;