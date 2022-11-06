import '../../../.d';
import { BarsContainer } from './components/bars/index';
import { MessageTape } from './components/tape/index';
import { Container } from '../../components/container';
import { routeFunc } from '../../utils/route_func';
import { HASHES } from '../../utils/hash_enum';
import { appendFunc } from '../../utils/append_func';
import * as classes from './styles.module.scss';

const thisPage = new Container('');

const tape = new MessageTape();
const bars = new BarsContainer(tape);

thisPage.getContent().appendChild(bars.getContent());
thisPage.getContent().appendChild(tape.getContent());
thisPage.getContent().querySelector(`.${classes.profile}`)?.addEventListener(('click'), () => {
  routeFunc(HASHES.PROFILE);
});

thisPage.modulateClasses(classes);

const mainPage = function () {
  appendFunc(thisPage.getContent());
};

export { mainPage };
