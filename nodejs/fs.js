const fs = require('fs');
const path = require('path');

const pathForFiles = path.resolve(__dirname);

//создать директорию
// fs.mkdir(path.join(pathForFiles, 'dir'), (err) => {
//   if (err) {
//     console.log(err);
//     return;
//   }
//   console.log('dir is created');
// });

//удалить директорию
// fs.rmdir(path.join(pathForFiles, 'dir'), (err) => {
//   if (err) {
//     console.log(err);
//     return;
//   }
//   console.log('dir is removed');
// });

//переписать файл
// fs.writeFile(path.join(pathForFiles, 'test.txt'), 'lalalla', (err) => {
//   if (err) {
//     console.log(err);
//     return;
//   }
//   console.log('file is created');
// });

//дописать в файл
// fs.appendFile(path.join(pathForFiles, 'test.txt'), 'NASTYA', (err) => {
//   if (err) {
//     console.log(err);
//     return;
//   }
//   console.log('file is appended');
// });

const writeFileAsync = async (path, data) => {
  return new Promise((resolve, reject) =>
    fs.writeFile(path, data, (err) => {
      if (err) {
        return reject(err.message);
      }
      resolve('file writed');
    }),
  );
};

const appendFileAsync = async (path, data) => {
  return new Promise((resolve, reject) =>
    fs.appendFile(path, data, (err) => {
      if (err) {
        return reject(err.message);
      }
      resolve('file writed');
    }),
  );
};

const readFileAsync = async (path) => {
  return new Promise((resolve, reject) =>
    fs.readFile(path, { encoding: 'utf-8' }, (err, data) => {
      if (err) {
        return reject(err.message);
      }
      resolve(data);
    }),
  );
};

const deleteFileAsync = async (path) => {
    return new Promise((resolve, reject) =>
      fs.rm(path, (err) => {
        if (err) {
          return reject(err.message);
        }
        resolve('file deleted');
      }),
    );
  };

// writeFileAsync(path.join(pathForFiles, 'test1.txt'), 'START DATA!')
//   .then(() => appendFileAsync(path.join(pathForFiles, 'test1.txt'), 'NEW DATA!'))
//   .then(() => readFileAsync(path.join(pathForFiles, 'test1.txt')))
//   .then((data) => console.log(data))
//   .then(() => deleteFileAsync(path.join(pathForFiles, 'test1.txt')))
//   .catch((error) => console.log(error));
