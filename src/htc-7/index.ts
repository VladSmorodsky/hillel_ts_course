// Напишіть функцію isString, яка перевірятиме, чи є передане значення рядком.
// Потім використовуйте її для звуження типу змінної.
const isString = (value: any) => {
  return typeof value === 'string';
}

const value: string | number = 'homeTask_TypeGuard'

if (isString(value)) {
  console.log('[task1] ', value.slice(value.indexOf('_'), value.length));
}

// У вас є масив з елементами різних типів. Напишіть функцію, яка приймає цей масив і фільтрує його так,
// щоб у підсумку в ньому залишилися тільки рядки. Використовуйте захисника типу для цього завдання.
const arrayValues: any = [1, 'task', null, undefined, '2'];

const isStringElement = (value: any): value is string => {
  return typeof value === 'string';
}

const filteredArray = arrayValues.filter(value => isStringElement(value));
console.log('[task2] ', filteredArray)

// У вас є об'єкт, який може містити довільні властивості.
// Напишіть функцію, яка приймає цей об'єкт і повертає значення однієї з властивостей,
// якщо воно існує і має певний тип.
const objectWithValues = {a: null, 1: 'string', data: {'username': 'Test'}, undefined}

type User = { 'username': 'Test' }

const isUserObject = (value: any): value is User => {
  return value && typeof value === 'object' && 'username' in value;
}

const userObject = Object.values(objectWithValues).find(value => isUserObject(value));
console.log('[task3] ', userObject);

// Створіть кілька захисників типу, кожен з яких
// перевіряє певний аспект об'єкта (наприклад, наявність певної властивості або її тип).
// Потім напишіть функцію, яка використовує цих захисників у комбінації
// для звуження типу об'єкта до більш конкретного типу.
enum ManufactureEuropeEnum {
  GERMANY = 'Germany'
}

enum ManufactureAmericaEnum {
  USA = 'USA',
}

type ManufactureCountry = ManufactureEuropeEnum | ManufactureAmericaEnum

enum CarTypeEnum {
  SEDAN = 'Sedan',
  CROSSOVER = 'Crossover',
  SUV = 'SUV'
}

interface ICar {
  model: string,
  country: ManufactureCountry,
  type: CarTypeEnum,
}

const cars: ICar[] = [
  {
    model: 'Ford',
    country: ManufactureAmericaEnum.USA,
    type: CarTypeEnum.CROSSOVER
  },
  {
    model: 'Mercedes',
    country: ManufactureEuropeEnum.GERMANY,
    type: CarTypeEnum.SEDAN
  }
];

const isAmericanManufacture = (country: any): country is ManufactureCountry => {
  return Object.values(ManufactureAmericaEnum).includes(country);
}

const isCrossoverType = (carType: any): carType is CarTypeEnum.CROSSOVER => {
  return Object.values(CarTypeEnum).includes(carType) && carType === CarTypeEnum.CROSSOVER;
}

const findAmericanCrossoverCars = (cars: ICar[]) => {
  return cars.filter((car: ICar) => isAmericanManufacture(car.country) && isCrossoverType(car.type));
}

console.log('[task4 ]', findAmericanCrossoverCars(cars));

// У вас є змінна, яка може бути одного з декількох типів (наприклад, рядок або число).
// Напишіть функцію, яка приймає цю змінну і виконує довільні операції, специфічні для кожного з типів.
let taskFiveValue: string | number = 'test';

const makeOperations = (value: any) => {
  switch (typeof value) {
    case 'number':
      console.log('[task5 ] Addition: ', value + value);
      console.log('[task5 ] Multiplication: ', value * value);
      break;
    case 'string':
      console.log('[task5 ] Concatenation: ', value + value);
      console.log('[task5 ] Get index of "s": ', value.indexOf('s'));
      break;
    default:
      console.log('[task5 ] Nothing happen. Add type and condition');
  }
}

makeOperations(taskFiveValue);

// Створіть захисник типу, який перевірятиме, чи є передане значення функцією.
// Потім напишіть функцію, яка використовує цей гард для звуження типу змінної і
// викликає передану функцію, якщо вона існує.
const isFunction = (value: any): value is Function => {
  return typeof value === 'function';
}

function taskSixFunction() {
  console.log('[task6]');
}

const runFunction = () => {
  if (isFunction(taskSixFunction)) {
    taskSixFunction();
  }
}

runFunction();

// Створіть класи з ієрархією успадкування і потім напишіть функцію,
// яка використовує захисник типу для звуження типу об'єктів, що базуються на цій ієрархії.
abstract class Table {
  constructor(public length: number, public width: number, public height: number) {
  }

  abstract getSize(): string;
}

class StandTable extends Table {
  constructor(public length: number, public width: number, public height: number, private maxHeight: number) {
    super(length, width, height);
  }

  setHeight(height: number): void {
    this.height = height;
  }

  setMaxHeight(): void {
    this.height = this.maxHeight;
  }

  getSize(): string {
    return `${this.length}*${this.width}*${this.height}-${this.maxHeight}`;
  }
}

class StandardTable extends Table {
  getSize(): string {
    return `${this.length}*${this.width}*${this.height}`;
  }
}

const tables: Table[] = [
  new StandTable(120, 60, 60, 120),
  new StandardTable(120, 60, 60)
];

const isStandTable = (table: Table): table is StandTable => {
  return table instanceof StandTable;
}

console.log('[task7]')
tables.forEach((table: Table, index: number) => {
  if (isStandTable(table)) {
    table.setMaxHeight();
  }

  console.log(index, table.height);
})


