import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor({
    popupSelector,
    popupImagePictureSelector,
    popupImageCaptionSelector,
  }) {
    super(popupSelector);
    this.popup = document.querySelector(popupSelector);
    this.image = this.popup.querySelector(popupImagePictureSelector);
    this.caption = this.popup.querySelector(popupImageCaptionSelector);
  }

  open(imageName, imageLink) {
    super.open();

    this.image.src = imageLink;
    this.image.alt = imageName;
    this.caption.textContent = imageName;
  }
}
