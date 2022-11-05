import '../../../../../.d';
import { Block } from '../../../../components/block';
import { Input } from '../../../../components/input';
import { Button } from '../../../../components/button';
import {FormType, ElemType} from "./types"
import mainhbs from './main.hbs';
import {loginBlur, loginFocus} from "../../../../utils/inputEvents/login"
import {passBlur, passFocus} from "../../../../utils/inputEvents/pass"
import { firstNameBlur, firstNameFocus } from '../../../../utils/inputEvents/firstName';


const elems: ElemType = {
	loginInput: new Input({
		id: "first_name", 
		name: "first_name", 
		type: "text"
	}, 
	{
		blur: loginBlur, 
		focus: loginFocus
	}),
	emailInput: new Input({
		id: "email", 
		name: "email", 
		type: "email"
	}, 
	{
		blur: passBlur, 
		focus: passFocus
	}),
	firstNameInput: new Input({
		id: "first_name", 
		name: "first_name", 
		type: "text"
	}, 
	{
		blur: firstNameBlur, 
		focus: firstNameFocus
	}),
	secondNameInput: new Input({
		id: "second_name", 
		name: "second_name", 
		type: "text"
	}, 
	{
		blur: passBlur, 
		focus: passFocus
	}),
	chatNameInput: new Input({
		id: "chat_name", 
		name: "chat_name", 
		type: "text"
	}, 
	{
		blur: passBlur, 
		focus: passFocus
	}),
	phoneInput: new Input({
		id: "phone", 
		name: "phone", 
		type: "text"
	}, 
	{
		blur: passBlur, 
		focus: passFocus
	}),
	button: new Button({
		text: "Сохранить", 
		name: "Enter",
		type: "submit",
		class: "button"
	})
}

class RegForm extends Block<FormType>{
	public constructor(events: EventType) {
		super("form", {events, elements: elems})
	}

	public render(): string {
		const elements = this.props.elements
		return mainhbs({
			chatNameInput: elements.chatNameInput.getContent().outerHTML,
			firstNameInput: elements.firstNameInput.getContent().outerHTML,
			secondNameInput: elements.secondNameInput.getContent().outerHTML,
			loginInput: elements.loginInput.getContent().outerHTML,
			phoneInput: elements.phoneInput.getContent().outerHTML,
			emailInput: elements.emailInput.getContent().outerHTML,
			button: elements.button.getContent().outerHTML,
		})
	}
}

export { RegForm }