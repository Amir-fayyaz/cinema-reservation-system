export class Email {
  private readonly email: string;

  private constructor(email: string) {
    if (!this.isValid(email)) throw new Error('Invalid email');

    this.email = email;
  }

  static create(email: string): Email {
    return new Email(email);
  }

  private isValid(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  getValue(): string {
    return this.email;
  }

  equals(email: Email): boolean {
    return this.email === email.getValue();
  }
}
