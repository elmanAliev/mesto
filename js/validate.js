// ф показа ошибки (конкретную форму, конкретное поле, текст ошибки)
const showInputError = (formElement, inputElement, errorMessage, inputErrorClass, errorClass) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`); // получаем span (Находим элемент ошибки внутри самой функции)
    inputElement.classList.add(inputErrorClass); // добавляем полю класс (стили невалидного поля)
    errorElement.textContent = errorMessage; // в span добавляем текст ошибки
    errorElement.classList.add(errorClass); // показваем span
};


// ф скрытия ошибки (конкретную форму, конкретное поле)
const hideInputError = (formElement, inputElement, inputErrorClass, errorClass) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);  // получаем span (Находим элемент ошибки внутри самой функции)
    inputElement.classList.remove(inputErrorClass); // удаляем у поля класс (стили невалидного поля)
    errorElement.classList.remove(errorClass); // скрываем span
    errorElement.textContent = ''; // в span добавляем пустую строку
};
  
// ф проверки на валидность (конкретную форму, конкретное поле)
const checkInputValidity = (formElement, inputElement, inputErrorClass, errorClass) => {
  if (!inputElement.validity.valid) {
    // если поле не проходит валидацию, вызываем ф-цию показа ошибки
    // inputElement.validationMessage - это сообщение об ошибке конкретного поля
    showInputError(formElement, inputElement, inputElement.validationMessage, inputErrorClass, errorClass);
  } else {
    // если проходит валидацию, вызываем ф-цию скрытия ошибки
    hideInputError(formElement, inputElement, inputErrorClass, errorClass);
  }
};


// добавляем слушатель всем полям ввода внутри конкретной формы (formElement)
const setEventListeners = (formElement, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass) => {
  // Находим все поля внутри формы, сделаем из них массив методом Array.from
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  // находим кнопку submit в форме
  const buttonElement = formElement.querySelector(submitButtonSelector);
  // Вызовем toggleButtonState, чтобы не ждать ввода данных в поля (чтобы до начала ввода данных она была не активна.)
  toggleButtonState(inputList, buttonElement, inactiveButtonClass);
  
  // Обойдём все элементы полученной коллекции
  inputList.forEach((inputElement) => {
    // каждому полю добавим обработчик события input
    inputElement.addEventListener('input', function () {
      // Внутри колбэка вызовем checkInputValidity, передав ей форму и проверяемый элемент
      checkInputValidity(formElement, inputElement, inputErrorClass, errorClass);

      //Нужно сверять состояние кнопки при каждом изменении полей формы. 
      // Поэтому toggleButtonState вызывают внутри обработчика события input. 
      //чтобы проверять его при изменении любого из полей
      // Вызовем toggleButtonState и передадим ей массив полей и кнопку
      toggleButtonState(inputList, buttonElement, inactiveButtonClass);
    });
  });
}; 

// ф, которая найдёт и переберёт все формы на странице:
const enableValidation = (settings) => {
  // Найдём все формы с указанным классом в DOM, сделаем из них массив методом Array.from
  const formList = Array.from(document.querySelectorAll(settings.formSelector));
  
  // Переберём полученную коллекцию
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      // У каждой формы отменим стандартное поведение
      evt.preventDefault();
    });
    setEventListeners(formElement, settings.inputSelector, settings.submitButtonSelector, settings.inactiveButtonClass, settings.inputErrorClass, settings.errorClass);
     
  });
};
  
// ф проверки всех полей (Она принимает массив полей формы (inputList) и возвращает true, 
// если в нём хотя бы одно поле не валидно, и false, если все валидны.)  
const hasInvalidInput = (inputList) => {
  // проходим по этому массиву методом some
  return inputList.some((inputElement) => {
    // Если поле не валидно, колбэк вернёт true. Обход массива прекратится и вся ф hasInvalidInput вернёт true
    return !inputElement.validity.valid;
  }); 
}

// ф делает кнопку активной/неактивной (массив полей, кнопка)
// Для этого функция hasInvalidInput проверяет валидность полей и возвращает true или false. 
// На их основе toggleButtonState меняет состояние кнопки
const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
  // Если есть хотя бы один невалидный инпут
  if (hasInvalidInput(inputList)) {
    // сделай кнопку неактивной
    buttonElement.classList.add(inactiveButtonClass);
  } else {
    // иначе сделай кнопку активной
    buttonElement.classList.remove(inactiveButtonClass); 
  } 
}
enableValidation({
  formSelector: '.popup__container',
  inputSelector: '.popup__input',
  submitButtonSelector: '.main-button',
  inactiveButtonClass: 'main-button_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
});