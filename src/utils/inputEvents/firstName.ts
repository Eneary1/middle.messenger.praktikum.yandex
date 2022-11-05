function firstNameBlur(e: InputEvent){
	const target = e.target as HTMLInputElement
	if (target.value.match(/^(?=[A-ZА-ЯЁ])(?![\W_][^-].*)$/)) {
		target.classList.remove("invalid");
	} else {
		target.classList.add("invalid");
	}
}

function firstNameFocus(e: InputEvent) {
	const target = e.target as HTMLInputElement
	if (target.classList.contains("invalid")) target.classList.remove("invalid");
  };

  export {firstNameBlur, firstNameFocus}