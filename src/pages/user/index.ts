import '../../../.d';
import mainhbs from './main.hbs';
import { Container } from '../../components/container';
import { HASHES } from '../../utils/hash_enum';
import { routeFunc } from '../../utils/route_func';
import { appendFunc } from '../../utils/append_func';
import * as classes from './styles.module.scss';

// making a main element

const thisPage = new Container(mainhbs());

thisPage.getContent().querySelector('.exit')!.addEventListener('click', () => {
  routeFunc(HASHES.MAIN);
});

thisPage.getContent().querySelector('.pass')!.addEventListener('click', () => {
  routeFunc(HASHES.PASS);
});

thisPage.getContent().querySelector('.data')!.addEventListener('click', () => {
  routeFunc(HASHES.DATA);
});

thisPage.modulateClasses(classes);

const userPage = function () {
  appendFunc(thisPage.getContent());
};

export {userPage};
