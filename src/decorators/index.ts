// Візьміть декоратор DeprecatedMethod і навчіть його працювати з об'єктом, який вміє приймати причину,
// через яку його не варто використовувати, і назву методу, яким його можна замінити, якщо це можливо.
type DeprecatedObject = {
  reason: string,
  recommendMethodName?: string;
}

function DeprecatedMethod(deprecatedObject: DeprecatedObject) {
  return function<T extends (...args: any) => any, A extends any[], R> (
    originalMethod: (...args) => R,
    context: ClassMethodDecoratorContext
  ): any {
    return function (this: T, ...args: A): R {
      console.log(`${String(context.name)}: ${deprecatedObject.reason}`);

      if (deprecatedObject.recommendMethodName) {
        console.log(`Use ${deprecatedObject.recommendMethodName} instead.`)
      }

      return originalMethod.apply(this, args);
    }
  }
}

class TaskOne {
  @DeprecatedMethod({reason: 'method deprecated', recommendMethodName: 'getWord'})
  public getValue(): string {
    return 'word'
  }

  public getWord(): string {
    return 'word'
  }
}

const taskOne = new TaskOne();
taskOne.getValue();

// Створіть декоратори MinLength, MaxLength та Email

function EMail<T extends (...args: any) => any, A extends any[], R> (
  originalMethod: (...args) => R,
  context: ClassMethodDecoratorContext
): any {
  return function (this: T, ...args: A): R {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailPattern.test(args[0])) {
      throw new Error(`Method ${String(context.name)}: Invalid email`);
    }

    return originalMethod.call(this, args)
  }
}

function MinLength(minValue: number) {
  return function<T extends (value: string) => any, A extends string, R> (
    originalMethod: (value: string) => R,
    context: ClassMethodDecoratorContext
  ) {
    return function (this: T, value: A) {
      if (value.length < minValue) {
        throw new Error(`Field ${String(context.name)} length less then ${minValue} symbols`)
      }

      return originalMethod.apply(this, [value]);
    }
  }
}

function MaxValue(maxValue: number) {
  return function<T extends (value: string) => any, A extends string, R> (
    originalMethod: (value: string) => R,
    context: ClassMethodDecoratorContext
  ) {
    return function (this: T, value: A) {
      if (value.length > maxValue) {
        throw new Error(`Field ${String(context.name)} length larger then ${maxValue} symbols limit`);
      }

      return originalMethod.apply(this, [value]);
    }
  }
}

class User {
  password: string | null;

  email: string;

  public getEmail(): string {
    return this.email;
  }

  @EMail
  public setEmail(email: string): void {
    this.email = email;
  }

  //TODO check decorators return type (use method replacement)
  @MinLength(8)
  @MaxValue(12)
  public setPassword(password: string): void {
    this.password = password;
  }

  public getPassword(): string | null {
    return this.password;
  }
}

const user: User = new User();
user.setEmail('test@example.com')
user.setPassword('test1234fsdlkjfl;asdfk');
