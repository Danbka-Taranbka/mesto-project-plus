export default class FormValidator {
  constructor(classSettings, formElement) {
    this.classSettings = classSettings;
    this.formElement = formElement;
  }

  enableValidation() {
    this._setEventListeners();
  }

  _setEventListeners() {
    this.inputList = Array.from(
      this.formElement.querySelectorAll(this.classSettings.inputSelector)
    );

    this.buttonElement = this.formElement.querySelector(
      this.classSettings.submitButtonSelector
    );

    this._setSubmitBtnState();

    this.inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._isValid(inputElement);
        this._setSubmitBtnState();
      });
    });
  }

  _isValid(inputElement) {
    if (inputElement.validity.patternMismatch) {
      inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } else {
      inputElement.setCustomValidity("");
    }

    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _hasInvalidInput() {
    return this.inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _setSubmitBtnState() {
    if (this._hasInvalidInput()) {
      this.buttonElement.disabled = true;
      this.buttonElement.classList.add(this.classSettings.inactiveButtonClass);
    } else {
      this.buttonElement.disabled = false;
      this.buttonElement.classList.remove(
        this.classSettings.inactiveButtonClass
      );
    }
  }

  _showInputError(inputElement, errorMessage) {
    this.errorElement = this.formElement.querySelector(
      `.${inputElement.id}-error`
    );

    inputElement.classList.add(this.classSettings.inputErrorClass);
    this.errorElement.textContent = errorMessage;
    this.errorElement.classList.add(this.classSettings.errorVisibleClass);
  }

  _hideInputError(inputElement) {
    this.errorElement = this.formElement.querySelector(
      `.${inputElement.id}-error`
    );

    inputElement.classList.remove(this.classSettings.inputErrorClass);
    this.errorElement.classList.remove(this.classSettings.errorVisibleClass);
    this.errorElement.textContent = "";
  }

  resetErrorOnReOpen() {
    this.inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
  }

  disableSubmitBtnOnOpen() {
    this.buttonElement.setAttribute("disabled", true);
    this.buttonElement.classList.add(this.classSettings.inactiveButtonClass);
  }
}
