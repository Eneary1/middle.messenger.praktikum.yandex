import '../../../.d';
import mainhbs from './main.hbs';
import { Container } from '../../utils/container';
import { hashes } from '../../utils/hash_enum';
import { routeFunc } from '../../utils/route_func';
import { appendFunc } from '../../utils/append_func';
import * as classes from './styles.module.scss';

// making a main element

const thisPage = new Container(mainhbs());

thisPage.getContent().querySelector('.exit')!.addEventListener('click', () => {
  routeFunc(hashes.MAIN);
});

thisPage.getContent().querySelector('.pass')!.addEventListener('click', () => {
  routeFunc(hashes.PASS);
});

thisPage.getContent().querySelector('.data')!.addEventListener('click', () => {
  routeFunc(hashes.DATA);
});

thisPage.modulateClasses(classes);

const pageExport = function () {
  appendFunc(thisPage.getContent());
};

export default pageExport;
