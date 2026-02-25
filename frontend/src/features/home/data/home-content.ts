import type { Movie, SeatStatus, Showtime } from "../types";

export const movies: Movie[] = [
  {
    id: 1,
    title: "شهر خاموش",
    genre: "هیجان‌انگیز / معمایی",
    duration: "118 دقیقه",
    rating: 8.4,
    language: "دوبله فارسی",
    imageGradient: "from-rose-500/80 via-orange-400/70 to-amber-300/60",
    tag: "پرفروش",
  },
  {
    id: 2,
    title: "مدار آخر",
    genre: "علمی‌تخیلی / اکشن",
    duration: "132 دقیقه",
    rating: 8.1,
    language: "زیرنویس",
    imageGradient: "from-cyan-500/80 via-sky-400/70 to-indigo-500/60",
    tag: "IMAX",
  },
  {
    id: 3,
    title: "قرار در باران",
    genre: "درام / عاشقانه",
    duration: "104 دقیقه",
    rating: 7.8,
    language: "دوبله فارسی",
    imageGradient: "from-fuchsia-500/70 via-violet-500/70 to-slate-500/70",
    tag: "جدید",
  },
];

export const showtimes: Showtime[] = [
  { id: 1, movieId: 1, hall: "سالن ۱", dateLabel: "امشب", time: "19:30", price: 165000, format: "2D" },
  { id: 2, movieId: 1, hall: "سالن VIP", dateLabel: "امشب", time: "22:15", price: 240000, format: "3D" },
  { id: 3, movieId: 2, hall: "سالن IMAX", dateLabel: "فردا", time: "18:45", price: 290000, format: "IMAX" },
  { id: 4, movieId: 3, hall: "سالن ۳", dateLabel: "فردا", time: "20:00", price: 150000, format: "2D" },
];

export const seatPreview: SeatStatus[][] = [
  ["taken", "taken", "available", "available", "selected", "selected", "vip", "vip"],
  ["taken", "available", "available", "available", "selected", "available", "vip", "vip"],
  ["available", "available", "taken", "available", "available", "available", "vip", "vip"],
  ["available", "available", "available", "available", "taken", "available", "available", "available"],
  ["available", "taken", "available", "available", "available", "available", "available", "available"],
];
