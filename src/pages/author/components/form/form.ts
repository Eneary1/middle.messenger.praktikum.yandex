import '../../../../../.d';
import { Block } from '../../../../components/block';
import { Input } from '../../../../components/input';
import { Button } from '../../../../components/button';
import {FormType, ElemType} from "./types"
import mainhbs from './main.hbs';
import * as classes from '../../styles.module.scss';
import { Link } from '../../../../components/link';
import { routeFunc } from '../../../../utils/route_func';
import { HASHES } from '../../../../utils/hash_enum';

function linkFunc() {
	routeFunc(HASHES.REG);
}

function passBlur(e: InputEvent){
	const target = e.target as HTMLInputElement
	if (target.value.match(/^(?=.*\d)(?=.*[А-ЯA-Z]).{8,40}$/)) {
		target.classList.remove(classes.invalid);
	} else {
		target.classList.add(classes.invalid);
	}
} 

function loginBlur(e: InputEvent) {
	const target = e.target as HTMLInputElement
	if (target.value.match(/^.{3,20}$/)) {
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
		id: "login", 
		name: "login", 
		type: "text"
	}, 
	{
		blur: loginBlur, 
		focus: loginFocus
	}),
	passInput: new Input({
		id: "password", 
		name: "password", 
		type: "password"
	}, 
	{
		blur: passBlur, 
		focus: passFocus
	}),
	link: new Link({
		class: "link",
		text: "Нет аккаунта?"
	},
	{
		click: linkFunc
	}),
	button: new Button('Войти', 'Enter')
}

class AuthorForm extends Block<FormType>{
	public constructor(events: EventType) {
		super("form", {events, elements: {...elems}})
	}

	public render(): string {
		const element = this.props.elements
		return mainhbs({
			loginInput: element.loginInput.getContent().outerHTML,
			passInput: element.passInput.getContent().outerHTML,
			link: element.link.getContent().outerHTML,
			button: element.button.getContent().outerHTML
		})
	}
}

export { AuthorForm }