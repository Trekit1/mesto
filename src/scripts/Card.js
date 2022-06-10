export default class Card {
    constructor(data , cardSelector, handleCardClick, userInfo, handleOpenConfirm, habdleDeleteCard, handleLikeCard, handleDislikeCard) {
        this._userId = userInfo._id;
        this._createrCardId = data.owner._id;
        this._cardId = data._id;
        this._name = data.name; 
        this._link = data.link;
        this._likes = data.likes;
        this._cardSelector = cardSelector;
        this._element = this._templateCard();
        this._handleCardClick = handleCardClick;
        this._handleOpenConfirm = handleOpenConfirm;
        this._handleDeleteCard = habdleDeleteCard;
        this._handleLikeCard = handleLikeCard;
        this._handleDislikeCard = handleDislikeCard;
        this._cardLikeButton = this._element.querySelector('.card__like-button');
        this._cardDeleteButton = this._element.querySelector('.card__delete-button');
        this._likeNumber = this._element.querySelector('.card__likes')
        this._cardLikeContainer = this._element.querySelector('.card__like-container')
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
        if (this._createrCardId === this._userId) {
            this._cardDeleteButton.classList.add('card__delete-button_active')
        }
        this._element.querySelector('.card__likes').textContent = this._likes.length;

        if(this.isLiked()) {
            this._cardLikeButton.classList.add('card__like-button_active');
        }

        this._setEventListeners();
        return this._element
    }

    isLiked() {
        return Boolean(this._likes.find(item => item._id === this._userId))
    };
    
   

    _setEventListeners() {
        this._cardLikeButton.addEventListener('click', () => {
            this._likeButton();
        })

        this._cardDeleteButton.addEventListener('click', () => {
            this._handleDeleteCard(this);
        })

        this._element.querySelector('.card__image').addEventListener('click', () => {
            this._handleCardClick(this._name, this._link);
        })
    }

   
   


    _likeButton() {
        if (this.isLiked()) {
            this._handleDislikeCard(this._cardId, this._element);
            this._cardLikeButton.classList.remove('card__like-button_active');
           
        }  else {
            this._handleLikeCard(this._cardId, this._element);
            this._cardLikeButton.classList.add('card__like-button_active');
        }
    }

    _deleteCard() {
        this._element.remove();
        this._element = null;
    }
}







