import { initialCards } from "./cards.js";
import {openPopup, closePopup} from "./utils.js";
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
    validationConfig,
} from "./constants.js";


// создаем для каждой формы свой валидатор
const addCardFormValidator = new FormValidator (validationConfig, formAdd);
const editProfileFormValidator = new FormValidator (validationConfig, formEdit);

// для форм вызываем пбличный метод включающий валидацию
addCardFormValidator.enableValidation();
editProfileFormValidator.enableValidation();

// ф-ция добавления карточки
function addCardToDOM(card) {
    elements.prepend(card);
}

// ф-ция создания карточки
function createCard(card) {
    const newCard = new Card (card);
    return newCard;
}

//карточки из массива
const renderElements = () => {
    initialCards.forEach (function (item) {
        
        const cardElement = createCard(item).generateCard();
        addCardToDOM(cardElement); // для каждого эл-та массива вызываем ф-цию создания карточки, затем функцию добавления карточки
    });
};
renderElements();

//карточка из попапа
function submitAddCardForm(evt) {
    evt.preventDefault();

    const card = {                  // создаем из вводимых данных объект, потому что объект принимается ф-цией создания карточки как аргумент 
        name: placeInput.value,
        link: urlInput.value,
    };
    const cardElement = createCard(card).generateCard();
    addCardToDOM(cardElement); // для созданного объекта вызываем ф-цию создания карточки, затем функцию добавления карточки
    
    closePopup(popupAdd);   // чтобы попап закрылся, после нажатия на СОХРАНИТЬ, удаляем у него класс popup_opened
}

// редактирование профиля
function submitEditProfileForm (evt) {
    evt.preventDefault();
       
    profileName.textContent = nameInput.value;  // в текстовое значение profileName и profileJob записываются
    profileJob.textContent = jobInput.value;    // значения из полей ввода nameInput и jobInput
    
    closePopup(popupEdit);    // после нажатия на СОХРАНИТЬ, закрываем попап
}


// СЛУШАТЕЛИ
// на кнопку buttonEdit ставим слушатель (при клике - запуск ф-ции openPopup)
buttonEdit.addEventListener ('click', function() {
    
    editProfileFormValidator.removeErrors();    // вызываем метод удаления ошибок 
    nameInput.value = profileName.textContent;  // при клике на кнопку в значения полей ввода помещаем 
    jobInput.value = profileJob.textContent;    // текстовые значения нах-ся в profileName и profileJob
    openPopup(popupEdit);    
}); 

// на кнопку buttonAdd ставим слушатель (при клике - запуск ф-ции openPopup)
buttonAdd.addEventListener ('click', function() {
    formAdd.reset();
    buttonCreate.classList.add ('main-button_inactive');
    addCardFormValidator.removeErrors(); // вызываем метод удаления ошибок 
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
formEdit.addEventListener('submit', submitEditProfileForm); 

// на кнопку buttonCreate ставим слушатель
formAdd.addEventListener('submit', submitAddCardForm);