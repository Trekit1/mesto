import Popup from "./Popup.js";


export default class PopupWithConfirm  extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._form = this._popup.querySelector('.popup__container');
     
    }

    setHandleFormSubmit (handleFormSubmit) {
        this._handleFormSubmit = handleFormSubmit;
    }


    setEventListeners() {
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault(); 
            this._handleFormSubmit();
        });

        super.setEventListeners();
    }
}