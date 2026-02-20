export class Latitude {
  private readonly value: number;

  private constructor(lat: number) {
    if (!this.isValid(lat)) {
      throw new Error(`Invalid latitude: ${lat}. Must be between -90 and 90.`);
    }
    this.value = lat;
  }

  static create(lat: number): Latitude {
    return new Latitude(lat);
  }

  private isValid(lat: number): boolean {
    return typeof lat === 'number' && !isNaN(lat) && lat >= -90 && lat <= 90;
  }

  getValue(): number {
    return this.value;
  }

  toString(): string {
    return this.value.toString();
  }

  equals(other: Latitude): boolean {
    return this.value === other.getValue();
  }
}
