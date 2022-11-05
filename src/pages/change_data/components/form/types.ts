import "../../../../../.d"
import { Input } from '../../../../components/input';
import { Button } from '../../../../components/button';

type ElemType = {
	emailInput: Input,
	loginInput: Input,
	firstNameInput: Input,
	secondNameInput: Input,
	chatNameInput: Input,
	phoneInput: Input,
	button: Button
}

type FormType = {
	elements: ElemType,
	events: EventType
}

export {FormType, ElemType}
