export class BirthDate {
  private readonly value: Date;

  private constructor(date: Date) {
    this.validate(date);
    this.value = date;
  }

  private validate(date: Date): void {
    if (!(date instanceof Date) || isNaN(date.getTime())) {
      throw new Error('Invalid date');
    }
    const now = new Date();
    let age = now.getFullYear() - date.getFullYear();
    const m = now.getMonth() - date.getMonth();
    if (m < 0 || (m === 0 && now.getDate() < date.getDate())) {
      age--;
    }
    if (age < 5 || age > 120) {
      throw new Error('Age must be between 5 and 120 years');
    }
  }

  static create(date: Date): BirthDate {
    return new BirthDate(date);
  }

  getValue(): Date {
    return new Date(this.value);
  }

  getAge(): number {
    const now = new Date();
    let age = now.getFullYear() - this.value.getFullYear();
    const m = now.getMonth() - this.value.getMonth();
    if (m < 0 || (m === 0 && now.getDate() < this.value.getDate())) {
      age--;
    }
    return age;
  }

  equals(other: BirthDate): boolean {
    return this.value.getTime() === other.getValue().getTime();
  }
}
