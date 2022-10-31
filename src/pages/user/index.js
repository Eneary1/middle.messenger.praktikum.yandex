import mainhbs from "bundle-text:./main.hbs"

import styles from "bundle-text:./styles.css"

import convert from "../../utils/html_converter"

import mainPage from "../main/index.js"

import passwordPage from "../change_password/index.js"

import dataPage from "../change_data/index.js"

const styleElement = document.getElementById("styles")

//making a main element

const main = convert(mainhbs)

// main.querySelector("#link").onclick = () => {
// 	authorPage();
// }

main.querySelector("#exit").onclick = () => {
	mainPage()
}

main.querySelector("#pass").onclick = () => {
	passwordPage()
}

main.querySelector("#data").onclick = () => {
	dataPage()
}

const pageExport = function(){
	styleElement.textContent = styles
	document.getElementById("root").textContent = "";
	document.getElementById("root").append(main);
}

export default pageExport;