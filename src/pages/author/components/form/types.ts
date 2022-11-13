import '../../../../../.d';
import { Input } from '../../../../components/input/input';
import { Button } from '../../../../components/button/button';
import { Link } from '../../../../components/link/link';
import { PassHint } from '../../../../components/hints/passHint';
import { LoginHint } from '../../../../components/hints/loginHint';

type ElemType = {
  passHint: PassHint,
  loginHint: LoginHint,
  loginInput: Input,
  passInput: Input,
  link: Link,
  button: Button
};

type FormType = {
  elements: ElemType,
  events: EventType
};

export { FormType, ElemType };
