import userPage from '../user/index';
import { BarsContainer } from './components/bars/index';
import { MessageTape } from './components/tape/index';
import { Container } from '../../utils/container';
import * as classes from './styles.module.scss';

const thisPage = new Container('');

const tape = new MessageTape(classes);
const bars = new BarsContainer(classes, tape);

thisPage.getContent().appendChild(bars.getContent());
thisPage.getContent().appendChild(tape.getContent());
thisPage.getContent().querySelector(`.${classes.profile}`)?.addEventListener(('click'), () => {
  userPage();
});

thisPage.modulateClasses(classes);

const pageExport = function () {
  document.getElementById('root')!.textContent = '';
  document.getElementById('root')!.appendChild(thisPage.getContent());
};

export default pageExport;
