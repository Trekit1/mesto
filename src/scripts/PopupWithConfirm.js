import Popup from "./Popup.js";


export default class PopupWithConfirm  extends Popup {
    constructor(popupSelector, handleFormSubmit) {
        super(popupSelector);
        this._form = this._popup.querySelector('.popup__container');
        this._handleFormSubmit = handleFormSubmit;
        
    }


    setEventListeners() {
        super.setEventListeners();

        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault(); 
            this._handleFormSubmit();
        });
    }

    openPopup() {
        super.openPopup();
    }

    closePopup() {
        super.closePopup();
    }

}