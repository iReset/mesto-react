const optionsValidation = {
  buttonSubmitClass: 'popup__save-button',
  disableButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_type_error',
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


const showInputError = (formElement, inputElement, options) => {
  const activeErrorClass = options.activeErrorClass;
  const inputErrorClass = options.inputErrorClass;
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

  errorElement.textContent = inputElement.validationMessage;
  errorElement.hidden = false;
  inputElement.classList.add(inputErrorClass);
}


const hideInputError = (formElement, inputElement, options) => {
  const activeErrorClass = options.activeErrorClass;
  const inputErrorClass = options.inputErrorClass;
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

  errorElement.hidden = true;
  errorElement.textContent = '';
  inputElement.classList.remove(inputErrorClass);
}


const checkInputValidity = (formElement, inputElement, options) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, options);
  }
  else {
    hideInputError(formElement, inputElement, options);
  };
};


const setEventListeners = (form, options) => {
  const inputList = Array.from(form.querySelectorAll(`.${options.inputSelector}`));
  const buttonElement = form.querySelector(`.${options.buttonSubmitClass}`);

  toggleButtonState(inputList, buttonElement, options);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(form, inputElement, options);
      toggleButtonState(inputList, buttonElement, options);
    });
  });
};


const checkFormValidity = (form, options) => {
  if (!form) {
    return;
  }
  const inputList = Array.from(form.querySelectorAll(`.${options.inputSelector}`));
  const buttonElement = form.querySelector(`.${options.buttonSubmitClass}`);

  inputList.forEach((inputElement) => checkInputValidity(form, inputElement, options));
  toggleButtonState(inputList, buttonElement, options);
}


const enableValidation = (options) => {
  const forms = Array.from(document.forms);

  forms.forEach((form) => {
    setEventListeners(form, options);
  });
};


enableValidation(optionsValidation);
