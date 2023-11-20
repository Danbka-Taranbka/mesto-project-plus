export default class Popup {
  constructor(popupSelector) {
    this._handleEscClose = this._handleEscClose.bind(this);
    this._handleOverlayClose = this._handleOverlayClose.bind(this);
    this.popup = document.querySelector(popupSelector);
  }

  open() {
    this.popup.classList.add("popup_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this.popup.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  _handleOverlayClose(evt) {
    if (evt.target === evt.currentTarget) {
      this.close(evt.target);
    }
  }

  setEventListeners() {
    this.popup.addEventListener("mousedown", this._handleOverlayClose);
    this.popup
      .querySelector(".popup__btn-close")
      .addEventListener("click", () => {
        this.close();
      });
  }
}
