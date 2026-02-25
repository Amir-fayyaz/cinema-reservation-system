import {
  BookingSummary,
  HeroSection,
  HomeHeader,
  MoviesGrid,
  SeatMapPreview,
  ShowtimesPanel,
} from "../components";
import { movies, showtimes } from "../data";

export function HomePage() {
  return (
    <div className="min-h-screen">
      <HomeHeader />

      <main className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        <HeroSection />

        <section className="grid gap-6 xl:grid-cols-[1.4fr_0.95fr]">
          <div className="space-y-6">
            <MoviesGrid movies={movies} />
            <ShowtimesPanel movies={movies} showtimes={showtimes} />
          </div>

          <div className="space-y-6">
            <SeatMapPreview />
            <BookingSummary />
          </div>
        </section>
      </main>
    </div>
  );
}
