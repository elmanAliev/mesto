import Popup from './Popup.js';

export default class PopupWithConfirm extends Popup {
    constructor(popupSelector, submitForm) {
        super(popupSelector);
        this._submitForm = submitForm;
        this._form = this._popup.querySelector('.popup__container');
    }

    open(card) {
        super.open();
        this._element = card;
    }
    
    setEventListeners() {
        super.setEventListeners(); 
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._submitForm(this._element);
        }); 
        
    }
}