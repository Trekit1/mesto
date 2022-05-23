export default class FromValidator {
    constructor (selectors, formElement) {
        this._selectors = selectors;
        this._formElement = formElement;
        this._inputList = Array.from(this._formElement.querySelectorAll(this._selectors.inputSelector));
        this._buttonElement = this._formElement.querySelector(this._selectors.submitButtonSelector);
    }

    _showError = (inputElement, errorMessage) => {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(this._selectors.inputErrorClass);
        errorElement.classList.add(this._selectors.errorClass);
        errorElement.textContent = errorMessage;
      };
      
      
    _hideError = (inputElement) => {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(this._selectors.inputErrorClass);
        errorElement.classList.remove(this._selectors.errorClass);
        errorElement.textContent = " ";
      };

    _checkInputValidity = (inputElement) => {
        if (!inputElement.validity.valid) {
          this._showError(inputElement,inputElement.validationMessage);
        } else {
          this._hideError(inputElement);
        }
      };

    _setEventListeners = () => {
        this._inputList.forEach((inputElement) => {
          inputElement.addEventListener('input', () => {
            this._toggleButtonState();  
            this._checkInputValidity(inputElement);
        });
      }); 
      };

    _hasInvalidInput = () => {
    return this._inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    }); 
    }
      
    _toggleButtonState = () => {
        if (this._hasInvalidInput()) {
        this._buttonElement.classList.add(this._selectors.inactiveButtonClass);
        this._buttonElement.disabled = true;
        } else {
        this._buttonElement.classList.remove(this._selectors.inactiveButtonClass);
        this._buttonElement.disabled = false;
        } 
        }

    enableValidation = () => {
        this._formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        this._setEventListeners();
    };

    resetValidation() {
      this._toggleButtonState();

      this._inputList.forEach((inputElement) => {
        this._hideError(inputElement)
      });
    };
}










