const popupProfile = document.querySelector('.popup_profile');
const popupCard = document.querySelector('.popup_card');
const popupPhoto = document.querySelector('.popup_photo');
const popupInput = document.querySelector('.popup__field')
const popupProfileOpen = document.querySelector('.profile__edit-button');
const popupProfileClose = popupProfile.querySelector('.popup__close-button');
const profileNameInput = document.querySelector('.popup__field_profile_name');
const profileJobInput = document.querySelector('.popup__field_profile_job');

const popupCardOpen = document.querySelector('.profile__add-button');
const popupCardClose = popupCard.querySelector('.popup__close-button');

const popupPhotoClose = popupPhoto.querySelector('.popup__close-button');

const template = document.querySelector('#template').content;

function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

//закрыть попап профиля
popupProfileClose.addEventListener('click', () => closePopup(popupProfile));



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


//открытие и закрытие popupCard
popupCardOpen.addEventListener('click', () => openPopup(popupCard));
popupCardClose.addEventListener('click', function () {
  closePopup(popupCard);
  cardNameInput.value = '';
  cardLinkInput.value = '';
  });

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

//закрыть popupPhoto
popupPhotoClose.addEventListener('click', () => closePopup(popupPhoto));

//6 карточек
const createCard = (name, link) => {
  const card = template.querySelector('.card').cloneNode(true);
  const likeButton = card.querySelector('.card__like-button');
  const deleteButton = card.querySelector('.card__delete-button');
  card.querySelector('.card__title').textContent = name;
  const cardImage = card.querySelector('.card__image');
  cardImage.src = link;
  cardImage.alt = name;

  likeButton.addEventListener('click', function () {
    likeButton.classList.toggle('card__like-button_active');
    });

  deleteButton.addEventListener('click', function () {
    card.remove();
  });

  cardImage.addEventListener('click', function popupPhotoOpen () {
    popupPhoto.querySelector('.popup__photo-name').textContent = name;
    const popupPhotoImage = popupPhoto.querySelector('.popup__photo-image');
    popupPhotoImage.src = link;
    popupPhotoImage.alt = name;
    openPopup(popupPhoto);
  });

  return card;
}

const renderCard = (name, link) => {
  cardContainer.prepend(createCard(name, link))
} 

//Добавление новой карточки 
function formSubmitHandlerCard (evt) {
  evt.preventDefault(); 
  renderCard(cardNameInput.value, cardLinkInput.value);
  closePopup(popupCard);
  cardNameInput.value = '';
  cardLinkInput.value = '';
}

FormElementCard.addEventListener('submit', formSubmitHandlerCard);

const elements = initialCards.map(function(card) {
  return createCard(card.name, card.link);
})

cardContainer.append(...elements);













