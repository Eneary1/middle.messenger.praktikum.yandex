import chai from 'chai';
import { JSDOM } from 'jsdom';
import { Block } from '../components/block';
import { ROUTES } from './routeEnum';

describe('Router check', () => {
  it('Should be on the data change page', () => {
    const block = new Block();
    const { window } = new JSDOM('', {
      contentType: 'text/html',
      includeNodeLocations: true,
      url: 'http://localhost:3000',
	  });
    window.history.pushState({}, '', ROUTES.ENTER);
    window.history.pushState({}, '', ROUTES.DATA);
    window.location.replace(ROUTES.DATA);
    chai.expect(window.location.pathname).to.eq(ROUTES.DATA);
  });
  it('Should be able to go back', () => {
    const { window } = new JSDOM('', {
      contentType: 'text/html',
      includeNodeLocations: true,
      url: 'http://localhost:3000',
	  });
    window.history.pushState({}, '', ROUTES.ENTER);
    window.history.back();
    chai.expect(window.location.pathname).to.eq('/');
  });
  it('Should be able to go forward', () => {
    const { window } = new JSDOM('', {
      contentType: 'text/html',
      includeNodeLocations: true,
      url: 'http://localhost:3000',
	  });
    window.history.pushState({}, '', ROUTES.DATA);
    window.history.back();
    window.history.forward();
    chai.expect(window.location.pathname).to.eq(ROUTES.DATA);
  });
});
