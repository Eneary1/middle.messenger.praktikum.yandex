import '../../../.d';
import mainhbs from './main.hbs';
import { showInputs } from '../../utils/show_inputs';
import { Container } from './components/container/container';
import { Button } from '../../components/button';
import { routeFunc } from '../../utils/route_func';
import { HASHES } from '../../utils/hash_enum';
import { appendFunc } from '../../utils/append_func';
import * as classes from './styles.module.scss';

// making a main element

const thisPage = new Container();

thisPage.modulateClasses(classes);

const dataPage = function () {
  appendFunc(thisPage.getContent());
};

export {dataPage};
