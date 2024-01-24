// Створіть декоратори MinLength, MaxLength та Email

function Email<T extends User>(target: T, propertyKey: string | symbol): void {
  let emailValue: string;

  const originalSet = Object.getOwnPropertyDescriptor(target, propertyKey)?.set;

  Object.defineProperty(target, propertyKey, {
    get() {
      return emailValue;
    },
    set(newEmailValue: string) {
      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailPattern.test(newEmailValue)) {
        throw new Error(`Field ${String(propertyKey)}: Invalid email`);
      }

      originalSet?.call(target, newEmailValue);
    },
    configurable: true
  });
}

function MinLength(minLength: number) {
  return function<T extends {}> (target: T, propertyKey: string | symbol): void {
    let value: string;

    const originalSet = Object.getOwnPropertyDescriptor(target, propertyKey)?.set;

    Reflect.defineProperty(target, propertyKey, {
      get() {
        return value;
      },
      set(newValue: string) {
        if (newValue.length < minLength) {
          throw new Error(`The ${String(propertyKey)} value less than ${minLength} symbols`);
        }

        originalSet?.call(target, newValue);
      },
      configurable: true
    });
  }
}

function MaxLength(maxLength: number) {
  return function<T extends {}> (target: T, propertyKey: string | symbol) {
    let value: string;

    const originalSet = Object.getOwnPropertyDescriptor(target, propertyKey)?.set;

    Reflect.defineProperty(target, propertyKey, {
      get() {
        return value;
      },
      set(newValue: string) {
        if (newValue.length > maxLength) {
          throw new Error(`The ${String(propertyKey)} value larger than ${maxLength} symbols`);
        }

        originalSet?.call(target, newValue)
      },
      configurable: true
    });
  }
}

class User {

  @MinLength(4)
  @MaxLength(30)
  @Email
  private email: string;

  public getEmail(): string {
    return this.email;
  }

  public setEmail(email: string): void {
    this.email = email;
  }
}

const user: User = new User();
user.setEmail('test@xample.com');