import '../../../.d';
import { Container } from './components/container/container';
import { appendFunc } from '../../utils/append_func';
import * as classes from './styles.module.scss';

const thisPage = new Container();

thisPage.modulateClasses(classes);

const regPage = function () {
  appendFunc(thisPage.getContent());
};

export { regPage };
