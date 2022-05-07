import Card from './card.js'
import FromValidator from './FormValidator.js';

const popupProfile = document.querySelector('.popup_profile');
const popupCard = document.querySelector('.popup_card');
const popupPhoto = document.querySelector('.popup_photo');
const popupInput = document.querySelector('.popup__field')
const popupProfileOpen = document.querySelector('.profile__edit-button');
const profileNameInput = document.querySelector('.popup__field_profile_name');
const profileJobInput = document.querySelector('.popup__field_profile_job');
const popupPhotoImage = popupPhoto.querySelector('.popup__photo-image');
const popupPhotoName = popupPhoto.querySelector('.popup__photo-name')

const popupCardOpen = document.querySelector('.profile__add-button');
const popupCardClose = popupCard.querySelector('.popup__close-button');

const popupPhotoClose = popupPhoto.querySelector('.popup__close-button');



function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupEsc);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupEsc);
}

function closePopupEsc(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup); 
  }
}  


const formElementProfile = document.querySelector('.popup__container_profile');
const profileName = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__subtitle");


function formSubmitHandlerProfile (evt) {
    evt.preventDefault(); 
    profileName.textContent = profileNameInput.value;
    profileJob.textContent = profileJobInput.value;
    closePopup(popupProfile);
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

//добавление 6 карточек
initialCards.forEach((item) => {
  const card = new Card(item, "#template", popupPhotoOpen);
  const cardElement = card.createCard();
  cardContainer.append(cardElement);
});


//Добавление новой карточки 
function formSubmitHandlerCard (evt) {
  evt.preventDefault(); 
  const newCardInfo = {
      name: cardNameInput.value,
      link: cardLinkInput.value
  }
  const newCard = new Card(newCardInfo, '#template', popupPhotoOpen);
  const newCardElement = newCard.createCard();
  cardContainer.prepend(newCardElement);
  closePopup(popupCard);
}

FormElementCard.addEventListener('submit', formSubmitHandlerCard);

//закрыть попап нажатием на overlay и крестик

const popupList = Array.from(document.querySelectorAll('.popup'));
popupList.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_opened')) {
        closePopup(popup);
        return false;
    }
    if (evt.target.classList.contains('popup__close-button')) {
      closePopup(popup);
      return false;
  }
  })
});

//селекоторы для валидации 
const selectorsValidator = {
  formSelector: '.popup__container',
  inputSelector: '.popup__field',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disable',
  inputErrorClass: 'popup__field_type_error',
  errorClass: 'popup__error-text_active'
}; 

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
  openPopup(popupCard);
  CardFormValidator.resetValidation();
}); 


//открытие попап Profile
popupProfileOpen.addEventListener('click', () => {
  profileNameInput.value = profileName.textContent;
  profileJobInput.value = profileJob.textContent;
  openPopup(popupProfile);
  ProfileFormValidator.resetValidation();
});


function popupPhotoOpen (name, link) {
  popupPhotoName.textContent = name;
  popupPhotoImage.src = link;
  popupPhotoImage.alt = name;
  openPopup(popupPhoto);
};











