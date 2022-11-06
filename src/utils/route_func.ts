import { HASHES } from './hash_enum';

const routeFunc = (hash: HASHES) => {
  location.assign(`http://${location.host}/#${hash}`);
};

export { routeFunc };
