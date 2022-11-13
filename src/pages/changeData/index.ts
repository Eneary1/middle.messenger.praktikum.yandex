import '../../../.d';
import { Container } from './components/container/container';
import { appendFunc } from '../../utils/append_func';
import * as classes from './styles.module.scss';

// making a main element

const thisPage = new Container();

thisPage.modulateClasses(classes);

const dataPage = function () {
  appendFunc(thisPage.getContent());
};

export { dataPage };
