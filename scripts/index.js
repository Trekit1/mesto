import Card from './card.js'
import FromValidator from './FormValidator.js';
import Section from './Section.js';
import PopupWithImage from './PopupWithImage.js';
import UserInfo from './UserInfo.js';
import PopupWithForm from './PopupWithForm.js';


const popupProfileOpen = document.querySelector('.profile__edit-button');
const profileNameInput = document.querySelector('.popup__field_profile_name');
const profileJobInput = document.querySelector('.popup__field_profile_job');
const popupCardOpen = document.querySelector('.profile__add-button');
const formElementProfile = document.querySelector('.popup__container_profile');
const profileName = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__subtitle");

const popupProfileSelector = '.popup_profile';
const popupCardSelector = '.popup_card';
const popupPhotoSelector = '.popup_photo';


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
    console.log(UserData.setUserInfo(data))
    popupWithFormProfile.closePopup();
}

formElementProfile.addEventListener('submit', formSubmitHandlerProfile);


const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ]; 

  

const cardContainer = document.querySelector('.photo-cards');
const FormElementCard = document.querySelector('.popup__container_card');
const cardNameInput = document.querySelector('.popup__field_card_name');
const cardLinkInput = document.querySelector('.popup__field_card_link');

const cardListSelector = '.photo-cards';

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
function formSubmitHandlerCard (evt) {
  evt.preventDefault(); 
  const newCardInfo = {
      name: cardNameInput.value,
      link: cardLinkInput.value
  }
  const newCard = new Card(newCardInfo, '#template', (name,link) => {popupWithPhoto.openPopup(name, link)});
  const newCardElement = newCard.createCard();
  cardContainer.prepend(newCardElement);
  popupWithFormCard.closePopup();
}

FormElementCard.addEventListener('submit', formSubmitHandlerCard);


//селекоторы для валидации 
const selectorsValidator = {
  formSelector: '.popup__container',
  inputSelector: '.popup__field',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disable',
  inputErrorClass: 'popup__field_type_error',
  errorClass: 'popup__error-text_active'
}; 


//валидация форм
const popupFormProfile = document.querySelector('.popup__container_profile');
const popupFormCard = document.querySelector('.popup__container_card');


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
  profileNameInput.value = profileName.textContent;
  profileJobInput.value = profileJob.textContent;
  popupWithFormProfile.openPopup();
  ProfileFormValidator.resetValidation();
});














