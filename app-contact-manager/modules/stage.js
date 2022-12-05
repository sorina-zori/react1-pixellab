import { addMessage } from './notificationBar.js';
import { createContact } from './query.js';
import createMessage from './message.js';
import { clearStage } from './utils.js';

const stage = document.querySelector('.stage');

//cancel action button
stage.addEventListener('click', (event) => {
  const { target } = event;

  if (
    target.nodeName !== 'BUTTON' ||
    !target.classList.contains('cancel-button')
  ) {
    return;
  }

  clearStage(stage);
});

stage.addEventListener('submit', (event) => {
  event.preventDefault();
  const { target } = event;

  if (target.nodeName !== 'FORM' || !target.classList.contains('add-contact')) {
    return;
  }

  const form = target;
  const { name, surname, phone, email } = form;
  const contact = {
    id: Date.now().toString().slice(-6),
    name: name.value,
    surname: surname.value,
    phone: phone.value,
    email: email.value,
  };

  createContact(contact);

  addMessage(createMessage(`Contact ${name.value} ${surname.value} created.`));

  clearStage(stage);
});

export default stage;
