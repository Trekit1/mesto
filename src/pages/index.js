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
const popupWithFormProfile = new PopupWithForm(popupProfileSelector, formSubmitHandlerProfile)
const popupWithFormCard = new PopupWithForm(popupCardSelector, formSubmitHandlerCard)
const UserData = new UserInfo({
  nameElement: profileName,
  jobElement: profileJob
});

popupWithFormProfile.setEventListeners();
popupWithFormCard.setEventListeners();
popupWithPhoto.setEventListeners();


function formSubmitHandlerProfile (data) {
    UserData.setUserInfo(data);
    popupWithFormProfile.closePopup();
}


//Добавление 6 карточек
const cardList = new Section({
  data: initialCards,
  renderer: (item) => {
    const card = new Card(item, "#template", (name,link) => {popupWithPhoto.openPopup(name, link)});
    const cardElement = card.createCard();
    cardList.addItem(cardElement);
  }
}, cardListSelector);
cardList.renderItems()



//Добавление новой карточки 
function formSubmitHandlerCard () {
  const newCardInfo = {
      name: cardNameInput.value,
      link: cardLinkInput.value
  }
  const newCard = new Card(newCardInfo, '#template', (name,link) => {popupWithPhoto.openPopup(name, link)});
  const newCardElement = newCard.createCard();
  cardContainer.prepend(newCardElement);
  popupWithFormCard.closePopup();
}


//валидация форм
const ProfileFormValidator = new FromValidator(selectorsValidator, popupFormProfile);
const CardFormValidator = new FromValidator(selectorsValidator, popupFormCard);
ProfileFormValidator.enableValidation();
CardFormValidator.enableValidation();



//открыть попап Card
popupCardOpen.addEventListener('click', () => {
  cardNameInput.value = '';
  cardLinkInput.value = '';
  popupWithFormCard.openPopup();
  CardFormValidator.resetValidation();
}); 


//открытие попап Profile
popupProfileOpen.addEventListener('click', () => {
  const info = UserData.getUserInfo();
  profileNameInput.value = info.name;
  profileJobInput.value = info.job;
  popupWithFormProfile.openPopup();
  ProfileFormValidator.resetValidation();
});














