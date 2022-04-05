const popup = document.querySelector('.popup');
const popupEdit = document.querySelector('.popup_edit');
const openPopupEdit = document.querySelector('.profile__edit-button');
const closePopupEdit = popupEdit.querySelector('.popup__close-button');
const nameInput = document.querySelector('.popup__field_profile_name');
const jobInput = document.querySelector('.popup__field_profile_job');

 
function openPopup(popup) {
    popup.classList.add('popup_opened');
}


openPopupEdit.addEventListener('click', function() {
    openPopup(popupEdit);
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
})


function closePopup(popup) {
    popup.classList.remove('popup_opened');
}

closePopupEdit.addEventListener('click', () => closePopup(popupEdit));

const formElementEdit = document.querySelector('.popup__container_edit');
const profileName = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__subtitle");


function formSubmitHandlerEdit (evt) {
    evt.preventDefault(); 
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closePopup(popupEdit);
}

formElementEdit.addEventListener('submit', formSubmitHandlerEdit);


//открытие и закрытие popupAdd
const popupAdd = document.querySelector('.popup_add');
const openPopupAdd = document.querySelector('.profile__add-button');
const closePopupAdd = popupAdd.querySelector('.popup__close-button');

openPopupAdd.addEventListener('click', () => openPopup(popupAdd));
closePopupAdd.addEventListener('click', () => closePopup(popupAdd));

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

const cards = document.querySelector('.photo-cards');
const addCardForm = document.querySelector('.popup__container_add');
const cardName = document.querySelector('.popup__field_card_name');
const cardLink = document.querySelector('.popup__field_card_link');
const popupPhoto = document.querySelector('.popup_photo');
const closePopupPhoto = popupPhoto.querySelector('.popup__close-button');

closePopupPhoto.addEventListener('click', () => closePopup(popupPhoto));

const createCards = (name, link) => {
  const template = document.querySelector('#template').content;
  const card = template.querySelector('.card').cloneNode(true);
  const likeButton = card.querySelector('.card__like-button');
  const deleteButton = card.querySelector('.card__delete-button');
  card.querySelector('.card__title').textContent = name;
  card.querySelector('.card__image').src = link;

  likeButton.addEventListener('click', function () {
    likeButton.classList.toggle('card__like-button_active');
    });

  deleteButton.addEventListener('click', function () {
    card.remove();
  });

  card.querySelector('.card__image').addEventListener('click', function popupPhotoOpen () {
    popupPhoto.classList.add('popup_opened');
    popupPhoto.querySelector('.popup__photo-image').src = link;
    popupPhoto.querySelector('.popup__photo-name').textContent = name;
  });

  return card;
}

const renderCard = (name, link) => {
  cards.prepend(createCards(name, link))
}  


//Добавление новой карточки 
function formSubmitHandlerAdd (evt) {
  evt.preventDefault(); 
  const template = document.querySelector('#template').content;
  const card = template.querySelector('.card').cloneNode(true);
  const name = cardName.value;
  const link = cardLink.value;
  card.querySelector('.card__title').textContent = name;
  card.querySelector('.card__image').src = link;
  renderCard(name, link);
  closePopup(popupAdd);
  cardName.value = '';
  cardLink.value = '';
}

addCardForm.addEventListener('submit', formSubmitHandlerAdd);

const elements = initialCards.map(function(card) {
  return createCards(card.name, card.link);
})

cards.append(...elements);



