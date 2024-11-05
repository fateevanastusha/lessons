/*
    Передавать большие файлы очень дорого и долго. Поэтому прощу разбивать файлы
    на части. "Порция" данных называется BUFFER. (временное хранилище для куска данных)
    STREAM - механизм передачи данных. Суть в том, чтобы передать максимальное количество
    данных за короткий срок. Прикол в том, что юзер уже может видеть данные до того, как
    они передались полностью (пример - видео на ютуб).

    Стримы бывают:

    - readable (чтение)
    - writable (запись)
    - duplex (чтение и запись)
    - transform (чтение, запись и изменение читаемых данных)
*/

const fs = require('fs');

const readStream = fs.createReadStream('./files/test.txt')
const writeStream = fs.createWriteStream('./files/test_copy.txt')
readStream.on('data', (chunk) => {
    writeStream.write('\n--------------\n')
    writeStream.write(chunk)
    writeStream.write('\n--------------\n')
})

