export abstract class Figure {
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
