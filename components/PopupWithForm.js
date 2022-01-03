import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor(popupSelector, submitForm) {
        super(popupSelector);
        this._form = this._popupSelector.querySelector('.popup__container');
        this._submitForm = submitForm;
    }

    _getInputValues = () => {
        return this._form.querySelectorAll('.popup__input')
    }

    close() {
        super.close();
        // this._form.reset();
    }

    setEventListeners = () => {
        this._form.addEventListener('submit', (evt) => {
            this._submitForm(evt);
        }); 
        super.setEventListeners();
    }
}