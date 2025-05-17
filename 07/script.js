// Sample data
const people = [
  { name: 'Kamran', year: 2006 },
  { name: 'Ali', year: 2010 },
  { name: 'Sara', year: 1999 },
  { name: 'Ahmed', year: 2003 }
];

const comments = [
  { text: 'Great job!', id: 523423 },
  { text: 'Nice one', id: 823423 },
  { text: 'Keep it up', id: 2039842 },
  { text: 'Awesome work', id: 123523 },
  { text: 'Well done', id: 542328 }
];

// 1. Is at least one person 18 or older?
const isAdult = people.some(person => (new Date()).getFullYear() - person.year >= 18);

// 2. Is everyone 18 or older?
const allAdults = people.every(person => (new Date()).getFullYear() - person.year >= 18);

// 3. Find the comment with ID 823423
const comment = comments.find(comment => comment.id === 823423);

// 4. Find the index of the comment with ID 123523
const index = comments.findIndex(comment => comment.id === 123523);

// 5. Delete the comment using splice
const updatedComments = [...comments]; // copy array
updatedComments.splice(index, 1);

// Output
document.getElementById('output').textContent = `
  Is there any adult? ${isAdult}
  Is everyone an adult? ${allAdults}
  Comment with ID 823423: ${comment.text}
  Index of ID 123523: ${index}
  Comments after deletion:
  ${JSON.stringify(updatedComments, null, 2)}
  `;
