import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, { handleSubmitForm, showLoader, hideLoader }) {
    super(popupSelector);
    this.popup = document.querySelector(popupSelector);
    this._form = this.popup.querySelector(".form");
    this.handleSubmitForm = handleSubmitForm;
    this._submitHandler = this._submitHandler.bind(this);
    this.showLoader = showLoader;
    this.hideLoader = hideLoader;
  }

  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach(
      (input) => (this._formValues[input.name] = input.value)
    );

    return this._formValues;
  }

  setInputValues(data) {
    this._inputList.forEach((input) => {
      input.value = data[input.name];
    });
  }

  _submitHandler(evt) {
    evt.preventDefault();
    this.showLoader();
    this.handleSubmitForm(this._getInputValues())
      .then(this.close())
      .catch((err) => {
        console.log(
          `Ошибка при отправке обновленных данных пользователя: ${err.message}`
        );
      })
      .finally(() => {
        this.hideLoader();
      });
  }

  setEventListeners() {
    super.setEventListeners();
    this._inputList = this._form.querySelectorAll(".form__input");
    this._form.addEventListener("submit", this._submitHandler);
  }

  close() {
    super.close();
    this._form.reset();
  }
}
