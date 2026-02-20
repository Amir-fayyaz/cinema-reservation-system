import { GenderEnum } from '@shared/enums/gender.enum';
import { ApplicationRoles } from '@shared/enums/role-app.enum';
import { BirthDate } from '../value-objects/birthDate.vo';
import { Email } from '../value-objects/email.vo';
import { Phone } from '../value-objects/phone.vo';

export class User {
  public readonly id: string;
  private fullName: string;
  private phone: Phone;
  private password: string;
  private role: ApplicationRoles;
  private email: Email;
  private gender: GenderEnum;
  private birthDate: BirthDate;
  public readonly createdAt: Date;
  public updatedAt: Date;

  constructor(
    fullName: string,
    phone: Phone,
    password: string,
    email: Email,
    gender: GenderEnum,
    birthDate: BirthDate,
    role: ApplicationRoles = ApplicationRoles.USER,
    id?: string,
    createdAt?: Date,
    updatedAt?: Date,
  ) {
    this.id = id || crypto.randomUUID();
    this.fullName = fullName;
    this.phone = phone;
    this.password = password;
    this.email = email;
    this.gender = gender;
    this.birthDate = birthDate;
    this.role = role;
    this.createdAt = createdAt || new Date();
    this.updatedAt = updatedAt || new Date();
  }

  getFullName(): string {
    return this.fullName;
  }

  getPhone(): Phone {
    return this.phone;
  }

  getPassword(): string {
    return this.password;
  }

  getRole(): ApplicationRoles {
    return this.role;
  }

  getEmail(): Email {
    return this.email;
  }

  getGender(): GenderEnum {
    return this.gender;
  }

  getBirthDate(): BirthDate {
    return this.birthDate;
  }

  changeFullName(newFullName: string): void {
    this.fullName = newFullName;
    this.updatedAt = new Date();
  }

  changePhone(newPhone: Phone): void {
    this.phone = newPhone;
    this.updatedAt = new Date();
  }

  changePassword(newHashedPassword: string): void {
    this.password = newHashedPassword;
    this.updatedAt = new Date();
  }

  changeEmail(newEmail: Email): void {
    this.email = newEmail;
    this.updatedAt = new Date();
  }

  changeRole(newRole: ApplicationRoles): void {
    this.role = newRole;
    this.updatedAt = new Date();
  }

  static fromPersistence(data: {
    id: string;
    fullName: string;
    phone: string;
    password: string;
    email: string;
    gender: GenderEnum;
    birthDate: Date;
    role: ApplicationRoles;
    createdAt: Date;
    updatedAt: Date;
  }): User {
    return new User(
      data.fullName,
      Phone.create(data.phone),
      data.password,
      Email.create(data.email),
      data.gender,
      BirthDate.create(data.birthDate),
      data.role,
      data.id,
      data.createdAt,
      data.updatedAt,
    );
  }

  toPersistence() {
    return {
      id: this.id,
      fullName: this.fullName,
      phone: this.phone.getValue(),
      password: this.password,
      email: this.email.getValue(),
      gender: this.gender,
      birthDate: this.birthDate.getValue(),
      role: this.role,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
