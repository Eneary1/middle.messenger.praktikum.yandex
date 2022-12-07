import chai from 'chai';

describe('Block check', () => {
  it('SetProps. Should make a new combined object out of two', () => {
    const props = { old: 1 };
    const newProps = { new: 1 };
    function setProps() {
      if (!newProps) {
		  return;
      }
      Object.assign(props, newProps);
	  }
    setProps();
    chai.expect(props.old).not.to.eq(undefined);
    chai.expect(props.new).not.to.eq(undefined);
  });
  it('Proxy. Should make proxy object out of basic object', () => {
    const props = { old: 1 };
    const proxyProps = new Proxy(props, {
      get(target, prop) {
		  const value = target[prop];
		  return typeof value === 'function' ? value.bind(target) : value;
      },
      set: (target, prop, value) => {
		  target[prop] = value;
		  return true;
      },
      deleteProperty() {
		  throw new Error('Нет доступа');
      },
	  });
	  let err = false;
	  try {
      delete proxyProps.old;
	  } catch {
      err = true;
	  }
    chai.expect(err).to.eq(true);
  });
});
