const popup = document.querySelector('.popup');
const popupEdit = document.querySelector('.popup__edit')
const openPopupEdit = document.querySelector('.profile__edit-button');
const closePopupEdit = popupEdit.querySelector('.popup__close-button');
const profileName = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__subtitle");
 
function openPopup(popup) {
    popup.classList.add('popup_opened');
}


openPopupEdit.addEventListener('click', function() {
    openPopup(popupEdit);
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
})


function closePopup(popup) {
    popup.classList.remove('popup_opened');
}

closePopupEdit.addEventListener('click', () => closePopup(popupEdit));

const formElement = document.querySelector('.popup__container');
const nameInput = formElement.querySelector('.popup__field_profile_name');
const jobInput = formElement.querySelector('.popup__field_profile_job');

function formSubmitHandler (evt) {
    evt.preventDefault(); 
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closePopup(popupEdit);
}

formElement.addEventListener('submit', formSubmitHandler);


const popupAdd = document.querySelector('.popup__add')
const openPopupAdd = document.querySelector('.profile__add-button');
const closePopupAdd = popupAdd.querySelector('.popup__close-button');
 
openPopupAdd.addEventListener('click', function() {
    openPopup(popupAdd);
})

closePopupAdd.addEventListener('click', () => closePopup(popupAdd));










