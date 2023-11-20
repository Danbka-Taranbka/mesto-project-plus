const btnTextLoaderConfig = {
  btnTextOriginal: "",
  btnTextLoading: "Сохранение ...",
};

const storeOriginalText = (btnSubmitElement) => {
  btnTextLoaderConfig.btnTextOriginal = btnSubmitElement.textContent;
};

const showPreloader = (btnSubmitElement) => {
  storeOriginalText(btnSubmitElement);
  return (btnSubmitElement.textContent = btnTextLoaderConfig.btnTextLoading);
};

const hidePreloader = (btnSubmitElement) => {
  return (btnSubmitElement.textContent = btnTextLoaderConfig.btnTextOriginal);
};

export { showPreloader, hidePreloader };
