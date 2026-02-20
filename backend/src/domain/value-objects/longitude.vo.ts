export class Longitude {
  private readonly value: number;

  private constructor(lng: number) {
    if (!this.isValid(lng)) {
      throw new Error(
        `Invalid longitude: ${lng}. Must be between -180 and 180.`,
      );
    }
    this.value = lng;
  }

  static create(lng: number): Longitude {
    return new Longitude(lng);
  }

  private isValid(lng: number): boolean {
    return typeof lng === 'number' && !isNaN(lng) && lng >= -180 && lng <= 180;
  }

  getValue(): number {
    return this.value;
  }

  toString(): string {
    return this.value.toString();
  }

  equals(other: Longitude): boolean {
    return this.value === other.getValue();
  }
}
