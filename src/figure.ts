abstract class Figure {
  public readonly name: string;
  public readonly color: string;
  protected a: number;
  protected b?: number;
  protected c?: number;

  protected constructor(name: string, color: string, a: number)
  protected constructor(name: string, color: string, a: number, b: number)
  protected constructor(name: string, color: string, a: number, b: number, c: number)
  protected constructor(name: string, color: string, a: number, b?: number, c?: number) {
    this.name = name;
    this.color = color;
    this.a = a;
    if (b) {
      this.b = b;
    }
    if (c) {
      this.c = c;
    }
  }

  abstract calculateArea(): number
}

class Square extends Figure {
  constructor(name: string, color: string, a: number) {
    super(name, color, a);
  }

  calculateArea(): number {
    return this.a * this.a;
  }
}

class Circle extends Figure {
  constructor(name: string, color: string, a: number) {
    super(name, color, a);
  }

  calculateArea(): number {
    return Math.PI * this.a * this.a;
  }
}

class Rectangle extends Figure {
  constructor(name, color, a, b) {
    super(name, color, a, b);
  }

  calculateArea(): number {
    return this.a * this.b;
  }
}

class Triangle extends Figure {
  constructor(name, color, a, b, c) {
    super(name, color, a, b, c);
  }

  calculateArea(): number {
    const p = (this.a + this.b + this.c) / 2;

    return Math.sqrt((p * (p - this.a) * (p - this.b) * (p - this.c)));
  }
}

const square = new Square('Square', 'blue', 5);
console.log(square.calculateArea());

const circle = new Circle('Circle', 'turquoise', 6);
console.log(circle.calculateArea());

const rec = new Rectangle('Rectangle', 'green', 5, 8);
console.log(rec.calculateArea());

const triangle = new Triangle('Triangle', 'red', 3, 4, 5)
console.log(triangle.calculateArea());