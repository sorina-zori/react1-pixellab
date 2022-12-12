import contacts from './data.js';

export const getContacts = (needle = 'query') => {
  const results = contacts.filter((contact) => {
    const values = Object.values(contact);

    const haystack = values.reduce((haystack, value) => {
      if (typeof value === 'string') {
        haystack += value.toLowerCase();
      }
      return haystack;
    }, '');

    if (haystack.includes(needle.toLowerCase().replace(/\s+/g, ''))) {
      return true;
    }
    return false;
  });

  return results;
};

export const createContact = (contact) => {
  //push mutates the data set
  contacts.push(contact);
};

export const deleteContact = (contactId) => {
  let contactIndex = -1;

  for (let i = 0; i < contacts.length; i++) {
    const contact = contacts[i];

    if (contactId === contact.id) {
      contactIndex = i;

      break;
    }
  }

  if (contactIndex >= 0) {
    // splice mutates
    contacts.splice(contactIndex, 1);
  }
};

export const findContact = (contactId) => {
  const contact = contacts.find((contact) => {
    return contact.id === Number(contactId);
  });

  return contact;
};

export const updateContact = (contactId, { name, surname, phone, email }) => {
  const contact = findContact(contectId);

  if (!contact) {
    return;
  }

  contact.name = name;
  contact.surname = surname;
  contact.phone = phone;
  contact.email = email;
};

export const createPet = (contactId, pet) => {
  const contact = findContact(contactId);

  if (contact === undefined) {
    return;
  }

  contact.pets = contact.pets || [];

  //push mutates
  contact.pets.push(pet);
};
