// Визначте інтерфейс, який використовує сигнатуру індексу
// з типами об'єднання.
// Наприклад, тип значення для кожного ключа може бути число | рядок.
interface IFirstTask {
  [key: string]: string | number
}

//Створіть інтерфейс, у якому типи значень у сигнатурі індексу є функціями.
// Ключами можуть бути рядки, а значеннями — функції, які приймають будь-які аргументи
interface ISecondTask {
  [key: string]: (...args: any) => void

  method(): void

  method2(test): number
}

//Опишіть інтерфейс, який використовує сигнатуру індексу для опису об'єкта, подібного до масиву.
// Ключі повинні бути числами, а значення - певного типу
interface IThirdTask {
  [key: number]: any
}

//Створіть інтерфейс з певними властивостями та індексною сигнатурою.
// Наприклад, ви можете мати властивості типу name: string та індексну сигнатуру для додаткових динамічних властивостей.
interface IForthTask {
  name: string,

  [key: string]: string | number
}

// Створіть два інтерфейси, один з індексною сигнатурою,
// а інший розширює перший, додаючи специфічні властивості.
interface IFifthTask {
  [key: string]: string | number | null
}

interface ITask extends IFifthTask {
  name: string
  age: number
}

// Напишіть функцію, яка отримує об'єкт з індексною сигнатурою і перевіряє,
// чи відповідають значення певних ключів певним критеріям (наприклад, чи всі значення є числами).
interface ISixthTask {
  [key: string]: unknown
}

const checkObjectValuesAreNumber = (item: ISixthTask): boolean => {
  return Object.values(item).every(value => typeof value === 'number')
}
