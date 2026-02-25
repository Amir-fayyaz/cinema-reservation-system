export type Movie = {
  id: number;
  title: string;
  genre: string;
  duration: string;
  rating: number;
  language: string;
  imageGradient: string;
  tag: string;
};

export type Showtime = {
  id: number;
  movieId: number;
  hall: string;
  dateLabel: string;
  time: string;
  price: number;
  format: "2D" | "3D" | "IMAX";
};

export type SeatStatus = "available" | "selected" | "taken" | "vip";
