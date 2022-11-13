import '../../../.d';
import { appendFunc } from '../../utils/append_func';
import { Container } from './components/container/container';

const page500 = function () {
  appendFunc(new Container().getContent());
};

export { page500 };
