import '../../../../../.d';
import { Block } from '../../../../components/block';
import { Input } from '../../../../components/input';
import { Button } from '../../../../components/button';
import {FormType, ElemType} from "./types"
import mainhbs from './main.hbs';
import { Link } from '../../../../components/link';
import { routeFunc } from '../../../../utils/route_func';
import { HASHES } from '../../../../utils/hash_enum';
import {loginBlur, loginFocus} from "../../../../utils/inputEvents/login"
import {passBlur, passFocus} from "../../../../utils/inputEvents/pass"

function linkFunc() {
	routeFunc(HASHES.REG);
}

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
	button: new Button({
		text: "Войти", 
		name: "Enter",
		type: "submit",
		class: "button"
	})
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