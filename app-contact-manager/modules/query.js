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
