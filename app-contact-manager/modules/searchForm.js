import { findContacts } from './query.js';
import { addMessage, clearMessages } from './notificationBar.js';
import { pluralize } from './utils.js';
import createMessage from './message.js';

const searchForm = document.querySelector('.search-form');

searchForm.addEventListener('submit', (event) => {
  event.preventDefault();

  //currentTarget este elementul
  // pe care am rulat addEventListenerul
  const form = event.currentTarget;
  const queryInput = form.q;
  const queryString = queryInput.value;

  clearMessages();

  const contacts = findContacts(queryString);
  const contactsCount = contacts.length;

  if (!contactsCount) {
    addMessage(createMessage('No contacts found.', 'warning'));
  } else {
    addMessage(
      createMessage(
        ` Found ${pluralize(contactsCount, {
          one: 'contact',
          many: 'contacts',
        })}.`,
      ),
    );
  }

  queryInput.value = '';
});

export default searchForm;
