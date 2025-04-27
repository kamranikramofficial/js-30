const inventors = [
    { first: 'Albert', last: 'Einstein', year: 1879, passed: 1955 },
    { first: 'Isaac', last: 'Newton', year: 1643, passed: 1727 },
    { first: 'Galileo', last: 'Galilei', year: 1564, passed: 1642 },
    { first: 'Marie', last: 'Curie', year: 1867, passed: 1934 },
    { first: 'Johannes', last: 'Kepler', year: 1571, passed: 1630 },
    { first: 'Nicolaus', last: 'Copernicus', year: 1473, passed: 1543 },
    { first: 'Max', last: 'Planck', year: 1858, passed: 1947 }
  ];
  
  const people = ['Beck, Glenn', 'Becker, Carl', 'Beckett, Samuel', 'Beddoes, Mick', 'Beecher, Henry',
    'Beethoven, Ludwig', 'Begin, Menachem', 'Belloc, Hilaire', 'Bellow, Saul', 'Benchley, Robert'];
  
  // Filter 1500s
  const bornIn1500s = inventors.filter(inventor => inventor.year >= 1500 && inventor.year < 1600);
  console.log(bornIn1500s);
  
  // Full names
  const fullNames = inventors.map(inventor => `${inventor.first} ${inventor.last}`);
  console.log(fullNames);
  
  // Sort birth
  const sortedByBirth = inventors.sort((a, b) => a.year - b.year);
  console.log(sortedByBirth);
  
  // Total years
  const totalYears = inventors.reduce((total, inventor) => total + (inventor.passed - inventor.year), 0);
  console.log(totalYears);
  
  // Sort lived
  const sortedByLifespan = inventors.sort((a, b) => {
    const lastGuy = a.passed - a.year;
    const nextGuy = b.passed - b.year;
    return nextGuy - lastGuy;
  });
  console.log(sortedByLifespan);
  
  // Sort names
  const sortedPeople = people.sort((a, b) => {
    const [aLast] = a.split(', ');
    const [bLast] = b.split(', ');
    return aLast.localeCompare(bLast);
  });
  console.log(sortedPeople);
  
  // Count items
  const data = ['car', 'car', 'truck', 'bike', 'walk', 'car', 'van', 'bike', 'walk', 'car', 'van'];
  const transportCount = data.reduce((obj, item) => {
    obj[item] = obj[item] ? obj[item] + 1 : 1;
    return obj;
  }, {});
  console.log(transportCount);
  