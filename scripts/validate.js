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
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', function () {
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


//открытие попап с валидацией
popupProfileOpen.addEventListener('click', function () {
  profileNameInput.value = profileName.textContent;
  profileJobInput.value = profileJob.textContent;
  openPopup(popupProfile);
  const popupFormProfile = document.querySelector('.popup__container_profile');
  const inputList = Array.from(popupFormProfile.querySelectorAll('.popup__field'));
  inputList.forEach((popupInput) => {
    checkInputValidity(popupFormProfile, popupInput);
  });
});






