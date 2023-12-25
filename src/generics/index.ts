// Фільтрація масиву
//
// Напишіть узагальнену функцію filterArray(array, condition), яка фільтрує масив
// елементів на основі наданої умови.
const isNumber = <T>(item: T): boolean => {
  return typeof item === 'number';
}

const isString = <T>(item: T): boolean => {
  return typeof item === 'string';
}

const filterArray = <T>(array: Array<T>, condition: (item: T) => boolean): T[] => {
  return array.filter((item: T) => condition(item));
}

const arrayWithValues = [1, '2', 3];
console.log(filterArray(arrayWithValues, isNumber));
console.log(filterArray(arrayWithValues, isString));

// Узагальнений стек
//
// Створіть узагальнений клас Stack, який являє собою стек елементів з методами push, pop і peek.
class Stack<T> {
  private stack: T[] = [];

  push(element: T): void {
    this.stack[this.stack.length] = element;
  }

  pop(): void {
    this.stack = this.stack.slice(0, this.stack.length - 1);
  }

  peek(): T {
    return this.stack[this.stack.length - 1];
  }
}

const stack = new Stack();
stack.push('test');
stack.push(1);
stack.push('typescript');
stack.push(73);
console.log(stack.peek());
stack.pop();
console.log(stack.peek());

// Узагальнений словник
//
// Створіть узагальнений клас Dictionary, який являє собою словник
// (асоціативний масив) з методами set, get і has. Обмежте ключі тільки валідними типами для об'єкта
class Dictionary<TValue> {
  private dictionary: {[key: string]: TValue}[] = [];

  set(key: string, value: TValue) {
    if (!this.has(key)) {
      this.dictionary[key] = value;
    }
  }

  get(key: string): TValue | undefined {
    return this.dictionary[key];
  }

  has(key: string): boolean {
    return this.dictionary.hasOwnProperty(key);
  }
}

const dictionary = new Dictionary();
dictionary.set('test', 'check');
dictionary.set('encapsulate', 'hide');
dictionary.set('test', 'check');
console.log(dictionary.get('test'));
console.log(dictionary.get('encapsulate'));

