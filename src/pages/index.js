import './index.css'
import Card from '../scripts/Card.js'
import FromValidator from '../scripts/FormValidator.js';
import Section from '../scripts/Section.js';
import PopupWithImage from '../scripts/PopupWithImage.js';
import UserInfo from '../scripts/UserInfo.js';
import PopupWithForm from '../scripts/PopupWithForm.js';
import Popup from '../scripts/Popup.js';
import Api from '../scripts/Api.js';
import PopupWithConfirm from '../scripts/PopupWithConfirm';



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
popupConfirmSelector,
popupAvatarSelector,
cardContainer ,
cardNameInput ,
cardLinkInput ,
cardListSelector,
popupFormProfile ,
popupFormCard ,
selectorsValidator,
userAvatar,
saveButtonAvatar,
saveButtonProfile,
saveButtonCard,
profileAvatar,
popupAvatarContainer,
avatarLinkInput,
popupAvatarOpen,
} from '../untils/constants.js';



const api = new Api({
  url: "https://nomoreparties.co/v1/cohort-42",
  headers: {
    authorization: '5868c6c7-533b-43f4-8ab8-51cbbba53e88',
    'Content-Type': 'application/json'
  }
})

//попапы
const popupWithPhoto = new PopupWithImage(popupPhotoSelector)

const popupWithFormProfile = new PopupWithForm(popupProfileSelector, handleProfileFormSubmit)

const popupWithFormCard = new PopupWithForm(popupCardSelector, handleCardFormSubmit)

const popupWithConfirm = new PopupWithConfirm (popupConfirmSelector)

const popupWithAvatar = new PopupWithForm(popupAvatarSelector, handleAvatarFormSubmit)

//информация о пользователе
const userData = new UserInfo({
  nameElement: profileName,
  jobElement: profileJob,
  userAvatar: userAvatar
});

//слушатели попапов
popupWithConfirm.setEventListeners();
popupWithFormProfile.setEventListeners();
popupWithFormCard.setEventListeners();
popupWithPhoto.setEventListeners();
popupWithAvatar.setEventListeners();




//функция создания карточки
function createCard(item, userInfo) {
  const card = new Card(item, "#template", (name,link) => {popupWithPhoto.openPopup(name, link)}, userInfo, () => {popupWithConfirm.openPopup()}, handleConfirmSubmit, handleLikeCard,handleDislikeCard);
  console.log(card.isLiked())
  const cardElement = card.createCard();
  return cardElement
}; 


//отрисовка карточек
Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userInfo, cards]) => {
    console.log(cards)
     //установка данных пользователя
    userData.setUserInfo(userInfo);
      //отрисовка карточек
    const cardList = new Section({
      data: cards,
      renderer: (item) => {
        cardList.addItem(createCard(item, userInfo));
      }
    }, cardListSelector);
    cardList.renderItems(cards);
  })
  .catch((err) => {
    console.log(err)
  })



  
  function handleLikeCard(cardId,card) {
    api.likeCard(cardId)
    .then((res) => {
      let likeNumber = card.querySelector('.card__likes');
      likeNumber.textContent = res.likes.length;
      console.log(res)
    })
    .catch((err) => {
      console.log(err)
    })
  }

  function handleDislikeCard(cardId, card) {
    api.dislikeCard(cardId)
    .then((res) => {
      let likeNumber = card.querySelector('.card__likes');
      likeNumber.textContent = res.likes.length;
      console.log('дислайк')
    })
    .catch((err) => {
      console.log(err)
    })
  }

 /* if (!this._cardLikeContainer.contains(this._cardLikeButtonActive)) {
    this._handleLikeCard(this._cardId, this._element);;
}  else {
    this._handleDislikeCard(this._cardId, this._element);
} */





  //Улучшенный UX всех форм
  function renderLoadingProcess(loading, saveButton, popup) {
    if (loading) {
      saveButton.textContent = 'Сохранение...'
    } else {
      saveButton.textContent = 'Сохранить'
      popup.closePopup(); 
    }
  }
  




  //Добавление новой карточки 
function handleCardFormSubmit (data) {
  renderLoadingProcess(true, saveButtonCard, popupWithFormCard)
  Promise.all([api.getUserInfo(), api.createNewCard(data)])
  .then(([userInfo, card]) => {
    cardContainer.prepend(createCard(card,userInfo));
    popupWithFormCard.closePopup();
    })
    .catch((err) => {
      console.log(err)
    })
    .finally(() => {
      renderLoadingProcess(false, saveButtonCard, popupWithFormCard)
    })
};



function handleConfirmSubmit (idCard) {
  api.deleteCard(idCard)
    .then((res) => {

      console.log('удалил')
    })
    .catch((err) => {
      console.log(err)
    })
}




//открыть попап смены аватарки
popupAvatarOpen.addEventListener('click', () => {
  avatarLinkInput.value = '';
  popupWithAvatar.openPopup();
  avatarFormValidator.resetValidation();
}); 






//изменить аватар пользователя 
function handleAvatarFormSubmit(data) {
  renderLoadingProcess(true, saveButtonAvatar, popupWithAvatar)
  api.changeUserAvatar(data)
  .then((data) => {
    profileAvatar.src = data.avatar;
  })
  .catch((err) => {
    console.log(err)
  })
  .finally(() => {
    renderLoadingProcess(false, saveButtonAvatar, popupWithAvatar)
  })
}





//Изменение данных о пользователе
function handleProfileFormSubmit (data) {
  renderLoadingProcess(true, saveButtonProfile, popupWithFormProfile)
     api.changeUserInfo(data)
     .then((data) => {
       profileName.textContent = data.name;
       profileJob.textContent = data.about;
     })
     
     .catch((err) => {
      console.log(err)
    })
    .finally(() => {
      renderLoadingProcess(false, saveButtonProfile, popupWithFormProfile)
    })
}

//Открыть popup создания карточки 
popupCardOpen.addEventListener('click', () => {
  cardNameInput.value = '';
  cardLinkInput.value = '';
  popupWithFormCard.openPopup();
  cardFormValidator.resetValidation();
}); 


//валидация форм
const profileFormValidator = new FromValidator(selectorsValidator, popupFormProfile);
const cardFormValidator = new FromValidator(selectorsValidator, popupFormCard);
const avatarFormValidator = new FromValidator(selectorsValidator,popupAvatarContainer);

avatarFormValidator.enableValidation();
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















