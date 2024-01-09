// Вам потрібно створити тип DeepReadonly який буде робити доступними тільки для читання навіть властивості
// вкладених обʼєктів.
class TaskOne {
  name: string;
  objectType: {
    test: string;
  }
}

type DeepReadonly<T> = {
  readonly [K in keyof T]: DeepReadonly<T[K]>
}

let taskOneExample: DeepReadonly<TaskOne> = {
  name: 'John',
  objectType: {
    test: 'yes'
  }
};

// taskOneExample.testName = 'Jack' // Error: Attempt to assign to const or readonly variable

// Вам потрібно створити тип DeepRequireReadonly який буде робити доступними тільки для читання навіть властивості
// вкладених обʼєктів та ще й робити їх обовʼязковими.

interface ITaskTwo {
  testName?: string,
  objectType?: {
    test?: string
  }
}

type DeepRequireReadonly<T> = {
  readonly [K in keyof T]-?: DeepRequireReadonly<T[K]>
}

type TaskTwo = DeepRequireReadonly<ITaskTwo>

let taskTwo: DeepRequireReadonly<TaskTwo> = {
  testName: null,
  objectType: {
    test: 'Test'
  }
}

// Вам потрібно сворити тип UpperCaseKeys, який буде приводити всі ключи до верхнього регістру.
type UpperCaseKeys<T> = {
  readonly [K in keyof T & string as `${Uppercase<K>}` ]: T[K]
}

class TaskThree {
  task: string;
  test: boolean
}

const upperKeysObj: UpperCaseKeys<TaskThree> = {
  TASK: 'Task 3',
  TEST: true
}

// І саме цікаве. Створіть тип ObjectToPropertyDescriptor,
// який перетворює звичайний обʼєкт на обʼєкт де кожне value є дескриптором.

class TaskFour {
  propertyOne: string
  readonly propertyTwo: boolean
}

type ObjectToPropertyDescriptor<T> = {
  [K in keyof T]: PropertyDescriptor
}

const taskFour: ObjectToPropertyDescriptor<TaskFour> = {
  propertyOne: {
    "value": "John",
    "writable": false,
    "enumerable": false,
  },
  propertyTwo: {
    "value": "John",
    "writable": false,
    "enumerable": false,
    "configurable": false
  },
}

