const optionsValidation = {
  buttonSubmitClass: 'popup__save-button',
  disableButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  inputSelector: 'popup__input',
};


function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => !inputElement.validity.valid);
};


const disableButton = (buttonElement, options) => {
  const disableButtonClass = options.disableButtonClass;

  buttonElement.disabled = true;
  buttonElement.classList.add(disableButtonClass);
}


const enableButton = (buttonElement, options) => {
  const disableButtonClass = options.disableButtonClass;

  buttonElement.classList.remove(disableButtonClass);
  buttonElement.disabled = false;
}


const toggleButtonState = (inputList, buttonElement, options) => {
  hasInvalidInput(inputList) ? disableButton(buttonElement, options) : enableButton(buttonElement, options);
};


const showInputError = (formElement, inputElement, options) => {
  const inputErrorClass = options.inputErrorClass;
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = inputElement.validationMessage;
  errorElement.hidden = false;
}


const hideInputError = (formElement, inputElement, options) => {
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

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(form, inputElement, options);
      toggleButtonState(inputList, buttonElement, options);
    });
  });
};


const resetFormValidation = (form, inputList, options) => {
  const buttonElement = form.querySelector(`.${options.buttonSubmitClass}`);

  inputList.forEach((inputElement) => {
    hideInputError(form, inputElement, options);
    // Хочу обратить внимание, что, несмотря на реализацию мной предложенного Вами решения, в нем не учитывался факт
    // того, что подсветка полей ввода осуществлялась не с помощью модификатора, а с помощью псевдокласса :invalid.
    // Либо я пока не знаю корректного способа "снять" такое состояние при открытии формы с пустыми полями ввода, либо
    // такого способа не существует. Единственный адекватный вариант, который я, находясь на этапе данного спринта,
    // смог придумать, - это применение модификатора, перекрывающего состояние :invalid класса. С помощью этого
    // модификатора поле ввода помечалось как "нетронутое" пользователем до ввода первого символа в этом поле или
    // до первого выхода фокуса ввода из этого поля. При этом, на мой взгляд, это решение имело как минимум одно
    // преимущество по сравнению с предложенным: поле ввода помечалось ошибочным не только после ввода данных в поле,
    // но и после потери фокуса ввода. Это позволяло уведомить пользователя об ошибочных данных в поле ввода, даже
    // если он туда ничего не вводил, но "посетил" это поле.
    // Я надеюсь, что наставник на разборе проектных разъяснит минусы моего решения.
  });
  disableButton(buttonElement, options);
}


const enableValidation = (options) => {
  const forms = Array.from(document.forms);

  forms.forEach((form) => {
    setEventListeners(form, options);
  });
};


enableValidation(optionsValidation);
