const showInputs = (element: HTMLElement) => {
  const form = new FormData(element.querySelector('form') as HTMLFormElement);
  const inputs = Array.from(element.querySelector('form')!.querySelectorAll('input'));
  const formInfo = {};
  inputs.forEach((a) => {
    if (a.hasAttribute('name')) {
      formInfo[a.getAttribute('name') as string] = form.get(a.getAttribute('name') as string);
    }
  });
  console.log(formInfo);
};

export { showInputs };
