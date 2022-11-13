import '../../../.d';
import { Container } from './components/container/container';
import { appendFunc } from '../../utils/append_func';
import { Block } from '../../components/block';

function navPage(): typeof Block {
  return Container as typeof Block;
}

export {Container as navPage}
