export enum ScreeningSeatStatus {
  AVAILABLE = 'AVAILABLE', // آزاد برای رزرو
  HELD = 'HELD', // نگه‌داشته شده موقتاً (تا holdExpireAt)
  RESERVED = 'RESERVED', // رزرو شده (منتظر پرداخت)
  SOLD = 'SOLD', // فروخته شده (پرداخت انجام شده)
  BLOCKED = 'BLOCKED', // مسدود شده (مثلاً صندلی خراب)
}
