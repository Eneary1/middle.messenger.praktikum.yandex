import '../../../.d';
import { BarsContainer } from './components/bars/index';
import { MessageTape } from './components/tape/index';
import { Container } from '../../utils/container';
import { routeFunc } from '../../utils/route_func';
import { hashes } from '../../utils/hash_enum';
import { appendFunc } from '../../utils/append_func';
import * as classes from './styles.module.scss';

const thisPage = new Container('');

const tape = new MessageTape(classes);
const bars = new BarsContainer(classes, tape);

thisPage.getContent().appendChild(bars.getContent());
thisPage.getContent().appendChild(tape.getContent());
thisPage.getContent().querySelector(`.${classes.profile}`)?.addEventListener(('click'), () => {
  routeFunc(hashes.PROFILE);
});

thisPage.modulateClasses(classes);

const pageExport = function () {
  appendFunc(thisPage.getContent());
};

export default pageExport;
