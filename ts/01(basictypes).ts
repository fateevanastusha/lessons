/* 

    typescript - обертка над java script, позволяющая задавать типы

*/

//1) boolean
let a: boolean = false;

//2) number
let b: number = 6;
let b1: number = 7.1;
let b2: number = 0xff0d;

//3) string
let c: string = 'Nastya';

//4) null/undefined
let d1: null = null;
let d2: undefined = undefined;

//5) void
// Подходит для определения отсутствующего типа, как будто функция ничего не возвращает
const say = (): void => {
  console.log('hello');
};

//6) array
let e1: number[] = [1, 2, 3];
let e2: Array<number> = [1, 2, 3];

//7) tuple
let f: [string, number] = ['1', 2];

//8) any - вообще что угодно, но так делать нельзя
let j: any = 'Nastya';
j = 23;

//9) enum
enum Directions {
  UP = 'up',
  DOWN = 'down',
  LEFT = 'left',
  RIGHT = 'right',
}
Directions.UP; //up

//10) never - когда функция никогда не завершает исполнения (возвращает ошибку либо бесконечный цикл)

//11) object - объектов и не примитивов
let g: object = { name: 'Nastya' };

//12) type - пользовательские типы
type Name = string; //custom type
let i: Name = 'Nastya';
