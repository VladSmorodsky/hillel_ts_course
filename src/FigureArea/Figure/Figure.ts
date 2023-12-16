export abstract class Figure {
  protected constructor(public readonly name: string, public readonly color: string) {}

  abstract calculateArea(): number
}
