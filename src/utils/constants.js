export {
    popupEdit,
    popupAdd,
    popupTypeImg,
    popupConfirm,
    popupAvatar,
    elements,
    nameInput,
    jobInput,
    placeInput,
    urlInput,
    profileName,
    profileJob,
    popupImg,
    popupImgText,
    formEdit,
    formAdd,
    buttonSaveInfo,
    formsaveAvatar,
    buttonAdd,
    buttonEdit,
    buttonCreate,
    buttonSaveAvatar,
    buttonConfirm,
    buttonEditAvatar,
    validationConfig,
};

const popupEdit = document.querySelector ('.popup_type_edit'); // попап "редактирование"
const popupAdd = document.querySelector ('.popup_type_add');  // попап "добавление"
const popupTypeImg = document.querySelector ('.popup_type_img');  // попап "увеличенная картинка"
const popupConfirm = document.querySelector ('.popup_type_confirm'); // попап "подтверждение"
const popupAvatar = document.querySelector ('.popup_type_avatar'); // попап "подтверждение"

const elements = document.querySelector('.elements'); // контейнер

const nameInput = document.querySelector('.popup__input_type_name');    // поле ввода "редактирование"
const jobInput = document.querySelector('.popup__input_type_job');      // поле ввода "редактирование"

const placeInput = document.querySelector('.popup__input_type_place');  // поле ввода "добавление"
const urlInput = document.querySelector('.popup__input_type_url');      // поле ввода "добавление"

const profileName = document.querySelector('.profile__name'); // тег с классом profile__name
const profileJob = document.querySelector('.profile__job');  // тег с классом profile__job

const popupImg = popupTypeImg.querySelector ('.popup__img'); // увеличенная картинка попапа
const popupImgText = popupTypeImg.querySelector ('.popup__img-text'); // подпись к картинке

const formEdit = document.querySelector('#form-edit');  // форма редактирования профиля
const formAdd = document.querySelector('#form-add');  //  форма добавления карточки
const formsaveAvatar = document.querySelector('#form-save-avatar');  //  форма добавления карточки

const buttonAdd = document.querySelector ('.profile__button_type_add');  
const buttonEdit = document.querySelector ('.profile__button_type_edit'); 
const buttonCreate = document.querySelector ('.popup__button_type_create');
const buttonSaveInfo = document.querySelector ('.popup__button_type_save');
const buttonSaveAvatar = document.querySelector ('.popup__button_type_save-avatar');
const buttonConfirm = document.querySelector ('.popup__button_type_confirm');
const buttonEditAvatar = document.querySelector ('.profile__image');


const validationConfig = {
    inputSelector: '.popup__input',
    submitButtonSelector: '.main-button',
    inactiveButtonClass: 'main-button_inactive',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active'
}