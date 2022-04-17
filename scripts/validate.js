const showError = (formElement,inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add('popup__field_type_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('popup__error-text_active')
};


const hideError = (formElement,inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove('popup__field_type_error');
  errorElement.classList.remove('popup__error-text_active');
  errorElement.textContent = ' ';
};

const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showError(formElement,inputElement, inputElement.validationMessage);
  } else {
    hideError(formElement,inputElement);
  }
};

const setEventListeners = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll('.popup__field'));
    const buttonElement = formElement.querySelector('.popup__save-button');
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', function () {
        toggleButtonState (inputList, buttonElement);
        checkInputValidity(formElement, inputElement);
    });
  }); 
  };


const enableValidation = () => {
    const formList = Array.from(document.querySelectorAll('.popup__container')); 
      formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
    });

        setEventListeners(formElement);
    }); 
    };     

    enableValidation()


//открытие попап Profile с валидацией
popupProfileOpen.addEventListener('click', function () {
  profileNameInput.value = profileName.textContent;
  profileJobInput.value = profileJob.textContent;
  openPopup(popupProfile);
  const popupFormProfile = document.querySelector('.popup__container_profile');
  const inputList = Array.from(popupFormProfile.querySelectorAll('.popup__field'));
  const buttonElement = popupFormProfile.querySelector('.popup__save-button');
  inputList.forEach((popupInput) => {
    toggleButtonState (inputList, buttonElement)
    checkInputValidity(popupFormProfile, popupInput);
  });
});


//disabled кнопки "сохранить"
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
   return !inputElement.validity.valid;
 }); 
 }

 function toggleButtonState (inputList, buttonElement)  {
  if (hasInvalidInput(inputList)) {
  buttonElement.classList.add('popup__save-button_disable');
  buttonElement.setAttribute("disabled", "disabled");
} else {
  buttonElement.classList.remove('popup__save-button_disable');
  buttonElement.removeAttribute("disabled", "disabled");
} 
}

//открыть попап Card с валидацией 
popupCardOpen.addEventListener('click', function () {
  openPopup(popupCard);
  const popupFormCard = document.querySelector('.popup__container_card');
  const inputList = Array.from(popupFormCard.querySelectorAll('.popup__field'));
  const buttonElement = popupFormCard.querySelector('.popup__save-button');
  inputList.forEach((popupInput) => {
    toggleButtonState (inputList, buttonElement)
  });
}); 





