import '../../../.d';
import mainhbs from './main.hbs';
import { showInputs } from '../../utils/show_inputs';
import { Container } from '../../utils/container';
import { Button } from '../../utils/button';
import { routeFunc } from '../../utils/route_func';
import { hashes } from '../../utils/hash_enum';
import { appendFunc } from '../../utils/append_func';
import * as classes from './styles.module.scss';

// making a main element

const button = new Button('Сохранить', 'Data-change');
const thisPage = new Container(
  mainhbs({ button: button.getContent().outerHTML }),
);

thisPage.getContent().querySelector('button')!.addEventListener('click', (e) => {
  e.preventDefault();
  showInputs(thisPage.getContent());
  routeFunc(hashes.PROFILE);
});

thisPage.modulateClasses(classes);

const pageExport = function () {
  appendFunc(thisPage.getContent());
};

export default pageExport;
