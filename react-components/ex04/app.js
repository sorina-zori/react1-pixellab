const person = {
  name: 'Dragos',
  surname: 'Iordache',
  age: 32,
  petOwner: true,
  skills: {
    html: true,
    css: true,
    javaScript: true,
  },
  friends: {
    larry: {
      name: 'Larry',
      surname: 'Larryson',
      age: 30,
    },
    steven: {
      name: 'Steven',
      surname: 'Stevenson',
      age: 31,
    },
    carol: {
      name: 'Carol',
      age: 29,
      surname: 'Carolson',
    },
  },
};

console.warn(`
  Folosind Object.entries() pe proprietatea skills, afiseaza abilitatile
  persoanei daca acestea sunt true.
  Folosind propozitii de forma: “person.name cunoaste: html.” “person.name cunoaste: javaScript.”
`);
// [['html', true], ['css', true], ['javaScript', true]]
const message1 = Object.entries(person.skills)
  .reduce((message1, skillPair) => {
    // const skillName = skillPair[0];
    // const skillIsKnown = skillPair[1];
    const [skillName, skillIsKnown] = skillPair;

    if (skillIsKnown) {
      message1 += `${person.name} cunoaste: ${skillName}. `;
    }

    return message1;
  }, '')
  .trim();
console.log(message1);

console.warn(`
  Prin aceeasi metoda, afiseaza o lista inversata cu numele complet inversat al prietenilor.
`);
Object.entries(person.friends)
  .reverse()
  .forEach((friendPair) => {
    const [, friend] = friendPair;
    // const friend = friendPair[1];
    const { name, surname } = friend;

    console.log(`${surname} ${name}`);
  });

console.warn(`
  Afiseaza propozitia: “Prietenii mei sunt Larry, Steven si Carol.” folosind Object.entries()
`);
const message2 = Object.entries(person.friends).reduce(
  (message2, friendPair, index, friends) => {
    const [, friend] = friendPair;
    const { name } = friend;
    const friendsLength = friends.length;
    let punctuation = ', ';

    if (index === friendsLength - 1) {
      punctuation = '.';
    }

    if (index === friendsLength - 2) {
      punctuation = ' si ';
    }

    message2 += `${name}${punctuation}`;

    return message2;
  },
  'Prietenii mei sunt ',
);
console.log(message2);

console.warn(`
  In mod similar afiseaza mai multe propozitii (cate una per console.log())
  care sa afiseze: “Diferenta de varsta intre Larry si Dragos este de xxx ani.” etc…
`);
const friendPairs = Object.entries(person.friends);
for (let i = 0; i < friendPairs.length; i++) {
  const [, { name, age }] = friendPairs[i];
  const diff = person.age - age;

  console.log(
    `Diferenta de varsta intre ${name} si ${person.name} este de ${diff} ani.${
      i === friendPairs.length - 1 ? '' : ' '
    }`,
  );
}
