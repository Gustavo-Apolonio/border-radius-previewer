export class BorderModel {
  constructor(radius: string, values: number[]) {
    this.radius = radius;
    this.values = values;
    this.originalValues = values;
  }

  public radius: string;
  public values: number[];
  public originalValues: number[];
}
