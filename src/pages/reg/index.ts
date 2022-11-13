import '../../../.d';
import { Container } from './components/container/container';
import { appendFunc } from '../../utils/append_func';

const regPage = function () {
  appendFunc(new Container().getContent());
};

export { regPage };
