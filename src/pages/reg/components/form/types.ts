import '../../../../../.d';
import { Input } from '../../../../components/input/input';
import { Button } from '../../../../components/button/button';
import { Link } from '../../../../components/link/link';
import { NameHint } from '../../../../components/hints/nameHint';
import { PassHint } from '../../../../components/hints/passHint';
import { EmailHint } from '../../../../components/hints/emailHint';
import { LoginHint } from '../../../../components/hints/loginHint';

type ElemType = {
  emailInput: Input,
  loginInput: Input,
  firstNameInput: Input,
  secondNameInput: Input,
  passInput: Input,
  passRepeat: Input,
  phoneInput: Input,
  button: Button
  link: Link,
  firstNameHint: NameHint,
  secondNameHint: NameHint,
  passHint: PassHint,
  passRepeatHint: PassHint,
  phoneHint: PassHint,
  emailHint: EmailHint,
  loginHint: LoginHint
};

type FormType = {
  elements: ElemType,
  events: EventType
};

export { FormType, ElemType };
