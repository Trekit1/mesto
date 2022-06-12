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

const popupWithAvatar = new PopupWithForm(popupAvatarSelector, handleAvatarFormSubmit)

const popupWithConfirm = new PopupWithConfirm(popupConfirmSelector)



//информация о пользователе
const userData = new UserInfo({
  nameElement: profileName,
  jobElement: profileJob,
  userAvatar: userAvatar,
});

//слушатели попапов
popupWithFormProfile.setEventListeners();
popupWithFormCard.setEventListeners();
popupWithPhoto.setEventListeners();
popupWithAvatar.setEventListeners();
popupWithConfirm.setEventListeners();



let cardList
let userInfo



//функция создания карточки
function createCard(item, userInfo) {
  const card = new Card(item, "#template", (name,link) => {popupWithPhoto.openPopup(name, link)}, userInfo, () => {popupWithConfirm.openPopup()}, handleDeleteCard, handleLikeCard,handleDislikeCard);
  const cardElement = card.createCard();
  return cardElement
}; 



//отрисовка карточек
Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([data, cards]) => {
    userInfo = data;
     //установка данных пользователя
    userData.setUserInfo(userInfo);
      //отрисовка карточек
    cardList = new Section({
      data: cards,
      renderer: (item) => {
        cardList.addItem(createCard(item, data));
      }
    }, cardListSelector);
    cardList.renderItems(cards);
  })
  .catch((err) => {
    console.log(err)
  })


  //лайк карточки
  function handleLikeCard(item) {
    api.likeCard(item._cardId)
    .then((data) => {
      item.likeButtonOn(data);
    })
    .catch((err) => {
      console.log(err)
    })
  }
  
//дислайк карточки 
  function handleDislikeCard(item) {
    api.dislikeCard(item._cardId)
    .then((data) => {
      item.likeButtonOff(data);
    })
    .catch((err) => {
      console.log(err)
    })
  }


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
  api.createNewCard(data)
  .then((card) => {
    cardList.addNewItem(createCard(card,userInfo));
    popupWithFormCard.closePopup();
    })
    .catch((err) => {
      console.log(err)
    })
    .finally(() => {
      renderLoadingProcess(false, saveButtonCard, popupWithFormCard)
    })
};



//удаление карточки 
const handleDeleteCard = (item) => {
  popupWithConfirm.setHandleFormSubmit( () => {
    api.deleteCard(item._cardId)
    .then(() => {
      item.deleteCard();
    })
    .then(() =>{
      popupWithConfirm.closePopup();
    })
    .catch((err) => {
      console.log(err)
    })

  });
  popupWithConfirm.openPopup();
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
    userData.changeUserAvatar(data);
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
      userData.changeUserInfo(data);
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















