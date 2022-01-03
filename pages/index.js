import { initialCards } from "../utils/cards.js";
import {Card} from "../components/Card.js";
import {FormValidator} from "../components/FormValidator.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import Section from "../components/Section.js";
import {
    popupEdit,
    popupAdd,
    popupTypeImg,
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
} from "../utils/constants.js";


// создаем для каждой формы свой валидатор
const addCardFormValidator = new FormValidator (validationConfig, formAdd);
const editProfileFormValidator = new FormValidator (validationConfig, formEdit);

// для форм вызываем метод включающий валидацию
addCardFormValidator.enableValidation();
editProfileFormValidator.enableValidation();

// создаем для каждого попапа свой экземпляр класса PopupWithForm
const addCardPopup = new PopupWithForm (popupAdd, submitAddCardForm);
const editProfilePopup = new PopupWithForm (popupEdit, submitEditProfileForm);

const scaleImagePopup = new PopupWithImage (popupTypeImg);



function submitAddCardForm(evt) {
    evt.preventDefault();

    const card = [{                  // создаем из вводимых данных объект, потому что объект принимается ф-цией создания карточки как аргумент 
        name: placeInput.value,
        link: urlInput.value,
    }];
    // const cardElement = createCard(card).generateCard();
    // addCardToDOM(cardElement); // для созданного объекта вызываем ф-цию создания карточки, затем функцию добавления карточки
    
    
    const newCard = new Section({
        items: card,
        renderer: (item) => {
          const cardFromPopup = new Card (item, '#element', scaleImagePopup.open);
          const cardElement = cardFromPopup.generateCard();
          cardSection.addItem(cardElement);
        }
    }, '.elements');

    newCard.renderItems();


    addCardPopup.close();   //закрываем попап
}

function submitEditProfileForm (evt) {
    evt.preventDefault();
    
    
    profileName.textContent = nameInput.value;  // в текстовое значение profileName и profileJob записываются
    profileJob.textContent = jobInput.value;    // значения из полей ввода nameInput и jobInput
    
    editProfilePopup.close();   //закрываем попап
}


//карточки из массива
const cardSection = new Section({
    items: initialCards,
    renderer: (item) => {
      const cardFromArray = new Card (item, '#element', scaleImagePopup.open);
      const cardElement = cardFromArray.generateCard();
      cardSection.addItem(cardElement);
    }
}, '.elements');

cardSection.renderItems();



// СЛУШАТЕЛИ
// на кнопку buttonAdd ставим слушатель (при клике - запуск ф-ции openPopup)
buttonAdd.addEventListener ('click', function() {
    formAdd.reset();
    buttonCreate.classList.add ('main-button_inactive');
    addCardFormValidator.removeErrors(); // вызываем метод удаления ошибок 
    addCardPopup.open();
});
// на кнопку buttonEdit ставим слушатель (при клике - запуск ф-ции openPopup)
buttonEdit.addEventListener ('click', function() {
    
    editProfileFormValidator.removeErrors();    // вызываем метод удаления ошибок 
    nameInput.value = profileName.textContent;  // при клике на кнопку в значения полей ввода помещаем 
    jobInput.value = profileJob.textContent;    // текстовые значения нах-ся в profileName и profileJob
    editProfilePopup.open();  
}); 









// // ф-ция добавления карточки
// function addCardToDOM(card) {
//     elements.prepend(card);
// }

// // ф-ция создания карточки
// function createCard(card) {
//     const newCard = new Card (card, '#element', handleCardClick);
//     return newCard;
// }

// //карточки из массива
// const renderElements = () => {
//     initialCards.forEach (function (item) {
        
//         const cardElement = createCard(item).generateCard();
//         addCardToDOM(cardElement); // для каждого эл-та массива вызываем ф-цию создания карточки, затем функцию добавления карточки
//     });
// };
// renderElements();




