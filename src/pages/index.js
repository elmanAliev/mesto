import './index.css';

import { initialCards } from "../utils/cards.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithConfirm from "../components/PopupWithConfirm.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import {
    nameInput,
    jobInput,
    formEdit,
    formAdd,
    formsaveAvatar,
    buttonAdd,
    buttonEdit,
    buttonCreate,
    validationConfig,
    buttonEditAvatar,
    buttonSaveAvatar,
    buttonSaveInfo,
} from "../utils/constants.js";


//----------------------------------------------------------------------------------
// создаем экземпляр API
const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-35',
    headers: {
      authorization: '38cb0870-aa41-456b-9f9f-084af1a40bb1',
      'Content-Type': 'application/json',
    },
});

// создаем для каждой формы свой валидатор
const addCardFormValidator = new FormValidator (validationConfig, formAdd);
const editProfileFormValidator = new FormValidator (validationConfig, formEdit);
const saveAvatarFormValidator = new FormValidator (validationConfig, formsaveAvatar);

// для форм вызываем метод включающий валидацию
addCardFormValidator.enableValidation();
editProfileFormValidator.enableValidation();
saveAvatarFormValidator.enableValidation();

// создаем для каждого попапа свой экземпляр класса PopupWithForm
const addCardPopup = new PopupWithForm ('.popup_type_add', submitAddCardForm);
const editProfilePopup = new PopupWithForm ('.popup_type_edit', submitEditProfileForm);
const editAvatarPopup = new PopupWithForm ('.popup_type_avatar', submitEditAvatarForm);

const confirmPopup = new PopupWithConfirm ('.popup_type_confirm', submitDeleteCard);

// создаем экземпляр класса PopupWithImage
const scaleImagePopup = new PopupWithImage ('.popup_type_img');

// создаем экземпляр класса UserInfo
const userInfo = new UserInfo ({nameSelector: '.profile__name', jobSelector: '.profile__job', avatarSelector: '.profile__image'});


//----------------------------------------------------------------------------------
// лайк карточке 
function likeCard(card) {
    if(!card.getIsLike()) {
        api.putLikeCard(card.getCardID())
        .then((res) => {
            card.handleLikeImg(res)
        })
        .catch((err) => {
            console.log(`Невозможно поставить лайк карточке ${err}`);
        });
    } else {
        api.deleteLikeCard(card.getCardID())
        .then((res) => {
            card.handleLikeImg(res)
        })
        .catch((err) => {
            console.log(`Невозможно убрать лайк у карточки ${err}`);
        });
    }
    
}

// открытие попапа "подтверждение"
function confirmCardDelete(card) {
    confirmPopup.open(card);
}

// функция создания новой карточки
function createCard(card) {
    const newCard = new Card (
        card, '#element', 
        scaleImagePopup.open, 
        userInfo.getUserID(), 
        (card) => { confirmCardDelete(card) }, 
        (card) => { likeCard(card) },
    );
    return newCard.generateCard();
}

// создаем пустой контейнер
const cardSection = new Section({
    items: [],
    renderer: (item) => {
      cardSection.addItem(createCard(item));
    }
}, '.elements');
cardSection.renderItems();

//добавление новой карточки
function submitAddCardForm(inputValues) {
    const card = {                  // создаем из вводимых данных объект, потому что объект принимается ф-цией создания карточки как аргумент 
        name: inputValues.place,
        link: inputValues.url,
    };
    buttonCreate.textContent = 'Создание...';
    api.postNewCard(card)
        .then((card) => {
            cardSection.addItem(createCard(card));
            buttonCreate.textContent = 'Создать';
        })
        .catch((err) => {
            console.log(`Невозможно добавить карточку ${err}`);
        });
    addCardPopup.close();
}

// удаление карточки
function submitDeleteCard(card) {
    api.deleteCard(card.getCardID())
        .then(() => card.removeCard())
        .catch((err) => {
            console.log(`Невозможно удалить карточку ${err}`);
        });
    confirmPopup.close();
} 


//----------------------------------------------------------------------------------
// получение информации о пользователе и карточек с сервера
api.getUserInfo()
    .then((res) => {
        userInfo.setUserInfo({
            name: res.name,
            job: res.about,
            avatar: res.avatar
        });
        userInfo.setUserID(res._id);
    })
    .catch((err) => {
        console.log(`Невозможно получить информацию о пользователе ${err}`);
    })
    .finally(() => {
        api.getInitialCards()
            .then((res) => {
                res.forEach(obj => cardSection.addItem(createCard(obj)));
            })
            .catch((err) => {
                console.log(`Невозможно отобразить карточки с сервера ${err}`);
            })
    })
       
    

// редактирование информации о пользователе
function submitEditProfileForm (inputValues) {
    buttonSaveInfo.textContent = 'Сохранение...'
    api.patchUserInfo(inputValues)
        .then((res) => {
            userInfo.setUserInfo ({
                name: res.name,
                job: res.about,
                avatar: res.avatar,
            });
            buttonSaveInfo.textContent = 'Сохранить';
            editProfilePopup.close();
        })
        .catch((err) => {
            console.log(`Невозможно изменить информацию о пользователе ${err}`);
        });
}

// изменения аватара
function submitEditAvatarForm (inputValues) {
    buttonSaveAvatar.textContent = 'Сохранение...'
    api.patchAvatar(inputValues.url)
        .then((res) => {
            userInfo.setUserInfo ({
                name: res.name,
                job: res.about,
                avatar: res.avatar,
            });
            buttonSaveAvatar.textContent = 'Сохранить'
            editAvatarPopup.close();
        })
        .catch((err) => {
            console.log(`Невозможно загрузить аватар на сервер ${err}`);
        });
}


//----------------------------------------------------------------------------------
// СЛУШАТЕЛИ
buttonAdd.addEventListener ('click', function() {
    addCardFormValidator.removeErrors(); // вызываем метод удаления ошибок 
    addCardPopup.open();    
});

buttonEdit.addEventListener ('click', function() {
    editProfileFormValidator.removeErrors();    // вызываем метод удаления ошибок 
    
    // данные пользователя записываем в форму при открытии
    const {name, job} = userInfo.getUserInfo();
    nameInput.value = name;
    jobInput.value = job;
    
    editProfilePopup.open();  
});

buttonEditAvatar.addEventListener ('click', function() {
    saveAvatarFormValidator.removeErrors(); // вызываем метод удаления ошибок 
    editAvatarPopup.open();    
});

// для каждого попапа вызываем слушатели
addCardPopup.setEventListeners();
editProfilePopup.setEventListeners();
scaleImagePopup.setEventListeners();
editAvatarPopup.setEventListeners();
confirmPopup.setEventListeners();
//----------------------------------------------------------------------------------