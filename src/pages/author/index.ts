import '../../../.d';
import { appendFunc } from '../../utils/append_func';
import { Container } from './components/container/container';
import * as classes from './styles.module.scss';

// making a main element

const thisPage = new Container();

thisPage.modulateClasses(classes);

const authorPage = function () {
  appendFunc(thisPage.getContent());
};

export { authorPage };
