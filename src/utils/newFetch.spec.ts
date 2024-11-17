import chai from 'chai';
import { queryString } from './queryString';

describe('NewFetch check', () => {
  it('As long as it has access, id should be equal to 1', async () => {
    await new Promise((resolve, reject) => {
      const url = 'https://jsonplaceholder.typicode.com/todos/1';
      const data = {};
      const method = 'GET';
      const headers = {};
      if (!method) {
		  reject('No method');
		  return;
      }

      const xhr = new XMLHttpRequest();
      const isGet = method === 'GET';

      xhr.open(method, isGet && !!data ? `${url}${queryString(data)}` : url);

      Object.keys(headers).forEach((key) => {
		  xhr.setRequestHeader(key, headers[key]);
      });

      xhr.onload = function () {
		  if (xhr.status === 400 || xhr.status === 401 || xhr.status === 409) reject();
		  resolve(xhr);
      };

      xhr.withCredentials = true;
      xhr.onabort = reject;
      xhr.onerror = reject;

      xhr.timeout = 5000;
      xhr.ontimeout = reject;

      if (isGet || !data) {
		  xhr.send();
      } else {
		  xhr.send((data instanceof FormData) ? data : queryString(data));
      }
	  }).then((a) => {
      let res: any = a as XMLHttpRequest;
      res = JSON.parse(res.response);
      chai.expect(res.id).to.eq(1);
	  });
  });
});
