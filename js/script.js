let popup = document.querySelector ('.popup');
let buttonEdit = document.querySelector ('.profile__button_type_edit');

let nameInput = document.querySelector('.popup__input_type_name');
let jobInput = document.querySelector('.popup__input_type_job');

let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__job');

function openPopup () {
    popup.classList.add ('popup_opened');
    
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
}
buttonEdit.addEventListener ('click', openPopup);

let buttonClose = document.querySelector ('.popup__button_type_close');
function closePopup () {
    popup.classList.remove ('popup_opened');
}
buttonClose.addEventListener ('click', closePopup);

// Находим форму в DOM
let formElement = document.querySelector('.popup__container');

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler (evt) {
    evt.preventDefault();
       
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    
    popup.classList.remove ('popup_opened');
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler); 