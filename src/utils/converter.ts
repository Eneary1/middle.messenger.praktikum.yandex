function modulateClasses(domElement: Element, moduleClasses: object): HTMLElement {
  const wrapper = document.createElement('div');
  wrapper.appendChild(domElement);

  const selectorNames = Object.keys(moduleClasses);

  let selectors: Array<String>;
  let elements: NodeListOf<Element>;

  // classes
  selectors = selectorNames.map((a) => `.${a}`);

  elements = wrapper.querySelectorAll(selectors.join(','));
  elements.forEach((element) => {
    Array.from(element.classList.values()).forEach((oldClass: string) => {
      const newClass: string = moduleClasses[oldClass] === undefined ? oldClass : moduleClasses[oldClass];
      element.classList.replace(oldClass, newClass);
    });
  });

  // ids
  selectors = selectorNames.map((a) => `#${a}`);
  elements = wrapper.querySelectorAll(selectors.join(','));
  elements.forEach((element) => {
  	element.id = moduleClasses[element.id] === undefined ? element.id : moduleClasses[element.id];
  });

  return wrapper.firstElementChild as HTMLElement;
}

export { modulateClasses };
