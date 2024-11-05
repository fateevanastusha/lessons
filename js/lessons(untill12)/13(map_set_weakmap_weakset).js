//Map Set WeakMap WeakSet

const obj = {
  name: 'nastya',
  age: 21,
  grade: 'middle',
};

const entries = [
  ['name', 'nastya'],
  ['age', 21],
  ['grade', 'middle'],
];

//Map
/* 
  Похожи на объекты, но: 
  1) к полям обращаемся через методы
  2) в качестве ключей может быть абсолютно любой тип данных (NaN, Object, Function и тд)
*/
console.log('Map');

console.log(Object.entries(obj)); //[['name', 'nastya'], ['age', 21], ['grade', 'middle'],]
console.log(Object.fromEntries(entries)); //{ name: 'nastya', age: 21, grade: 'middle', }

const map = new Map(entries);
console.log(map); // { 'name' => 'nastya', 'age' => 21, 'grade' => 'middle' }

//CRUD:

map.get('name'), 'map.get'; //value
map.set(obj, 'Value of obj'), 'map.set'; //сам map
map.delete(obj), 'map.delete'; //boolean - если нашел такой ключ - true, если нет - false
map.has(obj), 'map.has'; //boolean - если нашел такой ключ - true, если нет - false
map.size, 'map.size'; //число
// map.clear(), 'map.clear'; //undefined, очистит весь map

for (let entry of map.entries()) {
  console.log(entry, 'this is entry'); //[key, value]
}

for (let value of map.values()) {
  console.log(value, 'this is value'); //value
}

for (let key of map.keys()) {
  console.log(key, 'this is key'); //key
}

map.forEach((value, key, map) => console.log(value, key, map, 'value, key, map'));

console.log([...map], '[...map]');

console.log('--------------------------------');

//Set
/* 
  Как массив, только все значения уникальны - он удаляет дубли.
*/
console.log('Set');

const set = new Set([1, 2, 3, 4, 5, 6, 7, 7, 7, 7, 7, 7, 7]);
console.log(set, 'set');

set.add(10);
set.has(42); //boolean
set.size; //число
set.delete(1); //boolean
// set.clear(); //undefined

//дадут равный результат
console.log(set.values(), 'set values'); //{ 2, 3, 4, 5, 6, 7, 10 }
console.log(set.keys(), 'set keys'); //{ 2, 3, 4, 5, 6, 7, 10 }
console.log(set.entries(), 'set entires'); //{ [ 2, 2 ], [ 3, 3 ], [ 4, 4 ], [ 5, 5 ], [ 6, 6 ], [ 7, 7 ], [ 10, 10 ]}

for (let key of set) {
  console.log(key, 'set key');
}

console.log('--------------------------------');

//Weak Map
/* 
  - ключи только объекты
  - нужен для того, чтобы не было утечек памяти, помогает с оптимизацией приложения
  (так как если объект зануллим, он пропадет и в weak map).
*/
console.log('WeakMap');

let obj1 = { name: 'Alla' };

const weakMap = new WeakMap([[obj1, 'obj data']]);

weakMap.get('name');
weakMap.set({ name: 'Nastya' }, 'obj data');
weakMap.has('name'); //boolean
weakMap.delete('name');

obj1 = null;
console.log(weakMap.has(obj), 'weakMap.has(obj)'); //false
console.log(weakMap); //<items unknown>

console.log('--------------------------------');

//Weak Sets
/* 
  - тоже самое что и Set, только значениями могут быть только объекты
  - объекты удаляются
*/
console.log('WeakSet');

const weakSet = new WeakSet([obj]);

obj1 = { name: 'Alla' };

weakSet.add(obj1);
weakSet.has(obj1);

obj1 = null;

console.log(weakSet.has(obj1)); //false

console.log('--------------------------------');
