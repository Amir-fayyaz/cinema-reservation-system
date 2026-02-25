const navItems = ["فیلم‌ها", "سانس‌ها", "صندلی‌ها", "تخفیف‌ها"];

export function HomeHeader() {
  return (
    <header className="sticky top-0 z-20 border-b border-white/10 bg-black/20 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-orange-400 to-rose-500 text-sm font-bold text-black shadow-[0_0_30px_rgba(255,122,24,0.35)]">
            CR
          </div>
          <div>
            <p className="font-display text-lg uppercase tracking-[0.18em] text-white">
              Cinema Reserve
            </p>
            <p className="text-xs text-white/60">رزرو سریع بلیط سینما</p>
          </div>
        </div>

        <nav className="hidden items-center gap-2 md:flex">
          {navItems.map((item) => (
            <a
              key={item}
              href="#"
              className="rounded-full border border-white/10 px-4 py-2 text-sm text-white/75 transition hover:border-orange-300/40 hover:text-white"
            >
              {item}
            </a>
          ))}
        </nav>

        <button className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-black transition hover:bg-orange-100">
          ورود / ثبت‌نام
        </button>
      </div>
    </header>
  );
}
