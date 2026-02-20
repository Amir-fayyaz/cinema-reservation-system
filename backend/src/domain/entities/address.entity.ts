import { Latitude } from '../value-objects/latitude.vo';
import { Longitude } from '../value-objects/longitude.vo';

export class Address {
  private readonly id: string;
  private province: string;
  private city: string;
  private latitude: Latitude;
  private longitude: Longitude;
  private fullAddress?: string;
  private readonly createdAt: Date;
  private updatedAt: Date;
  constructor(
    id: string,
    province: string,
    city: string,
    latitude: Latitude,
    longitude: Longitude,
    fullAddress: string = '',
    createdAt: Date,
    updatedAt: Date,
  ) {
    this.id = id || crypto.randomUUID();
    this.province = province;
    this.city = city;
    this.latitude = latitude;
    this.longitude = longitude;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.fullAddress = fullAddress;
  }

  getCity(): string {
    return this.city;
  }

  getProvince(): string {
    return this.province;
  }

  getLatitude(): Latitude {
    return this.latitude;
  }
  getLongitude(): Longitude {
    return this.longitude;
  }

  getFullAddress(): string | undefined {
    return this.fullAddress;
  }

  updateInfo(data: Address): void {
    this.city = data.city;
    this.province = data.province;
    this.latitude = data.latitude;
    this.longitude = data.longitude;
    this.fullAddress = data.fullAddress;
    this.updatedAt = new Date();
  }

  static fromPersistence(data: {
    id: string;
    province: string;
    city: string;
    latitude: number;
    longitude: number;
    fullAddress: string;
    createdAt: Date;
    updatedAt: Date;
  }): Address {
    return new Address(
      data.id,
      data.province,
      data.city,
      Latitude.create(data.latitude),
      Longitude.create(data.longitude),
      data.fullAddress,
      data.createdAt,
      data.updatedAt,
    );
  }

  toPersistence() {
    return {
      id: this.id,
      province: this.province,
      city: this.city,
      latitude: this.latitude.getValue(),
      longitude: this.longitude.getValue(),
      fullAddress: this.fullAddress,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
