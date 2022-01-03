import { initialCards } from "../utils/cards.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
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

// для каждого попапа вызываем слушатели
addCardPopup.setEventListeners();
editProfilePopup.setEventListeners();


const scaleImagePopup = new PopupWithImage (popupTypeImg);


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

function submitEditProfileForm () {
    profileName.textContent = nameInput.value;  // в текстовое значение profileName и profileJob записываются
    profileJob.textContent = jobInput.value;    // значения из полей ввода nameInput и jobInput
    
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
    nameInput.value = profileName.textContent;  // в значения полей ввода помещаем 
    jobInput.value = profileJob.textContent;    // текстовые значения нах-ся в profileName и profileJob
    editProfilePopup.open();  
}); 