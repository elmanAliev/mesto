import { initialCards } from "../utils/cards.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
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

// создаем экземпляр класса PopupWithImage
const scaleImagePopup = new PopupWithImage (popupTypeImg);

// создаем экземпляр класса UserInfo
const addUserInfo = new UserInfo ({nameSelector: '.profile__name', jobSelector: '.profile__job'});


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


// ф-ция добавления новой карточки
function submitAddCardForm() {
    const card = {                  // создаем из вводимых данных объект, потому что объект принимается ф-цией создания карточки как аргумент 
        name: placeInput.value,
        link: urlInput.value,
    };
    
    const cardFromPopup = new Card (card, '#element', scaleImagePopup.open);
    const cardElement = cardFromPopup.generateCard();
    cardSection.addItem(cardElement);
    
    addCardPopup.close();
}

// ф-ция редактирования информации
function submitEditProfileForm (inputValues) {
    addUserInfo.setUserInfo (inputValues); // добавляем данные пользователя на страницу

    editProfilePopup.close();
}


// СЛУШАТЕЛИ
buttonAdd.addEventListener ('click', function() {
    buttonCreate.classList.add ('main-button_inactive');
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