function loginBlur(e: InputEvent) {
	const target = e.target as HTMLInputElement
	if (target.value.match(/^(?=.*\D)(?!.*[\W_]).{3,20}$/)) {
		target.classList.remove("invalid");
	} else {
		target.classList.add("invalid");
	}
}

function loginFocus(e: InputEvent) {
	const target = e.target as HTMLInputElement
	if (target.classList.contains("invalid")) target.classList.remove("invalid");
};

export {loginBlur, loginFocus}