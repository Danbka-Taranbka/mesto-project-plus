import "../pages/index.css";
import Card from "./card.js";
import PopupWithImage from "./PopupWithImage.js";
import PopupWithForm from "./PopupWithForm.js";
import PopupAgreement from "./PopupAgreement.js";
import Section from "./Section.js";
import UserInfo from "./UserInfo.js";
import FormValidator from "./FormValidator.js";
import Api from "./api.js";
import { showPreloader, hidePreloader } from "../utils/utils.js";
import {
  popupImage,
  formProfile,
  formPlace,
  popupProfile,
  profileName,
  popupAgreeDelete,
  profileAbout,
} from "../utils/data.js";

//аватар
const avatar = document.querySelector(".profile__avatar");
const btnAvatarEdit = document.querySelector(".profile__avatar-container");
const popupEditAvatar = document.querySelector(".popup_edit-avatar");
const formAvatar = document.forms.avatar;
const btnSubmitAvatar = formAvatar.elements.submitAvatar;
//профайл
const btnEditProfile = document.querySelector(".profile__edit-button");
const btnSubmitProfile = formProfile.elements.submitProfile;
//новая карточка
const btnAddCard = document.querySelector(".profile__add-button");
const popupNewCard = document.querySelector(".popup_new-place");
const btnSubmitPlace = formPlace.elements.submitPlace;

let currentUserId;

document.addEventListener("DOMContentLoaded", () => {
  popupProfile.classList.add("popupTransitions");
  popupNewCard.classList.add("popupTransitions");
  popupImage.classList.add("popupTransitions");
  popupEditAvatar.classList.add("popupTransitions");
  popupAgreeDelete.classList.add("popupTransitions");
});

const api = new Api({
  baseUrl: "https://nomoreparties.co/v1/plus-cohort-19",
  headers: {
    authorization: "858c7cb6-e0c3-4a29-bdeb-66efeccdb118",
    "Content-Type": "application/json",
  },
});

const validationConfig = {
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__submit-btn",
  inactiveButtonClass: "form__submit-btn_disabled",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__input-error-message",
  errorVisibleClass: "form__input-error-message_active",
};

const formProfileValidator = new FormValidator(validationConfig, formProfile);
formProfileValidator.enableValidation();

const formPlaceValidator = new FormValidator(validationConfig, formPlace);
formPlaceValidator.enableValidation();

const formAvatarValidator = new FormValidator(validationConfig, formAvatar);
formAvatarValidator.enableValidation();

const user = new UserInfo({
  profileName: profileName,
  profileAbout: profileAbout,
  avatar: avatar,
});

const avatarPopup = new PopupWithForm(".popup_edit-avatar", {
  handleSubmitForm: ({ avatar }) => {
    return api.patchAvatar(avatar).then((res) => {
      user.setUserInfo(res);
    });
  },
  showLoader: () => {
    showPreloader(btnSubmitAvatar);
  },
  hideLoader: () => {
    hidePreloader(btnSubmitAvatar);
  },
});
avatarPopup.setEventListeners();

const profilePopup = new PopupWithForm(".popup_profile", {
  handleSubmitForm: ({ name, about }) => {
    return api.patchProfile(name, about).then((res) => {
      user.setUserInfo(res);
    });
  },
  showLoader: () => {
    showPreloader(btnSubmitProfile);
  },
  hideLoader: () => {
    hidePreloader(btnSubmitProfile);
  },
});
profilePopup.setEventListeners();

const cardPopup = new PopupWithForm(".popup_new-place", {
  handleSubmitForm: ({ place, link }) => {
    return api.postCard(place, link).then((newCardData) => {
      cardList.renderNewItem(newCardData);
    });
  },
  showLoader: () => {
    showPreloader(btnSubmitPlace);
  },
  hideLoader: () => {
    hidePreloader(btnSubmitPlace);
  },
});
cardPopup.setEventListeners();

const imagePopup = new PopupWithImage({
  popupSelector: ".popup_image-window",
  popupImagePictureSelector: ".popup__image",
  popupImageCaptionSelector: ".popup__caption",
});
imagePopup.setEventListeners();

const agreementPopup = new PopupAgreement({
  popupSelector: ".popup_agree-delete",
  btnAgreeDeleteSelector: ".popup__btn-agree",
  handleCardDelete: (binBtnTarget, cardId) => {
    return api
      .deleteCard(cardId)
      .then(() => {
        agreementPopup.close();
        binBtnTarget.closest(".photo-elements__item").remove();
      })
      .catch((err) => {
        console.log(`Ошибка при удалении карточки: ${err.message}`);
      });
  },
});
agreementPopup.setEventListeners();

function setUserId(userId) {
  currentUserId = userId;
}

const cardList = new Section({
  items: [],
  renderer: (item) => {
    const newCard = new Card(item, "#photo-cards-template", currentUserId, {
      putLike: (cardId) => {
        return api.putLike(cardId);
      },
      deleteLike: (cardId) => {
        return api.deleteLike(cardId);
      },
      handleCardDelete: (binBtnTarget, cardId) => {
        agreementPopup.open(binBtnTarget, cardId);
      },
      handleImageClick: (name, link) => {
        imagePopup.open(name, link);
      },
    });
    const cardElement = newCard.generate();
    cardList.addItem(cardElement);
  },
  containerSelector: ".photo-elements__list",
});

const renderInitialData = () => {
  Promise.all([api.getUserData(), api.getCards()])
    .then(([userData, cardsArr]) => {
      setUserId(userData._id);
      user.setUserInfo(userData);
      cardList.renderItems(cardsArr);
    })
    .catch((err) => {
      console.log(
        `Ошибка при загрузке данных пользователя с сервера: ${err.message}`
      );
    });
};
renderInitialData();

//аватар
btnAvatarEdit.addEventListener("click", () => {
  formAvatar.reset();
  formAvatarValidator.resetErrorOnReOpen();
  formAvatarValidator.disableSubmitBtnOnOpen();
  avatarPopup.open();
});

//профайл
btnEditProfile.addEventListener("click", () => {
  formProfileValidator.resetErrorOnReOpen();
  formProfileValidator.disableSubmitBtnOnOpen();
  profilePopup.setInputValues(user.getUserInfo());
  profilePopup.open();
});

//новая карточка
btnAddCard.addEventListener("click", () => {
  formPlace.reset();
  formPlaceValidator.resetErrorOnReOpen();
  formPlaceValidator.disableSubmitBtnOnOpen();
  cardPopup.open();
});
