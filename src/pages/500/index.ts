import '../../../.d';
import mainhbs from './main.hbs';
import { Container } from '../../components/container';
import { routeFunc } from '../../utils/route_func';
import { HASHES } from '../../utils/hash_enum';
import { appendFunc } from '../../utils/append_func';
import * as classes from './styles.module.scss';

const thisPage = new Container(mainhbs());

thisPage.getContent().querySelector('.link')!.addEventListener('click', () => {
  routeFunc(HASHES.MAIN);
});

thisPage.modulateClasses(classes);

const page500 = function () {
  appendFunc(thisPage.getContent());
};

export { page500 };
