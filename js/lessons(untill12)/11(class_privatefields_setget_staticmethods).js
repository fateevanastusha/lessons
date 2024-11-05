//Class, private fields, set/get, static methods

//Как создавать однотипные объекты?

//1) функция-фабрика
function createCarFabricC(brand, maxSpeed) {
  return {
    brand,
    maxSpeed,
    startEngine() {
      console.log(`This is ${this.brand} with speed ${this.maxSpeed}`);
    },
  };
}

//2) функция-конструкор
function CarFabric(brand, maxSpeed) {
  this.brand = brand;
  this.maxSpeed = maxSpeed;
}
//можно даже сделать наследование, чтобы не создавать метод startEngine заново.
CarFabric.prototype.startEngine = function () {
  console.log(`This is ${this.brand} with speed ${this.maxSpeed}`);
};

//3) класс
class Car1 {
  constructor(brand, maxSpeed) {
    this._brand = brand;
    this._maxSpeed = maxSpeed;
  }
  startEngine() {
    console.log(`This is ${this.brand} with speed ${this.maxSpeed}`);
  }
}

//создание инстанса
const car1 = new Car1('car1', 167);
car1.startEngine();

console.log('----------------------------------------------------');

//private fields
/*ранее была условная приватность у свойств: их указывали через _,
но по факту к нему все равно имели доступ */
class Car2 {
  constructor(brand) {
    this._brand = brand;
  }
}

const car2 = new Car2('car2');
console.log(car2._brand); //car2

//можно добавить в начале через решетку, тогда свойство будет недоступно
//снаружи мы не сможем получить к нему доступ

class Car3 {
  #brand;
  constructor(brand) {
    this.#brand = brand;
  }
}

const car3 = new Car3('car3');
// console.log(car2.#brand); - ошибка SyntaxError: Private field '#brand' must be declared in an enclosing class

console.log('----------------------------------------------------');

//getter setter функции
/* 
    Они нужны чтобы валидировать изменение/ограничить получение свойства.
    С помощью них можно менять/получать приватные свойства.
    Как это реализовать? 
*/

//1)

class Car4 {
  #brand;
  constructor(brand) {
    this.#brand = brand;
  }
  getBrand() {
    return this.#brand;
  }
  setBrand(newBrand) {
    if (!newBrand) {
      throw new Error('Bad brand');
    }
    this.#brand = newBrand;
  }
}
const car4 = new Car4('car4');

console.log(car4.getBrand()); //car4

//2) Через специальный функционал
/*Мы можем обращаться к этим функциям как к свойствам. То есть извне можно даже и не знать, что
свойство скрыто.*/
/*Класс понимает геттер это или сеттер по тому, как мы вызываем этот метод*/

class Car5 {
  #brand;
  constructor(brand) {
    this.#brand = brand;
  }
  get brand() {
    return this.#brand;
  }
  set brand(newBrand) {
    if (!newBrand) {
      throw new Error('Bad brand');
    }
    this.#brand = newBrand;
  }
}
const car5 = new Car5('car5');

console.log(car5.brand); //car5
car5.brand = 'car5edited';
console.log(car5.brand); //car5edited

console.log('----------------------------------------------------');

//static
/* 
    - метод, вызываемый у класса, а не у инстанса. Статический метод НЕ ПОПАДЕТ в инстансы.
    Он будет доступен ТОЛЬКО у самого класса.
*/

class Human1 {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  static info() {
    console.log('this is info');
  }
}

const human1 = new Human1('Nastya', 21);
// human1.info(); //error - этой функции нет в инстансе.
Human1.info(); //this is info - так как эта функция есть ТОЛЬКО В САМОМ классе.

console.log('----------------------------------------------------');

//Наследование
/* 
    Нужно чтобы расширять уже существующий класс, вместо того, чтобы создавать новый.
    Ребенок будет иметь все методы родителя. (в том числе статические, и все они будут 
    доступны в прототипах). Сначала будет искаться собственный метод, а потом у родителей.
*/

class Human {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  show() {
    console.log(`This is name - ${this.name}, this is age - ${this.age}.`);
  }
  static m() {
    console.log('this is static');
  }
}

class Employee extends Human {
  constructor(name, age, profession) {
    //super нужен чтобы вызвать конструктор родителя
    super(name, age);
    this.profession = profession;
  }
}

const employee = new Employee('Nastya', 21, 'engineer');
console.log(employee); //{ name: 'Nastya', age: 21, profession: 'engineer' }
employee.show(); //This is name - Nastya, this is age - 21.
Employee.m(); //this is static
