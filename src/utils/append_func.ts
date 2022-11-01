const appendFunc = function (element) {
  document.getElementById('root')!.textContent = '';
  document.getElementById('root')!.appendChild(element);
};

export { appendFunc };
