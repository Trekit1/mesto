export const popupProfileOpen = document.querySelector('.profile__edit-button');
export const profileNameInput = document.querySelector('.popup__field_profile_name');
export const profileJobInput = document.querySelector('.popup__field_profile_job');
export const popupCardOpen = document.querySelector('.profile__add-button');
export const profileName = document.querySelector(".profile__title");
export const profileJob = document.querySelector(".profile__subtitle");

export const popupProfileSelector = '.popup_profile';
export const popupCardSelector = '.popup_card';
export const popupPhotoSelector = '.popup_photo';

export const initialCards = [
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

  

export const cardContainer = document.querySelector('.photo-cards');
export const cardNameInput = document.querySelector('.popup__field_card_name');
export const cardLinkInput = document.querySelector('.popup__field_card_link');

export const cardListSelector = '.photo-cards';

export const popupFormProfile = document.querySelector('.popup__container_profile');
export const popupFormCard = document.querySelector('.popup__container_card');

//селекоторы для валидации 
export const selectorsValidator = {
    formSelector: '.popup__container',
    inputSelector: '.popup__field',
    submitButtonSelector: '.popup__save-button',
    inactiveButtonClass: 'popup__save-button_disable',
    inputErrorClass: 'popup__field_type_error',
    errorClass: 'popup__error-text_active'
  }; 