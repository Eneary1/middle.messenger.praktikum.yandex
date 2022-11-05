const showInputs = (form: HTMLFormElement) => {
  const formData = new FormData(form)
  const inputs = Array.from(form.querySelectorAll('input'));
  const formInfo = {};
  inputs.forEach((a) => {
    if (a.hasAttribute('name')) {
      formInfo[a.getAttribute('name') as string] = formData.get(a.getAttribute('name') as string);
    }
  });
  console.log(formInfo);
};

export { showInputs };
