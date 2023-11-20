import Popup from "./Popup.js";

export default class PopupAgreement extends Popup {
  constructor({ popupSelector, btnAgreeDeleteSelector, handleCardDelete }) {
    super(popupSelector);
    this.btnAgreeDelete = document.querySelector(btnAgreeDeleteSelector);
    this.setAgreeBtnEventListener = this.setAgreeBtnEventListener.bind(this);
    this.handleCardDelete = handleCardDelete;
    this.binBtn = null;
    this.cardId = null;
  }

  setAgreeBtnEventListener() {
    this.handleCardDelete(this.binBtn, this.cardId);
  }

  open(binBtnTarget, cardId) {
    super.open();
    this.binBtn = binBtnTarget;
    this.cardId = cardId;
    this.btnAgreeDelete.addEventListener(
      "click",
      this.setAgreeBtnEventListener
    );
  }

  close() {
    super.close();
    this.btnAgreeDelete.removeEventListener(
      "click",
      this.setAgreeBtnEventListener
    );
  }
}
