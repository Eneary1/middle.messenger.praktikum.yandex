export default function(text){
	const mainElem = document.createElement("div")
	mainElem.innerHTML = text;
	return mainElem.children[0]
}