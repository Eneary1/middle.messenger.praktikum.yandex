function modulateClasses(domElement: Element, moduleClasses: object) {

  const selectorNames = Object.keys(moduleClasses);

  let selectors: Array<String>;
  let elements: NodeListOf<Element>;

  // classes
  selectors = selectorNames.map((a) => `.${a}`);
  elements = domElement.querySelectorAll(selectors.join(','));
  [...elements,domElement].forEach((element) => {
    Array.from(element.classList.values()).forEach((oldClass: string) => {
      const newClass: string = moduleClasses[oldClass] === undefined ? oldClass : moduleClasses[oldClass];
      element.classList.replace(oldClass, newClass);
    });
  });

  //ids
  // selectors = selectorNames.map((a) => `#${a}`);
  // elements = domElement.querySelectorAll(selectors.join(','));
  // [...elements,domElement].forEach((element) => {
  // 	element.id = moduleClasses[element.id] === undefined ? element.id : moduleClasses[element.id];
  // });
}

export { modulateClasses };
