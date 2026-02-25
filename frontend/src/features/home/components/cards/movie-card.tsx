import type { Movie } from "../../types";

type MovieCardProps = {
  movie: Movie;
};

export function MovieCard({ movie }: MovieCardProps) {
  return (
    <article className="group overflow-hidden rounded-3xl border border-white/10 bg-white/4 transition hover:-translate-y-0.5 hover:border-white/20">
      <div className={`relative h-40 bg-gradient-to-br ${movie.imageGradient} p-4`}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.25),transparent_45%)]" />
        <div className="relative flex h-full flex-col justify-between">
          <span className="w-fit rounded-full bg-black/30 px-3 py-1 text-xs text-white">
            {movie.tag}
          </span>
          <div className="flex items-end justify-between gap-3">
            <div>
              <h3 className="text-xl font-bold text-white">{movie.title}</h3>
              <p className="text-xs text-white/80">{movie.genre}</p>
            </div>
            <div className="rounded-xl border border-white/20 bg-black/20 px-2 py-1 text-sm font-semibold text-white">
              {movie.rating}
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4 p-4">
        <div className="flex items-center justify-between text-sm text-white/65">
          <span>{movie.duration}</span>
          <span>{movie.language}</span>
        </div>
        <button className="w-full rounded-2xl border border-white/15 bg-black/20 px-4 py-3 text-sm font-semibold text-white transition group-hover:border-orange-300/35 group-hover:bg-orange-300/8">
          انتخاب سانس
        </button>
      </div>
    </article>
  );
}
