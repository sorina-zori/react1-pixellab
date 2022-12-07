import { addMessage, clearMessages } from './notificationBar.js';
import { createContact, deleteContact, findContact } from './query.js';
import { render as renderEditContact } from './editContact.js';
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

// create contact
stage.addEventListener('submit', (event) => {
  event.preventDefault();
  const { target } = event;

  if (target.nodeName !== 'FORM' || !target.classList.contains('add-contact')) {
    return;
  }

  const form = target;
  const { name, surname, phone, email } = form;
  const contact = {
    id: Number(Date.now().toString().slice(-6)),
    name: name.value,
    surname: surname.value,
    phone: phone.value,
    email: email.value,
  };

  createContact(contact);

  addMessage(createMessage(`Contact ${name.value} ${surname.value} created.`));

  clearStage(stage);
});

//delete contact
stage.addEventListener('click', (event) => {
  const { target } = event;

  if (
    target.nodeName !== 'BUTTON' ||
    !target.classList.contains('delete-contact')
  ) {
    return;
  }

  const button = target;
  const parent = button.parentElement;
  const contactId = Number(parent.dataset.contactId);

  deleteContact(contactId);

  parent.remove();

  clearMessages();

  addMessage(createMessage('Contact removed', 'danger'));
});

// edit contact button
stage.addEventListener('click', (event) => {
  const { target } = event;

  if (
    target.nodeName !== 'BUTTON' ||
    !target.classList.contains('edit-contact-button')
  ) {
    return;
  }

  const button = target;
  const parentElement = button.parentElement;
  const contactId = Number(parentElement.dataset.contactId);
  const contact = findContact(contactId);

  clearStage(stage);

  stage.append(renderEditContact(contact));
});

// edit contact submit
stage.addEventListener('submit', (event) => {
  event.preventDefault();
  const { target } = event;

  if (
    target.nodeName !== 'FORM' ||
    !target.classList.contains('edit-contact')
  ) {
    return;
  }

  const form = target;
  // DOM elements (need .value)
  const { name, surname, phone, email, id } = form;
  const contactId = id.value;
  const contact = findContact(contactId);

  if (!contact) {
    return;
  }

  contact.name = name.value;
  contact.surname = surname.value;
  contact.phone = phone.value;
  contact.email = email.value;

  clearStage(stage);
  clearMessages();
  addMessage(
    createMessage(`Contact ${contact.name} ${contact.surname} updated.`),
  );
});

export default stage;
