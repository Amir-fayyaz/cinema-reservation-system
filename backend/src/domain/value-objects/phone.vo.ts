export class Phone {
  private readonly value: string;

  private constructor(phone: string) {
    const phoneRegex = /^09[0-9]{9}$/;
    if (!phoneRegex.test(phone)) {
      throw new Error('Invalid phone number');
    }
    this.value = phone;
  }

  static create(phone: string): Phone {
    return new Phone(phone);
  }

  getValue(): string {
    return this.value;
  }

  equals(phone: Phone): boolean {
    return this.value === phone.getValue();
  }
}
