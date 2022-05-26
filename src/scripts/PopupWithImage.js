import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._popupPhotoImage = this._popup.querySelector('.popup__photo-image');
        this._popupPhotoName = this._popup.querySelector('.popup__photo-name');
    }
    openPopup(name, link) {
        this._popupPhotoName.textContent = name;
        this._popupPhotoImage.src = link;
        this._popupPhotoImage.alt = name;
        super.openPopup();
    }
}