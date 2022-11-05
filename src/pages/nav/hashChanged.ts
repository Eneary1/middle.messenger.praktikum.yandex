import {authorPage} from '../author/index';
import {mainPage} from '../main/index';
import {regPage} from '../reg/index';
import {userPage} from '../user/index';
import {dataPage} from '../change_data/index';
import {passwordPage} from '../change_password/index';
import {page404} from '../404/index';
import {page500} from '../500/index';
import { HASHES } from '../../utils/hash_enum';

function hashChanged(defaultFunc: Function): () =>  void {
	return function () {
		switch (location.hash.slice(1, location.hash.length)) {
		case HASHES.ENTER:
			authorPage();
			return;
		case HASHES.REG:
			regPage();
			return;
		case HASHES.MAIN:
			mainPage();
			return;
		case HASHES.PROFILE:
			userPage();
			return;
		case HASHES.PASS:
			passwordPage();
			return;
		case HASHES.DATA:
			dataPage();
			return;
		case HASHES.HASH404:
			page404();
			return;
		case HASHES.HASH500:
			page500();
			return;
		default:
			defaultFunc();
		}
	}
  }

  export {hashChanged}