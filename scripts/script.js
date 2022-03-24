const popup = document.querySelector('.popup');
const openPopup = document.querySelector('.profile__edit-button');
const closePopup = document.querySelector('.popup__close-button');
const profileName = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__subtitle");
 
openPopup.addEventListener('click', function() {
    popup.classList.add('popup_opened');
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
})

function closeProfilePopup() {
    popup.classList.remove('popup_opened');
}

closePopup.addEventListener('click',closeProfilePopup);

const formElement = document.querySelector('.popup__container');
const nameInput = formElement.querySelector('.popup__field_profile_name');
const jobInput = formElement.querySelector('.popup__field_profile_job');

function formSubmitHandler (evt) {
    evt.preventDefault(); 
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closeProfilePopup();
}
formElement.addEventListener('submit', formSubmitHandler);