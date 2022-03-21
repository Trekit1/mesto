let popup = document.querySelector('.popup');
let openPopup = document.querySelector('.profile__edit-button');
let closePopup = document.querySelector('.popup__close-button');
let profileName = document.querySelector(".profile__title");
let profileJob = document.querySelector(".profile__subtitle");
 
openPopup.addEventListener('click', function() {
    popup.classList.add('popup_opened');
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
})

closePopup.addEventListener('click', function() {
    popup.classList.remove('popup_opened');
})

let formElement = document.querySelector('.popup__container');
let nameInput = formElement.querySelector('.popup__field_name');
let jobInput = formElement.querySelector('.popup__field_job');

function formSubmitHandler (evt) {
    evt.preventDefault(); 
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    popup.classList.remove('popup_opened');


}
formElement.addEventListener('submit', formSubmitHandler);