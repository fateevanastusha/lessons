//Closure, recursion, lexical environment

/* 
    Лексическое окружение - объект (скрытый), содержащий два поля:
        environmentRecords
        environmentReference

    Если мы находимся в глобальном окружении, то environmentReference 
    будет = null. (Так как выше нет ничего).

    В объект environmentRecords будут записываться все объявленные переменные.
    Когда мы к ним обращаемся, мы как бы обращаемся в этот объект по ключу.
    Хранится в памяти, в куче, где создаются все динамические данные.
    (они удаляются когда больше нет ссылок на объект, при сборе памяти).

    Еще есть scope

    while if function создают свои лексические окружения. Объект не создает.
*/

// globalLE {startEngine : Function} => null
let car; // globalLE {car : undefined} => null
car = 'bmw'; // globalLE {car : 'bmw'} => null

function startEngine() {
  //создается скрытая переменная указывающая на предыдущий уровень
  //[[Environment]] => globalLE (ссылка создается в момент инициализации)
  // startEngineLE {} => globalLE
  const car = 'kia'; // startEngineLE {car : 'kia'}
  console.log(`Start ${car}`);
  const foo = () => {
    //[[Environment]] => startEngineLE
    // fooLE {} => startEngineLE
    const model = '520'; // fooLE {model : '520'} => startEngineLE
    console.log(`${car}, ${model}`);
  };

  foo();
}

car = 'opel'; // globalLE {car : 'opel' } => null
startEngine();

//LE с функциями!

//global LE {baz : Function}

baz();

//function expression - появляется в лексическом окружении только когда объявляется.
const foo = () => {}; //globalLE {baz : Function, foo : Function}
const bar = function () {}; //globalLE {baz : Function, foo : Function, bar : Function}
//function declaration - появляется в лексическом окружении сразу, до объявления.
function baz() {
  console.log('baz');
} // уже есть в лексическом окружении!

//LE с переменными!

console.log(a); //undefined
//global LE {baz : Function, foo : Function, bar : Function, a: undefined, someFunc : undefined }

var someFunc = function () {}; //global LE {baz : Function, foo : Function, bar : Function, a: undefined, someFunc : Function }
var a = 'a'; //global LE {baz : Function, foo : Function, bar : Function, a: 'a', someFunc : Function }
const b = 'b'; //global LE {baz : Function, foo : Function, bar : Function, a: 'a', someFunc : Function, b : 'b' }
let c = 'c'; //global LE {baz : Function, foo : Function, bar : Function, a: 'a', someFunc : Function, b : 'b', c : 'c' }

/*
    То есть мы можем вызвать переменную объявленную через var до определения, но она 
    будет равняться undefined. С функцией объявленной через var то же самое.
*/

/* 
    Замыкание - способность функции запомнить свое лексическое окружение
    где она была проинициализирована.
*/

//globalLE {} => null
console.log('----------------------------');
const counterCreator = () => {
  //globalLE { counterCreator: Function } => null
  //[[Environment]] => globalLE
  //counterCreatorLE {} => globalLE  - создается в момент вызова
  let count = 0; //counterCreatorLE {count : 0} => globalLE

  return () => {
    //[[Environment]] => counterCreator  - создается в момент вызова
    //counter1le {} => counterCreatorLE
    console.log(++count);
  };
};

const counter1 = counterCreator(); //globalLE {counterCreator : Function, counter1 : Function}

counter1(); //1
counter1(); //2
counter1(); //3

/* 
    Почему так работает? (1,2,3)
    Так как мы сохранили ссылку на counterCreator в переменной counter, то counterCreatorLE
    не удаляется после того как функция отработала. То есть она продолжает жить в 
    глобальном лексическом окружении благодаря переменной counter1. (в ней хранится
    ссылка).
*/

console.log('----------------------------');

/* 
    Рекурсия.
*/
//globalLE {} => null

const pow = (x, n) => {
  //globalLE { pow : Function } => null
  if (n === 1) {
    return x;
  }
  return x * pow(x, n - 1);
};

console.log(pow(2, 4));

const factorial = (n) => {
    if (n === 1) {
      return n;
    }
    return n * factorial(n - 1);
};

console.log(factorial(5));

console.log('----------------------------');

/* 
    Stack - 

    a()  
    b()  
    c()  
    
    сверху вниз выполняется очередь из стека: 
    по принципу LIFO (LAST IN FIRST OUT) или стопки бумаг..
*/

const aF = () => {};
const bF = () => {
  aF();
};
const cF = () => {
  bF();
};

cF();
