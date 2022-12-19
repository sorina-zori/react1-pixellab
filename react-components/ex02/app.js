const person = {
  name: 'Dragos',
  surname: 'Iordache',
  age: 32,
  petOwner: false,
  skills: [
    'html',
    'javascript',
    'css',
    'java',
    'c++',
    'node',
    'jquery',
    'node.js',
  ],
  friends: [
    {
      name: 'Larry',
      surname: 'Larryson',
      age: 30,
    },
    {
      name: 'Steven',
      surname: 'Stevenson',
      age: 31,
    },
    {
      name: 'Carol',
      surname: 'Carolson',
      age: 29,
    },
  ],
};

console.warn(`
  Folosind obiectul person si reduce, afiseaza
  in consola un string care contine skill-urile de pe
  pozitiile pare ale arrayului, separate prin virgula
`);
const skillArray1 = person.skills.reduce((skillArray1, skill, index) => {
  if (index % 2 === 0) {
    skillArray1.push(skill);
  }

  return skillArray1;
}, []);
console.log(skillArray1.toString());

console.warn(`
  In mod similar, afiseaza skill-urile care NU incep cu j.
`);
const skillArray2 = person.skills.reduce((skillArray2, skill) => {
  if (!skill.toLowerCase().startsWith('j')) {
    skillArray2.push(skill);
  }

  return skillArray2;
}, []);
console.log(skillArray2.join(' - '));

console.warn(`
  Folosind reduce afiseaza propozitia:
  "Prietenii mei se numesc xxx yyy, xxx yyy, xxx yyy."
`);
const message1 = person.friends.reduce(
  (message1, { name, surname }, index, friends) => {
    let punctuation = ', ';

    if (index === friends.length - 1) {
      punctuation = '.';
    }

    message1 += `${name} ${surname}${punctuation}`;

    return message1;
  },
  'Prietenii mei se numesc ',
);
console.log(message1);

console.warn(`
  Afiseaza fraza: "Intre Dragos si Larry este o diferenta de xx ani.
  Intre Dragos si Steven... ", doar daca varsta prietenului este impara.
`);
const message2 = person.friends.reduce((message2, friend) => {
  const { age, name } = friend;
  const diff = person.age - age;

  if (age % 2 !== 0) {
    message2 += `Intre ${person.name} si ${name} este o diferenta de ${diff} ani. `;
  }

  return message2;
}, '');
console.log(message2.trim());
