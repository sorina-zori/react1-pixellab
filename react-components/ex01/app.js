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

console.warn(`Folosind metoda map pe arrayul skills,
returneaza si afiseaza in consola un array
in care fiecare consoana este scrisa cu litera mare (vocalele nu)
`);

const vowels = ['a', 'e', 'i', 'o', 'u'];
const arr1 = person.skills.map((skill) => {
  const skillLetters = skill.split('');
  const updatedLetter = skillLetters.map((skillLetter) => {
    if (vowels.includes(skillLetter.toLowerCase())) {
      return skillLetter;
    } else {
      return skillLetter.toUpperCase();
    }
  });
  return updatedLetter.join('');
});

console.log(arr1);

console.warn(`
  Folosind map pe arrayul friends, returneaza un array in care fiecare pozitie contine propozitia
  “Ma numesc {name} {surname} si am {age} ani.”
`);

const arr2 = person.friends.map((friend) => {
  const { name, surname, age } = friend;

  return `Ma numesc ${name} ${surname} si am ${age} ani.`;
});
console.log(arr2);

console.warn(`
  Folosind metoda map pe arrayul skills, returneaza
  un array care contine cuvintele cu prima si ultima litera mari.
`);
const arr5 = person.skills.map((skill) => {
  return skill
    .split('')
    .map((letter, index, letters) => {
      if (index === 0 || index === letters.length - 1) {
        return letter.toUpperCase();
      }

      return letter;
    })
    .join('');
});
console.log(arr5);

console.warn(`
  Folosind metoda map pe arrayul skills, returneaza un array
  care contine cuvintele inversate (exemplu: lmth)
`);
const arr6 = person.skills.map((skill) => {
  return skill.split('').reverse().join('');
});
console.log(arr6);

const lis = document.querySelectorAll('ul li');
const total = Array.from(lis).reduce((total, li) => {
  total += Number(li.innerText);

  return total;
}, 0);

console.log(total);
