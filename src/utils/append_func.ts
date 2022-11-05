const appendFunc = function (element: HTMLElement) {
  document.getElementById('root').innerHTML = '';
  document.getElementById('root').appendChild(element);
};

export { appendFunc };
