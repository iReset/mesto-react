const optionsValidation = {
  buttonSubmitClass: 'popup__save-button',
  disableButtonClass: 'popup__save-button_disabled',
  inputUntouchedClass: 'popup__input_untouched',
  inputSelector: 'popup__input',
};


function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => !inputElement.validity.valid);
};


const toggleButtonState = (inputList, buttonElement, options) => {
  const disableButtonClass = options.disableButtonClass;

  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(disableButtonClass);
  }
  else {
    buttonElement.classList.remove(disableButtonClass);
    buttonElement.disabled = false;
  };
};


const showInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

  errorElement.textContent = inputElement.validationMessage;
  errorElement.hidden = false;
}


const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

  errorElement.hidden = true;
  errorElement.textContent = '';
}


const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement);
  }
  else {
    hideInputError(formElement, inputElement);
  };
};


const touchInput = (inputElement, options) => {
  inputElement.classList.remove(options.inputUntouchedClass);
}


const untouchInput = (inputElement, options) => {
  inputElement.classList.add(options.inputUntouchedClass);
}


const setEventListeners = (form, options) => {
  const inputList = Array.from(form.querySelectorAll(`.${options.inputSelector}`));
  const buttonElement = form.querySelector(`.${options.buttonSubmitClass}`);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(form, inputElement);
      toggleButtonState(inputList, buttonElement, options);
    });
  });
};


const handleTouchInput = (event) => {
  const inputElement = event.target;
  const formElement = inputElement.closest('.popup__form');
  touchInput(inputElement, optionsValidation);
  checkInputValidity(formElement, inputElement);
  inputElement.removeEventListener('input', handleTouchInput);
  inputElement.removeEventListener('focusout', handleTouchInput);
}


const resetFormValidation = (form, inputList, options) => {
  const buttonElement = form.querySelector(`.${options.buttonSubmitClass}`);

  inputList.forEach((inputElement) => {
    hideInputError(form, inputElement, options);
    untouchInput(inputElement, options);
    inputElement.addEventListener('input', handleTouchInput);
    inputElement.addEventListener('focusout', handleTouchInput);
  });
  toggleButtonState(inputList, buttonElement, options);
}


const enableValidation = (options) => {
  const forms = Array.from(document.forms);

  forms.forEach((form) => {
    setEventListeners(form, options);
  });
};


enableValidation(optionsValidation);
