import './index.css';

import { initialCards } from "../utils/cards.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import {
    nameInput,
    jobInput,
    formEdit,
    formAdd,
    buttonAdd,
    buttonEdit,
    validationConfig,
} from "../utils/constants.js";

console.log(buttonAdd)


// создаем для каждой формы свой валидатор
const addCardFormValidator = new FormValidator (validationConfig, formAdd);
const editProfileFormValidator = new FormValidator (validationConfig, formEdit);

// для форм вызываем метод включающий валидацию
addCardFormValidator.enableValidation();
editProfileFormValidator.enableValidation();


// создаем для каждого попапа свой экземпляр класса PopupWithForm
const addCardPopup = new PopupWithForm ('.popup_type_add', submitAddCardForm);
const editProfilePopup = new PopupWithForm ('.popup_type_edit', submitEditProfileForm);

// создаем экземпляр класса PopupWithImage
const scaleImagePopup = new PopupWithImage ('.popup_type_img');

// создаем экземпляр класса UserInfo
const addUserInfo = new UserInfo ({nameSelector: '.profile__name', jobSelector: '.profile__job'});


// функция создания новой карточки
function createCard(card) {
    const cardFromArray = new Card (card, '#element', scaleImagePopup.open);
    return cardFromArray.generateCard();
}


//карточки из массива
const cardSection = new Section({
    items: initialCards,
    renderer: (item) => {
      cardSection.addItem(createCard(item));
    }
}, '.elements');

cardSection.renderItems();


// ф-ция добавления новой карточки
function submitAddCardForm(inputValues) {
    const card = {                  // создаем из вводимых данных объект, потому что объект принимается ф-цией создания карточки как аргумент 
        name: inputValues.place,
        link: inputValues.url,
    };
    cardSection.addItem(createCard(card));
    addCardPopup.close();
}

// ф-ция редактирования информации
function submitEditProfileForm (inputValues) {
    addUserInfo.setUserInfo (inputValues); // добавляем данные пользователя на страницу
    editProfilePopup.close();
}


// СЛУШАТЕЛИ
buttonAdd.addEventListener ('click', function() {
    addCardFormValidator.removeErrors(); // вызываем метод удаления ошибок 
    addCardPopup.open();    
});

buttonEdit.addEventListener ('click', function() {
    editProfileFormValidator.removeErrors();    // вызываем метод удаления ошибок 
    
    // данные пользователя записываем в форму при открытии
    const {name, job} = addUserInfo.getUserInfo();
    nameInput.value = name;
    jobInput.value = job;
    
    editProfilePopup.open();  
}); 


// для каждого попапа вызываем слушатели
addCardPopup.setEventListeners();
editProfilePopup.setEventListeners();
scaleImagePopup.setEventListeners();