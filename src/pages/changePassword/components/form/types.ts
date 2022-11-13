import '../../../../../.d';
import { Input } from '../../../../components/input/input';
import { Button } from '../../../../components/button/button';
import { Link } from '../../../../components/link/link';
import { PassHint } from '../../../../components/hints/passHint';
import { PassRepeatHint } from '../../../../components/hints/passRepeat';

type ElemType = {
  oldPass: Input,
  pass: Input,
  passRepeat: Input,
  oldPassHint: PassHint,
  passHint: PassHint,
  passRepeatHint: PassRepeatHint,
  button: Button
};

type FormType = {
  elements: ElemType,
  events: EventType
};

export { FormType, ElemType };
