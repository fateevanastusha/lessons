//Типы данных

/*
Примитивные

1) string => ''
2) number => 26, 26.05, NaN, Infinity
3) undefined => undefined
4) null => null
5) boolean => true, false

6) Symbol => symbol (уникальные нечитаемые строки)
7) bigInt => BigInt > 2^16

Ссылочные (сложный тип данных)
переменная хранит не сам объект, а ссылку на него. 
Для хранения объектов выделена отдельная область памяти, нежели под примитивные типы

8) object => object, array, function


const o = {} - в переменной лежит ссылка на область памяти, 
в которой хранится объект.
любая переменная, имеющая доступ к ссылку, имеет доступ к самому
объекту

это делается для того, чтобы сэкономить ресурсы браузера, 
т.к. операция создания объекта очень громоздкая.
*/

const user = { name: 'Bob' };
const superUser = user;
user.age = 56;
console.log(superUser); // = {name: 'Bob', age: 56}

const arr = [1, 2, 3, 4];
arr.push(5);
console.log(arr); // = [1, 2, 3, 4, 5]
console.log(arr); // = [1, 2, 3, 4, 5]
const newArr = arr.concat(6);
console.log(newArr); // = [1, 2, 3, 4, 5, 6] возвращает новый массив
console.log(newArr === arr); // сравнивает ссылки на массивы
const a = [1, 2, 3];
const b = [1, 2, 3];
console.log(a === b); // сравнивает ссылки на массивы

//метод push - мутабельный, concat - немутабельный

const users = [
  { id: 1, name: 'Bob', isStudent: false },
  { id: 2, name: 'Danny', isStudent: true },
  { id: 3, name: 'Ann', isStudent: false },
  { id: 4, name: 'Alex', isStudent: false },
  { id: 5, name: 'Maria', isStudent: true },
  { id: 6, name: 'Alise', isStudent: true },
  { id: 7, name: 'Donald', isStudent: false },
];

const newUser = { id: 8, name: 'Roman', isStudent: true };

const copyUsers = [...users, newUser];

//CREATE-READ-UPDATE-DELETE (CRUD)


//create

const createdUsers = users.concat(newUser)
console.log(createdUsers, 'createdUsers')

//read

console.log(users, 'readedUsers')

//update

const updatedUsers = users.map(u => u.id === 4 ? {...u, isStudent : true} : u)
console.log(updatedUsers, 'updatedUsers')

//delete
const deletedUsers = users.filter(u => u.id !== 4)
console.log(deletedUsers, 'deletedUsers')

//Глубокое и поверхностное копирование

/*
    Поверхностное копирование - объект копируется, а вложенные объекты сохраняются как ссылки.
    Поэтому, если изменить вложенные объекты - они изменятся и в изначальном.
*/

const superSecretUser = {
    name : "Bob",
    age : 45,
    location : {
        city : "Moscow",
        country: "Russia",
        geo: {
            "lat" : "-37.4542",
            "lng" : "91.1056",
        }
    }
}

const superSecretUserCopy = {...superSecretUser}

superSecretUser.location.geo.lat = "-10.45432"

console.log(superSecretUser, 'superSecretUser')
console.log(superSecretUserCopy, 'superSecretUserCopy')

/* 
    Глубокое копирование
    как реализовать?
    1) lodash - есть метод cloneDeep().
    2) через json.parse() json.stringlify() - не сработает с Map Set Date RegExp ArrayBuffer 
    и отбросит функции молча.
    3) structuredClone() глобальный объект.
*/

const superSecretUser1 = {
    name : "Bob",
    age : 45,
    location : {
        city : "Moscow",
        country: "Russia",
        geo: {
            "lat" : "-37.4542",
            "lng" : "91.1056",
        }
    }
}

const superSecretUserCopy1 = structuredClone(superSecretUser1)

superSecretUser1.location.geo.lat = "-10.45432"

console.log(superSecretUser1, 'superSecretUser1')
console.log(superSecretUserCopy1, 'superSecretUserCopy1')

