let students = [
  { name: 'Bob', age: 22, scores: 85 },
  { name: 'Alex', age: 37, scores: 12 },
  { name: 'Nick', age: 15, scores: 100 },
  { name: 'John', age: 42, scores: 45 },
  { name: 'Alice', age: 29, scores: 20 },
  { name: 'Irina', age: 31, scores: 20 },
];

//1 - MAP

const mapFunction = (array, mapFunc) => {
  const result = new Array();
  for (let i = 0; i < array.length; i++) {
    result[i] = mapFunc(array[i]);
  }
  return result;
};

const names1 = mapFunction(students, (el) => el.name);
const names2 = students.map((el) => el.name);

console.log(names1, names2, '\n');

//2 - FILTER
const filterFunction = (array, filterFunc) => {
  const result = new Array();
  for (let i = 0; i < array.length; i++) {
    if (filterFunc(array[i])) {
      result.push(array[i]);
    }
  }
  return result;
};

const filteredAge1 = filterFunction(students, (el) => el.age > 25);
const filteredAge2 = students.filter((el) => el.age > 25);

console.log(filteredAge1, filteredAge2, '\n');

//3 - FIND

const findFunction = (array, findFunc) => {
  for (let i = 0; i < array.length; i++) {
    if (findFunc(array[i])) {
      return array[i];
    }
  }
  return;
};

const findName1 = findFunction(students, (el) => el.name === 'Alice');
const findName2 = students.find((el) => el.name === 'Alice');

console.log(findName1, findName2, '\n');

//4 - PUSH

const pushFunction = (array, pushElem) => {
  array[array.length] = pushElem;
  return array.length;
};

pushFunction(students, { name: 'Kate', age: 19, scores: 33 });
console.log(students, 'push students');

//5 - INDEXOF

const indexOfFunction = (array, indexOfElem) => {
  for (let i = 0; i < array.length; i++) {
    if (array[i] === indexOfElem) {
      return i;
    }
  }
  return -1;
};

console.log([1, 2, 3, 4, 5].indexOf(2));
console.log(indexOfFunction([1, 2, 3, 4, 5], 2));

//5 - INCLUDES

const includesFunction = (array, includesOfElem) => {
  for (let i = 0; i < array.length; i++) {
    if (array[i] === includesOfElem) {
      return true;
    }
  }
  return false;
};

console.log([1, 2, 3, 4, 5].includes(2));
console.log([1, 2, 3, 4, 5].includes(6));
console.log(includesFunction([1, 2, 3, 4, 5], 2));
console.log(includesFunction([1, 2, 3, 4, 5], 6));

//Методы массива :
/*

    у всех массивов есть методы, они не создаются отдельно для каждого массива.
    Все массивы наследуются от глобального родителя Array. 
    [].__proto__ - хранит связь с Array (своим родителем)
    [].map(fn) - у него у самого этого метода нет, поэтому он через __proto__
    обращается к своему родителю Array, и там находит нужный метод (в Array.prototype)
    
*/

const myArray = [1, 2, 3, 4, 5, 6];

function getLenght() {
  return `Lenght of array is ${this.length}`;
}
Array.prototype.getLenght = getLenght;

console.log(myArray.getLenght());
