import "../../../../../.d"
import { Input } from '../../../../components/input';
import { Button } from '../../../../components/button';
import { Link } from "../../../../components/link";

type ElemType = {
	loginInput: Input,
	passInput: Input,
	link: Link,
	button: Button
}

type FormType = {
	elements: ElemType,
	events: EventType
}

export {FormType, ElemType}
