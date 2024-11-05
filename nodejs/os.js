const os = require('os')

console.log(os.platform())
console.log(os.arch())
console.log(os.cpus())

const cpus = os.cpus()

for (let i = 0; i < cpus.lenght - 2; i++) {
    const CPUcore = cpus[i];
    console.log('Run still one node js process')
}

console.log(process.pid)