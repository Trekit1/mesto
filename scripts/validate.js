const showError = (formElement,inputElement, errorMessage, inputErrorClass, errorClass) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass)
};


const hideError = (formElement,inputElement, inputErrorClass, errorClass) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = " ";
};

const checkInputValidity = (formElement, inputElement, inputErrorClass, errorClass) => {
  if (!inputElement.validity.valid) {
    showError(formElement,inputElement, inputElement.validationMessage, inputErrorClass, errorClass);
  } else {
    hideError(formElement,inputElement, inputErrorClass, errorClass);
  }
};

const setEventListeners = (formElement, {inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass}) => {
    const inputList = Array.from(formElement.querySelectorAll(inputSelector));
    const buttonElement = formElement.querySelector(submitButtonSelector);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', function () {
        toggleButtonState (inputList, buttonElement, inactiveButtonClass);
        checkInputValidity(formElement, inputElement, inputErrorClass, errorClass);
    });
  }); 
  };


const enableValidation = ({formSelector, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass}) => {
    const formList = Array.from(document.querySelectorAll(formSelector)); 
      formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
    });

        setEventListeners(formElement, {inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass});
    }); 
    };     

    enableValidation({
      formSelector: '.popup__container',
      inputSelector: '.popup__field',
      submitButtonSelector: '.popup__save-button',
      inactiveButtonClass: 'popup__save-button_disable',
      inputErrorClass: 'popup__field_type_error',
      errorClass: 'popup__error-text_active'
    }); 

//disable кнопки "сохранить"
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
   return !inputElement.validity.valid;
 }); 
 }

 function toggleButtonState (inputList, buttonElement, inactiveButtonClass)  {
  if (hasInvalidInput(inputList)) {
  buttonElement.classList.add(inactiveButtonClass);
  buttonElement.disabled = true;
} else {
  buttonElement.classList.remove(inactiveButtonClass);
  buttonElement.disabled = false;
} 
}










