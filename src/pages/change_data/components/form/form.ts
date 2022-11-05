import '../../../../../.d';
import { Block } from '../../../../components/block';
import { Input } from '../../../../components/input';
import { Button } from '../../../../components/button';
import {FormType, ElemType} from "./types"
import mainhbs from './main.hbs';
import * as classes from '../../styles.module.scss';

function passBlur(e: InputEvent){
	const target = e.target as HTMLInputElement
	if (target.value !== '') {
		target.classList.remove(classes.invalid);
	} else {
		target.classList.add(classes.invalid);
	}
} 

function loginBlur(e: InputEvent) {
	const target = e.target as HTMLInputElement
	if (target.value !== '') {
		target.classList.remove(classes.invalid);
	} else {
		target.classList.add(classes.invalid);
	}
  }

function loginFocus(e: InputEvent) {
	const target = e.target as HTMLInputElement
	if (target.classList.contains(classes.invalid)) target.classList.remove(classes.invalid);
  };

function passFocus(e: InputEvent) {
	const target = e.target as HTMLInputElement
	if (target.classList.contains(classes.invalid)) target.classList.remove(classes.invalid);
  };

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
		blur: passBlur, 
		focus: passFocus
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
	button: new Button('Сохранить', 'Data-change')
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
			loginInput: elements.loginInput.getContent().outerHTML,
			phoneInput: elements.phoneInput.getContent().outerHTML,
			secondNameInput: elements.secondNameInput.getContent().outerHTML,
			emailInput: elements.emailInput.getContent().outerHTML,
			button: elements.button.getContent().outerHTML,
		})
	}
}

export { RegForm }