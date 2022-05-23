export default class Card {
    constructor(data , cardSelector, handleCardClick) {
        this._name = data.name; 
        this._link = data.link;
        this._cardSelector = cardSelector;
        this._element = this._templateCard();
        this._CardLikeButton = this._element.querySelector('.card__like-button');
        this._handleCardClick = handleCardClick;
    }

    _templateCard() {
        const cardElement = document.querySelector(this._cardSelector).content
        .querySelector('.card')
        .cloneNode(true);
        return cardElement;
    }

    createCard() {
        this._element.querySelector('.card__title').textContent = this._name;
        const cardImage = this._element.querySelector('.card__image');
        cardImage.src = this._link;
        cardImage.alt = this._name;
        this._setEventListeners();
        return this._element
    }

    _setEventListeners() {
        this._CardLikeButton.addEventListener('click', () => {
            this._likeButton();
        })

        this._element.querySelector('.card__delete-button').addEventListener('click', () => {
            this._deleteCard();
        })

        this._element.querySelector('.card__image').addEventListener('click', () => {
            this._handleCardClick(this._name, this._link);
        })
    }

    _likeButton() {
        this._CardLikeButton.classList.toggle('card__like-button_active');
    }

    _deleteCard() {
        this._element.remove();
        this._element = null;
    }
}







