// Вам потрібно створити умовний тип, що служить для встановлення типу, що повертається з функції.
// Як параметр типу повинен обов'язково виступати функціональний тип.

type ReturnFunctionType<T> = T extends () => infer U ? U : never;

function taskOne(): string {
  return 'test';
}

const functionType: ReturnFunctionType<typeof taskOne> = 'taskOne';

// Вам потрібно створити умовний тип, який приймає функціональний тип з одним параметром (або задовільним)
// та повертає кортеж, де перше значення - це тип, що функція повертає, а другий - тип її параметру
type TaskTwoType<T> = T extends (param: infer P) => infer U ? [U, P] : never;

function taskTwo(t: string): number {
  return 72;
}

const cortege: TaskTwoType<typeof taskTwo> = [5, '7'];

// Створіть тип, який об'єднує властивості двох об'єктів тільки в тому випадку, якщо їхні
// значення мають спільний тип.
// Наприклад: { a: number; b: string } та { b: string; c: boolean } => { b: string; }

type CommonProperties<ObjA, ObjB> = {
  [K in keyof ObjA & keyof ObjB]: ObjA[K] & ObjB[K]
}

const t: CommonProperties<{ a: number; b: string }, { b: Object; c: boolean }> = {b: 'Test'}
