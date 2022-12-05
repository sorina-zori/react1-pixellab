import { render } from './addContactForm.js';
import { clearMessages } from './notificationBar.js';
import stage from './stage.js';

const addContactButton = document.querySelector('.add-contact-button');

addContactButton.addEventListener('click', () => {
  clearMessages();
  stage.innerHTML = '';

  stage.append(render());
});

export default addContactButton;
