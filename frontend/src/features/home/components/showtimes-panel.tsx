import { SectionHeader } from "@/shared/ui";
import { ShowtimeItem } from "./items/showtime-item";
import type { Movie, Showtime } from "../types";

type ShowtimesPanelProps = {
  movies: Movie[];
  showtimes: Showtime[];
};

export function ShowtimesPanel({ movies, showtimes }: ShowtimesPanelProps) {
  return (
    <section className="rounded-3xl border border-white/10 bg-white/4 p-4 sm:p-5">
      <SectionHeader
        eyebrow="Showtimes"
        title="سانس‌های نزدیک"
        action={
          <span className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-xs text-white/65">
            امروز و فردا
          </span>
        }
      />

      <div className="space-y-3">
        {showtimes.map((show) => {
          const movie = movies.find((item) => item.id === show.movieId);

          return <ShowtimeItem key={show.id} movie={movie} showtime={show} />;
        })}
      </div>
    </section>
  );
}
