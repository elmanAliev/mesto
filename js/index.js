import { initialCards } from "./cards.js";
import {openPopup} from "./utils.js";
import {closePopup} from "./utils.js";
import {Card} from "./Card.js";
import {FormValidator} from "./FormValidator.js";
import {
    popupEdit,
    popupAdd,
    elements,
    nameInput,
    jobInput,
    placeInput,
    urlInput,
    profileName,
    profileJob,
    formEdit,
    formAdd,
    buttonAdd,
    buttonEdit,
    buttonsClose,
    buttonCreate,
    popupOverlay,
} from "./utils.js";


// Для каждой формы создаем экземпляр класса FormValidator
function formsValidation (settings) {
    const formList = Array.from(document.querySelectorAll(settings.formSelector));
    formList.forEach((formElement) => {
      const form = new FormValidator (settings, formElement);
      form.enableValidation();   
    });
}
formsValidation ({
    formSelector: '.popup__container',
    inputSelector: '.popup__input',
    submitButtonSelector: '.main-button',
    inactiveButtonClass: 'main-button_inactive',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active'
}); 

//удаление ошибок валидации, возникающих при повторном открытии попапа
function removeErrors (form) {
    const spanList = Array.from(form.querySelectorAll('.popup__input-error'));
    spanList.forEach((spanElement) => {
        spanElement.textContent = "";
    });
    const inputList = Array.from(form.querySelectorAll('.popup__input'));
    inputList.forEach((inputElement) => {
        inputElement.classList.remove ('popup__input_type_error');;
    });
}


// ф-ция добавления карточки
function cardAdd(card) {
    elements.prepend(card);
}

//карточки из массива
const renderElements = () => {
    initialCards.forEach (function (item) {
        const card = new Card (item);
        const cardElement = card.generateCard();
        cardAdd(cardElement); // для каждого эл-та массива вызываем ф-цию создания карточки, затем функцию добавления карточки
    });
};
renderElements();

//карточка из попапа
function popupCard(evt) {
    evt.preventDefault();

    const card = {                  // создаем из вводимых данных объект, потому что объект принимается ф-цией создания карточки как аргумент 
        name: placeInput.value,
        link: urlInput.value,
    };
    const cardPopup = new Card (card);
    const cardElement = cardPopup.generateCard();
    cardAdd(cardElement); // для созданного объекта вызываем ф-цию создания карточки, затем функцию добавления карточки
    
    closePopup(popupAdd);   // чтобы попап закрылся, после нажатия на СОХРАНИТЬ, удаляем у него класс popup_opened
}

// редактирование профиля
function formSubmitHandler (evt) {
    evt.preventDefault();
       
    profileName.textContent = nameInput.value;  // в текстовое значение profileName и profileJob записываются
    profileJob.textContent = jobInput.value;    // значения из полей ввода nameInput и jobInput
    
    closePopup(popupEdit);    // после нажатия на СОХРАНИТЬ, закрываем попап
}


// СЛУШАТЕЛИ
// на кнопку buttonEdit ставим слушатель (при клике - запуск ф-ции openPopup)
buttonEdit.addEventListener ('click', function() {
    openPopup (popupEdit);  // в аргументе передаем тип попапа
    removeErrors(formEdit);
    nameInput.value = profileName.textContent;  // при клике на кнопку в значения полей ввода помещаем 
    jobInput.value = profileJob.textContent;    // текстовые значения нах-ся в profileName и profileJob    
}); 

// на кнопку buttonAdd ставим слушатель (при клике - запуск ф-ции openPopup)
buttonAdd.addEventListener ('click', function() {
    formAdd.reset();
    buttonCreate.classList.add ('main-button_inactive');
    removeErrors(formAdd);
    openPopup(popupAdd);
});

// на все кнопки buttonClose ставим слушатель (при клике - запуск ф-ции closePopup)
buttonsClose.forEach((item) => {
    item.addEventListener ('click', function(evt) {
        const popup = evt.target.closest('.popup')
        closePopup(popup);
    });
});

// (при клике на overlay - запуск ф-ции closePopup)
popupOverlay.forEach((item) => {
    item.addEventListener ('click', function(evt) {
        const popup = evt.target.closest('.popup')
        closePopup(popup);
    });
});

// Прикрепляем обработчик к форме: он будет следить за событием “submit” - «отправка»
formEdit.addEventListener('submit', formSubmitHandler); 

// на кнопку buttonCreate ставим слушатель
formAdd.addEventListener('submit', popupCard);