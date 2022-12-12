import { render as renderPet } from './pet.js';

export const render = (contact) => {
  const { name, surname, phone, email, pets = [], id } = contact;
  const container = document.createElement('article');
  container.classList.add('contact', 'border', 'p-3', 'mb-4');
  container.dataset.contactId = id;

  container.innerHTML = `
  <h1>${name + ' ' + surname}</h1>
  <ul>
    <li>${phone}</li>
    <li>${email}</li>
   </ul>

   <button title="Delete"
      type="button"
      class='btn btn-secondary delete-contact'
   >Delete</button>
   <button title="Edit"
      type="button"
      class='btn btn-secondary edit-contact-button'
   >Edit</button>
   <button title="Add Pet"
      type="button"
      class='btn btn-secondary add-pet-button'
    >Add Pet</button>
  `;

  const petUl = document.createElement('ul');

  pets.forEach((pet) => {
    const renderedPet = renderPet(pet);
    const petLi = document.createElement('li');
    petLi.append(renderedPet);
    petUl.append(petLi);
  });

  if (pets.length > 0) {
    container.append(petUl);
  }
  return container;
};
