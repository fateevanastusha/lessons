/* 
    Каррирование - уменьшение арности функции. Это функция высшего порядка.
    Арность - количество принимаемых функции аргументов.
*/

const m = (a, b, c) => a * b * c;

console.log(m(1, 2, 3)); //6

const curriedM = (a) => (b) => (c) => a * b * c;

//аналогичная запись:
const _curriedM2 = function (a) {
  return function (b) {
    return function (c) {
      return a * b * c;
    };
  };
};

console.log(curriedM(1)(2)(3)); //6

//с помощью каррирования можно сделать частичное применение аргументов
//первый аргумент всегда будет 5

const mBy5 = curriedM(5);
console.log(mBy5(2)(5)); //50

//Где может использоваться?
/* 
    Например, необходимо переиспользовать какую-то функцию с первоначальным одинаковым аргументом.
    Логгер - для логов и ошибок, пример:
*/

const log = (level) => (message) => console[level](message);

const logInfo = log('log');
const errorInfo = log('error');

logInfo('example log');
errorInfo('example error');
