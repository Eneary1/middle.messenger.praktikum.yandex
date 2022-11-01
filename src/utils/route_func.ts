const routeFunc = (hash) => {
  location.assign(`http://${location.host}/#${hash}`);
};

export { routeFunc };
