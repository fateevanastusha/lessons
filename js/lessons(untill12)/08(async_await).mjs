//Async Await
/*
    Иногда нужно гарантировать последовательность асихнронных вызовов,
    Мы можем это сделать через callback hell:
*/

fetch('https://google.com/query=js').then((data) => {
  fetch('https://yahoo.com/query=js').then((data) => {
    fetch('https://bing.com/query=js').then((data) => {});
  });
});

//Как этого избежать?

fetch('https://google.com/query=js')
  .then((data) => fetch('https://yahoo.com/query=js').then((data) => {}))
  .then((data) => fetch('https://bing.com/query=js').then((data) => {}))
  .catch((e) => console.log(e));

//ASYNC AWAIT

const foo = async () => {
  try {
    //дожидается выполнения асинхронного кода
    const data1 = await fetch('https://yahoo.com/query=js');
    const data2 = await fetch('https://bing.com/query=js');
    const data3 = await fetch('https://google.com/query=js');
    console.log(data1.url); //yahoo
    console.log(data2.url); //bing
    console.log(data3.url); //google
  } catch (e) {
    console.log('Error', e);
  }
  return 'a';
};

const result = await foo();
console.log(result, 'this is result');

/* 
  https://www.yahoo.com/query=js
  https://www.bing.com/query=js?toWww=1&redig=DBCF8D8AAAE34E06B645A19CCDA34900
  https://google.com/query=js
  a this is result
  log

  в порядке написанного благодаря await!
*/

//Статические методы Promise.
/* 
  статические методы - методы которые есть в самом классе, но нет в инстансах
  в Promise - есть
  в promise (самостоятельно созданная переменная) - нет
*/

const promise1 = fetch('https://google.com/query=js');
const promise2 = fetch('https://yahoo.com/query=js');
const promise3 = fetch('https://bing.com/query=js');

const promises = [promise1, promise2, promise3];

//1) ALL

/* 
  - возвращает массив данных в том же самом порядке, в каком переданы
  - резолвится, только если ВСЕ элементы массива зарезолвились
*/

// const promiseAll = Promise.all(promises);
// promiseAll
//   .then((data) => {
//     console.log(data.map((a) => a.url), 'RESOLVE promise all'); // ['https://google.com/query=js', 'https://yahoo.com/query=js', 'https://bing.com/query=js']
//   })
//   .catch((e) => console.log(e, 'REJECT promise all'));

// 2) RACE

/* 
  - возвращает один результат (первый ответ, даже если ошибка (при ошибке в catch улетаем))
  - возвращает первый любой ответ (если резолв - то в then, если ошибка - то в catch)
*/

// const promiseRace = Promise.race(promises);
// promiseRace
//   .then((data) => console.log(data.url, 'RESOLVE promise race') /*вернет первый зарезолвленный промис */)
//   .catch((e) => console.log(e, 'REJECT promise race'));

// 3) ANY

/*
  - возвращает один результат (самый первый resolve)
  - возвращает первый resolve
  - попадем в catch если ВСЕ элементы массива вернут ошибку (вернет массив ошибок)
*/

// const promiseAny = Promise.any(promises);
// promiseAny
//   .then((data) => console.log(data, 'RESOLVE promise any') /*вернет первый зарезолвленный промис */)
//   .catch((e) => console.log(e, 'REJECT promise any'));

// 4) ALLSETTLED

/*
  - возвращает массив статусов (результатов)
  - catch никогда не отрабатывает, он собирает всю информацию о результатах в then
*/

// const promiseAllSettled = Promise.allSettled(promises);
// promiseAllSettled
//   .then((data) =>
//     console.log(
//       data.map((a) => a.status),
//       'RESOLVE promise all settled',
//     ),
//   ) //[ 'rejected', 'fulfilled', 'fulfilled' ]
//   .catch((e) => console.log(e, 'REJECT promise all settled'));
