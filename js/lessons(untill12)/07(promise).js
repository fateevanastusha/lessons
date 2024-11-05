/* 
    Promise 
    решают проблемы с работой с асинхронным кодом
*/

//Как было до промисов?

const fetch = (url, callback) => {
  //...
  const err = undefined;
  const data = 'DATA';
  callback(err, data);
};

fetch('https://books.com/authors', (err, data) => {
  if (err) {
    console.log(err);
  } else {
    console.log(data, 'data');
    fetch('https://books.com/authors/75', (err, data) => {
      if (err) {
        console.log(err);
      } else {
        console.log(data, 'data');
        fetch('https://books.com/authors/75/books', (err, data) => {
          if (err) {
            console.log(err);
          } else {
            console.log(data, 'data');
          }
        });
      }
    });
  }
});

//АД коллбеков! Для решения этого придумали промисы

/* 
    Промис - обещание.
*/

const server = {
  getData() {
    return new Promise((res, rej) => {
      res('DATA');
    });
  },
};

const promise = server.getData();

promise.then((data) => console.log(data)); //Promise { <pending> } - состояние промиса

//Как работает класс Promise изнутри?
//Возвращает либо resolve, либо reject.

function NewPromise(cb) {
  const resolve = (result) => {
    return {
      state: 'fullfilled',
      result,
    };
  };
  const reject = (error) => {
    return {
      state: 'rejected',
      error,
    };
  };

  cb(resolve, reject);
}

//Как обрабатывать промисы?
const fs = require('fs');
const readFile = (path) => {
  return new Promise((res, rej) => {
    fs.readFile(path, (err, file) => {
      if (err) {
        rej(err);
      } else {
        res(file);
      }
    });
  });
};
const readFilePromise = readFile('test.txt'); //здесь лежит промис
//Получить данные - then
readFilePromise.then(
  (data) => {
    console.log('then', data);
  },
  //можно передать еще ловитель ошибок
  (err) => {
    console.log('then error', err);
  },
);
//Получить ошибку - catch
readFilePromise.catch((err) => console.log('catch', err));
//После catch и then - finally. Отработает в любом случае в конце.
readFilePromise.finally(() => console.log('finally'));

console.log('---------------------------------------------');

// const pr = readFile('test.txt');
// pr.then((data) => {
//   console.log('then 1', data);
//   return Promise.resolve('data from then 1');
// })
//   .then((data) => {
//     console.log('then 2', data);
//     throw new Error('ERROR');
//   })
//   .then((data) => {
//     console.log('then 3', data);
//   })
//   .catch((err) => {
//     console.log('catch 1', err);
//     return 78;
//   })
//   .then((data) => {
//     console.log('then 4', data);
//   });

console.log('---------------------------------------------');

/* 
  FINALLY работает по типу дырки. Он не забирает данные, и не отдает. Он просто пропускает их сквозь
  себя в следующий then. (ошибку таки выкинет) Так же он не обязательно работает в конце, если после него есть then - они сработают
  ПОСЛЕ finally. 
*/
const pr2 = readFile('test.txt');
pr2
  .then((data) => {
    console.log('then 1', data);
    return Promise.resolve('10');
  })
  .finally((data) => {
    console.log('finally', data); //undefined
    return 30; //уйдет вникуда
  })
  .then((data) => {
    console.log('then 2', data); //10
  });
