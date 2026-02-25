import { SectionHeader } from "@/shared/ui";
import { MovieCard } from "./cards/movie-card";
import type { Movie } from "../types";

type MoviesGridProps = {
  movies: Movie[];
};

export function MoviesGrid({ movies }: MoviesGridProps) {
  return (
    <section className="space-y-4">
      <SectionHeader
        eyebrow="Now Showing"
        title="فیلم‌های پیشنهادی امروز"
        action={
          <button className="rounded-full border border-white/15 px-4 py-2 text-sm text-white/80 transition hover:bg-white/5">
            همه فیلم‌ها
          </button>
        }
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
      </div>
    </section>
  );
}
