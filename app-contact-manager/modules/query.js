import contacts from './data.js';

export const findContacts = (needle = 'query') => {
  const results = contacts.filter((contact) => {
    return needle.trim().toUpperCase() === contact.name.toUpperCase();
    //Object.entries(contact).toUppercase();
  });

  return results;
};
