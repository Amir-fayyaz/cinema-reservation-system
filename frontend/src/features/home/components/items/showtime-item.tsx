import { formatPrice } from "@/shared/lib";
import type { Movie, Showtime } from "../../types";

type ShowtimeItemProps = {
  movie?: Movie;
  showtime: Showtime;
};

export function ShowtimeItem({ movie, showtime }: ShowtimeItemProps) {
  return (
    <div className="grid gap-3 rounded-2xl border border-white/10 bg-black/20 p-4 lg:grid-cols-[1.2fr_1fr_auto]">
      <div>
        <p className="text-sm font-semibold text-white">{movie?.title ?? "فیلم"}</p>
        <p className="mt-1 text-xs text-white/55">
          {showtime.hall} • {showtime.format} • {showtime.dateLabel}
        </p>
      </div>

      <div className="flex items-center gap-2">
        <span className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm font-bold text-white">
          {showtime.time}
        </span>
        <span className="text-sm text-white/70">{formatPrice(showtime.price)}</span>
      </div>

      <button className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-black transition hover:bg-orange-100">
        رزرو
      </button>
    </div>
  );
}
