function passBlur(e: InputEvent){
	const target = e.target as HTMLInputElement
	if (target.value.match(/^(?=.*\d)(?=.*[А-ЯA-Z]).{8,40}$/)) {
		target.classList.remove("invalid");
	} else {
		target.classList.add("invalid");
	}
}

function passFocus(e: InputEvent) {
	const target = e.target as HTMLInputElement
	if (target.classList.contains("invalid")) target.classList.remove("invalid");
  };

  export {passBlur, passFocus}