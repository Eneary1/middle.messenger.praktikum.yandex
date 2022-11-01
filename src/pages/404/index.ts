import '../../../.d';
import mainhbs from './main.hbs';
import { Container } from '../../utils/container';
import { routeFunc } from '../../utils/route_func';
import { hashes } from '../../utils/hash_enum';
import { appendFunc } from '../../utils/append_func';
import * as classes from './styles.module.scss';

const thisPage = new Container(mainhbs());

thisPage.getContent().querySelector('.link')!.addEventListener('click', () => {
  routeFunc(hashes.MAIN);
});

thisPage.modulateClasses(classes);

const pageExport = function () {
  appendFunc(thisPage.getContent());
};

export default pageExport;
