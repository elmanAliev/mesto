// ф показа ошибки (конкретную форму, конкретное поле, текст ошибки)
const showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`); // получаем span (Находим элемент ошибки внутри самой функции)
    inputElement.classList.add('popup__input_type_error'); // добавляем полю класс (стили невалидного поля)
    errorElement.textContent = errorMessage; // в span добавляем текст ошибки
    errorElement.classList.add('popup__input-error_active'); // показваем span
};


// ф скрытия ошибки (конкретную форму, конкретное поле)
const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);  // получаем span (Находим элемент ошибки внутри самой функции)
    inputElement.classList.remove('popup__input_type_error'); // удаляем у поля класс (стили невалидного поля)
    errorElement.classList.remove('popup__input-error_active'); // скрываем span
    errorElement.textContent = ''; // в span добавляем пустую строку
};
  
// ф проверки на валидность (конкретную форму, конкретное поле)
const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    // если поле не проходит валидацию, вызываем ф-цию показа ошибки
    // inputElement.validationMessage - это сообщение об ошибке конкретного поля
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    // если проходит валидацию, вызываем ф-цию скрытия ошибки
    hideInputError(formElement, inputElement);
  }
};


// добавляем слушатель всем полям ввода внутри конкретной формы (formElement)
const setEventListeners = (formElement) => {
  // Находим все поля внутри формы, сделаем из них массив методом Array.from
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  // находим кнопку submit в форме
  const buttonElement = formElement.querySelector('.main-button');
  // Вызовем toggleButtonState, чтобы не ждать ввода данных в поля (чтобы до начала ввода данных она была не активна.)
  toggleButtonState(inputList, buttonElement);
  
  // Обойдём все элементы полученной коллекции
  inputList.forEach((inputElement) => {
    // каждому полю добавим обработчик события input
    inputElement.addEventListener('input', function () {
      // Внутри колбэка вызовем checkInputValidity, передав ей форму и проверяемый элемент
      checkInputValidity(formElement, inputElement);

      //Нужно сверять состояние кнопки при каждом изменении полей формы. 
      // Поэтому toggleButtonState вызывают внутри обработчика события input. 
      //чтобы проверять его при изменении любого из полей
      // Вызовем toggleButtonState и передадим ей массив полей и кнопку
      toggleButtonState(inputList, buttonElement);
    });
  });
}; 

// ф, которая найдёт и переберёт все формы на странице:
const enableValidation = () => {
  // Найдём все формы с указанным классом в DOM, сделаем из них массив методом Array.from
  const formList = Array.from(document.querySelectorAll('.popup__container'));
  // Переберём полученную коллекцию
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      // У каждой формы отменим стандартное поведение
      evt.preventDefault();
    });
    
    setEventListeners(formElement);
     
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
const toggleButtonState = (inputList, buttonElement) => {
  // Если есть хотя бы один невалидный инпут
  if (hasInvalidInput(inputList)) {
    // сделай кнопку неактивной
    buttonElement.classList.add('main-button_inactive');
  } else {
    // иначе сделай кнопку активной
    buttonElement.classList.remove('main-button_inactive');
  } 
}
enableValidation();