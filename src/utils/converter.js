const converter = {
	hbsToHtml: (hbs) => {
		const mainElem = document.createElement("div")
		mainElem.innerHTML = hbs;
		return mainElem.firstElementChild
	},
	modulateClasses: (domElements, styles) => {
		const newTree = document.createElement("div")
		newTree.appendChild(domElements);
		const mas = Object.keys(styles);

		let elMas = mas.map(a => `.${a}`)
		let elements = newTree.querySelectorAll(elMas.join(","));
		elements.forEach(element => {
			element.classList.replace(element.classList.values().next().value, styles[element.classList.values().next().value])
		});

		elMas = mas.map(a => `#${a}`)
		elements = newTree.querySelectorAll(elMas.join(","));
		elements.forEach(element => {
			element.id = styles[element.id]
		});
		
		return newTree.firstElementChild;
	}
}

export default converter