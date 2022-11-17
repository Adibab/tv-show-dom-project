// We have the names of the Simpsons family stored in an array called familyMembers. Create variables to store the names of the family members so that the console.log will print out the following message: In the Simpsons family, Homer and Marge are the parents. Bart is the son, Lisa is the daughter, and Maggie is the baby.



// let familyMembers = ["Homer", "Marge", "Bart", "Lisa", "Maggie"];

// [ dad, mum, son, daughter, baby] = familyMembers

// console.log(
//   `In the Simpsons family, ${dad} and ${mum} are the parents. ${son} is the son, ${daughter} is the daughter, and ${baby} is the baby.`
// );

// EXERCISE -4
// When you do array destructuring, the array can be of any data type. Try destructuring with the next array, which contains objects.

// let citiesByPopulation = [
//   { name: "London", population: 8000000 },
//   { name: "Birmingham", population: 1000000 },
//   { name: "Glasgow", population: 600000 },
//   { name: "Manchester", population: 500000 },
// ];


// // Assign variables using array destructuring on this line
// let [london, birmingham, glasgow, manchester] = citiesByPopulation;
// //  console.log( `${london}`)


//  console.log(`${london.name} population is ${london.population}`);
// console.log(`${birmingham.name} population is ${birmingham.population}`);
// console.log(`${glasgow.name} population is ${glasgow.population}`);
// console.log(`${manchester.name} population is ${manchester.population}`);



//  exercise 5
// let item = ["Egg", 0.25, 12];

// let [ name, quantity, price] = item
// // let name = item[0];
// // let price = item[1];
// // let quantity = item[2];

// console.log(`Item: ${name}, Quantity: ${quantity}, Price: ${price}`);

// exercise- 6
let numbers = [3, 5, 4, 2, 6, 1];

let [one, two, three, four, five, six] = numbers;

console.log(
  `One: ${one}, Two: ${two}, Three: ${three}, Four: ${four}, Five: ${five}, Six: ${six}`
);
console.log(" ");


