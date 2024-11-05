const path = require('path');

const fullPath = path.resolve(__dirname, 'first', 'second', 'path.js')

console.log('Получить путь' ,path.join('first', 'second'));
console.log('Получить абсолютный путь + два' ,path.join(__dirname, 'first', 'second'));
console.log('Получить абсолютный путь две папки назад' ,path.join(__dirname, '..'));
console.log('Получить абсолютный путь + одна' ,path.resolve('first'));
console.log('Парсинг пути' ,path.parse(fullPath));
console.log('Разделитель в OS' ,path.sep);
console.log('Проверка на абсолютный путь' ,path.isAbsolute(fullPath));
console.log('Проверка на абсолютный путь' ,path.isAbsolute('first/second'));
console.log('Название файла' ,path.basename(fullPath));
console.log('Расширение файла файла' ,path.extname(fullPath));

// ------------------------------------------------------------------------------------

const siteUrl = 'http://localhost:8000/users?id=5123'

const url = new URL(siteUrl)
console.log(url)