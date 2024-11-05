//THIS CALL BIND APPLY

/* 
    this 
    - скрытая переменная, которая ссылается на объект. 
    На что ссылается this определяется в момент вызова.
*/

//1) global scope

console.log(this); //{} - ссылается на глобальный объект.

//2) arrow function - function - methods

const a = () => {
  console.log(this, 'this is arrow function'); //стрелочная фукнция не имеет своего scope поэтому ссылается на глобальный
};
a();

function b() {
  console.log(this, 'this is function'); // создает свое лексическое окружение
}
b();

const car = {
  brand: 'bmw',
  speed: 200,
  showBrand: () => {
    console.log(this.brand, 'this is arrow function method');
  },
  showSpeed() {
    console.log(this.speed, 'this is method');
  },
  showFoo() {
    const foo = () => {
      console.log(this.brand, 'foo');
    };
    foo();
  },
};
car.showBrand(); ///undefined
// стрелочная функция (даже в объекте) не создает своего лексического окружения, поэтому this ссылается на глобальный объект
car.showSpeed(); //200
// создал свое лекчисеское окружение
const test = car.showSpeed;
test(); //undefined
/* так как на что ссылается this определяется в момент вызова, а так как слева от test (.test()) ничего не стоит, то и ссылается он на глобальный
пустой объект, из-за чего получаем undefined. */
car.showFoo();

console.log('------------------------------------------');
//Для чего нужен this?
const car1 = {
  brand: 'bmw',
};
const car2 = {
  brand: 'haval',
};

function showBrand() {
  console.log(this.brand, 'function show branch');
}

car1.showBrand = showBrand;
car2.showBrand = showBrand;

car1.showBrand(); //bmw
car2.showBrand(); //haval

console.log('------------------------------------------');

//3) call apply bind
// позволяют подменить контекст вызова. Вызвать метод в другом контексте.

const car3 = {
  color: 'red',
  showColor(a, b) {
    console.log(`${this.color}-${a}-${b}`);
  },
};
const car4 = {
  color: 'yellow',
  showColor() {
    console.log(this.color);
  },
};
const scooter = {
  color: 'pink',
};

//CALL - вызывает функцию, параметры принимает через запятую
const callResult = car3.showColor.call(car4, 10, 20); //yellow-10-20

//APPLY - вызывает функцию, параметры принимает через массив
const applyResult = car3.showColor.apply(car4, [30, 40]); //yellow-30-40

//BIND - возвращает функцию, параметры принимает через запятую
const bindResult = car3.showColor.bind(car4, 50, 60);
bindResult(); //yellow-50-60

car3.showColor.bind(scooter, 70, 80).call(car4); //pink-70-80
/*Перепривязать конеткст можно только один раз. Call в данном случае просто сразу вызывает функцию, которую bind возвращает,
но не переопределяет контекст */

console.log('------------------------------------------');

const car5 = {
  brand: 'kia',
  show() {
    console.log(this.brand);
  },
};
const car6 = {
  brand: 'bmw',
  show: (a, b) => {
    console.log(`${this.brand}-${a}-${b}`);
  },
};

car6.show.call(car5, 90, 100); //undefined-90-100
//так как у this контекст уже закрепляется за глобальным скоупом

console.log('------------------------------------------');

//4) function constructor - функция, создающая объект, и вызывающаяся только через new

function Car(brand) {
  //{}
  this.brand = brand;
  //return {brand: 'bmw'}
}

const car7 = new Car('bmw');
const car8 = new Car('haval');

console.log(car7); //{ brand: 'bmw' }
console.log(car8); //{ brand: 'haval' }