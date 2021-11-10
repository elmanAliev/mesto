let popup = document.querySelector ('.popup');

let buttonEdit = document.querySelector ('.profile__button_type_edit');
buttonEdit.addEventListener ('click', openPopup);
function openPopup () {
    popup.classList.add ('popup_opened');
}

let buttonClose = document.querySelector ('.popup__button_type_close');
buttonClose.addEventListener ('click', closePopup);
function closePopup () {
    popup.classList.remove ('popup_opened');
}



// Находим форму в DOM
let formElement = document.querySelector('.popup__container');

let nameInput = document.querySelector('.popup__name');
let jobInput = document.querySelector('.popup__job');

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler (evt) {
    evt.preventDefault();
    
    let profileName = document.querySelector('.profile__name');
    let profileJob = document.querySelector('.profile__job');
    
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    
    popup.classList.remove ('popup_opened');
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler); 