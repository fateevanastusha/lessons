//__proto__, prototype, extends

class Car {
  constructor(brand, speed) {
    this.brand = brand;
    this.speed = speed;
  }
  startEngine() {
    console.log(this.brand, this.speed);
  }
}

/* 
    Все инстансы будут иметь ссылку на объект прототипа. Он будет создан
    один раз, и все инстансы будут ссылаться на одну и ту же функцию (start engine).
    В инстансе не будет метода из класса (в данном случае startEngine), при вызове
    он будет искать его в прототипе. 
 */

const car1 = new Car('haval', 300);
const car2 = new Car('opel', 300);

//мы ссылаемся на один и тот же метод.
car1.startEngine();
car2.startEngine();

console.log('------------------------------------');

/* 
    __proto__ - свойство, есть в каждом объекте, указывает на прототип того класса, с
    помощью которого создан этот инстанс. Ссылка на prototype (объект) класса, который его создал.
    prototype - объект класса, на который ссылается __proto__ у объектов. Есть у всего, что может 
    создавать инстансы.

    ВСЕ в javascript является объектом, абсолютно все, следовательно, у всего есть свойство
    __proto__.
*/

console.log(car1.__proto__ === Car.prototype, 'Car'); //true
console.log([].__proto__ === Array.prototype, 'Array'); //true
console.log(''.__proto__ === String.prototype, 'String'); //true

console.log('------------------------------------');

//literal
//примитивы, к которым если мы обратимся через точку, превращаются в объекты
const a = 24;
const b = 24;

const e = '';
const f = '';

//constructor
//здесь созданы объекты, у которых есть свойство value
const c = new Number(24);
const d = new Number(24);

const g = new String('');
const h = new String('');

console.log(a === b, 'primitive NUMBER'); //true
console.log(c === d, 'object NUMBER'); //false
console.log(c.vaule === d.value, 'object value NUMBER'); //true

console.log(e === f, 'primitive STRING'); //true
console.log(g === h, 'object STRING'); //false
console.log(g.value === h.value, 'object value STRING'); //false

console.log(c.__proto__ === Number.prototype, 'Number 1'); //true
console.log(c.__proto__ === d.__proto__, 'Number 2'); //true

const aF = () => {};
console.log(a.__proto__ === Function.prototype);

console.log('------------------------------------');

/* 
    Класс - это фукнция-конструктор под капотом.
*/

console.log(Array.__proto__ === Function.prototype, 'Array proto'); //true
console.log(String.__proto__ === Function.prototype, 'String proto'); //true
console.log(Function.__proto__ === Function.prototype, 'Function proto'); //true

//__proto__ - это объект, значит __proto__ у __proto__ это ссылка на prototype объекта.
console.log(a.__proto__.__proto__ === Object.prototype, '__proto__ __proto__'); //true
//prototype у объекта равен null, чтобы не искать бесконечно __proto__ и не было зацикленностыи
console.log(a.__proto__.__proto__.__proto__ === null, 'proto null'); //true

console.log('------------------------------------');

const n = 22.4353;
//toFixed берется из Number.prototype
//Если метода нет у самого объекта, то он ищет его в __proto__
console.log(n.toFixed(1));

console.log('------------------------------------');

class SuperCar {
  constructor(brand) {
    this.brand = brand;
  }
  startEngine() {
    console.log(this.brand);
  }
  static compareCars(car1, car2) {
    console.log(car1 === car2);
  }
}

//Метод startEngine будет лежать в prototype у SuperCar
//Статический метод compareCars не будет попадать в prototype класса, следовательно доступен только у самого класса
const car3 = new SuperCar('opel');
car3.startEngine(); //opel

class WowCar extends SuperCar {
    constructor(brand) {
        //вызывает конструктор родительского класса.
        super(brand)
    }
}
