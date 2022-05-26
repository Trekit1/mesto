import './index.css'
import Card from '../scripts/Card.js'
import FromValidator from '../scripts/FormValidator.js';
import Section from '../scripts/Section.js';
import PopupWithImage from '../scripts/PopupWithImage.js';
import UserInfo from '../scripts/UserInfo.js';
import PopupWithForm from '../scripts/PopupWithForm.js';

import { 
popupProfileOpen, 
profileNameInput,
profileJobInput,
popupCardOpen ,
profileName ,
profileJob ,
popupProfileSelector,
popupCardSelector ,
popupPhotoSelector,
initialCards ,
cardContainer ,
cardNameInput ,
cardLinkInput ,
cardListSelector,
popupFormProfile ,
popupFormCard ,
selectorsValidator 
} from '../untils/constants.js';


const popupWithPhoto = new PopupWithImage(popupPhotoSelector)
const popupWithFormProfile = new PopupWithForm(popupProfileSelector, handleProfileFormSubmit)
const popupWithFormCard = new PopupWithForm(popupCardSelector, handleCardFormSubmit)
const userData = new UserInfo({
  nameElement: profileName,
  jobElement: profileJob
});

popupWithFormProfile.setEventListeners();
popupWithFormCard.setEventListeners();
popupWithPhoto.setEventListeners();


function handleProfileFormSubmit (data) {
    userData.setUserInfo(data);
    popupWithFormProfile.closePopup();
}

//Добавление 6 карточек
const cardList = new Section({
  data: initialCards,
  renderer: (item) => {
    cardList.addItem(createCard(item));
  }
}, cardListSelector);
cardList.renderItems();


function createCard(item) {
  const card = new Card(item, "#template", (name,link) => {popupWithPhoto.openPopup(name, link)});
  const cardElement = card.createCard();
  return cardElement
};


//Добавление новой карточки 
function handleCardFormSubmit (data) {
  const newCardInfo = {
      name: data.cardName,
      link: data.cardLink,
  }
  cardContainer.prepend(createCard(newCardInfo));
  popupWithFormCard.closePopup();
};

//валидация форм
const profileFormValidator = new FromValidator(selectorsValidator, popupFormProfile);
const cardFormValidator = new FromValidator(selectorsValidator, popupFormCard);
profileFormValidator.enableValidation();
cardFormValidator.enableValidation();

//открыть попап Card
popupCardOpen.addEventListener('click', () => {
  cardNameInput.value = '';
  cardLinkInput.value = '';
  popupWithFormCard.openPopup();
  cardFormValidator.resetValidation();
}); 

//открытие попап Profile
popupProfileOpen.addEventListener('click', () => {
  const info = userData.getUserInfo();
  profileNameInput.value = info.name;
  profileJobInput.value = info.job;
  popupWithFormProfile.openPopup();
  profileFormValidator.resetValidation();
});














