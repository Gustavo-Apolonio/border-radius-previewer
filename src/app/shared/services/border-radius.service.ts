import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BorderRadiusService {
  constructor() {}

  getBorderRadiusString(values: number[] = [0, 0, 0, 0, 0, 0, 0, 0]) {
    return `border-radius: ${values[0]}% ${values[1]}% ${values[2]}% ${values[3]}% / ${values[4]}% ${values[5]}% ${values[6]}% ${values[7]}% !important;`;
  }

  generateRandomRadiusValues(
    values: null | number[] = [0, 0, 0, 0, 0, 0, 0, 0]
  ) {
    if (!values) return [0, 0, 0, 0, 0, 0, 0, 0];

    const valuesCopy = [...values];
    values.map((value, index) => {
      valuesCopy[index] = this.randomInt(1, 100);
    });

    return [...valuesCopy];
  }

  private randomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min)) + min;
  }
}
