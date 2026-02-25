export function HeroSection() {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/8 via-white/4 to-transparent p-5 sm:p-8">
      <div className="pointer-events-none absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-orange-500/15 to-transparent blur-2xl" />

      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-5">
          <div className="inline-flex items-center gap-2 rounded-full border border-orange-300/30 bg-orange-300/10 px-3 py-1 text-xs text-orange-200">
            <span className="h-2 w-2 rounded-full bg-orange-400" />
            شروع طراحی فرانت‌اند رزرو سینما
          </div>

          <h1 className="text-3xl leading-tight font-bold text-white sm:text-4xl lg:text-5xl">
            رزرو بلیط در کمتر از
            <span className="mx-2 font-display text-5xl tracking-wider text-orange-300 sm:text-6xl">
              90s
            </span>
            با انتخاب فیلم، سانس و صندلی
          </h1>

          <p className="max-w-xl text-sm leading-7 text-white/70 sm:text-base">
            این صفحه به عنوان استارت طراحی فرانت‌اند ساخته شده: لیست فیلم‌ها، سانس‌های امروز، پیش‌نمایش انتخاب صندلی و خلاصه سفارش.
            از اینجا می‌تونیم مرحله‌ای بریم سمت صفحات کامل، فیلترها و اتصال به API.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <button className="rounded-2xl bg-gradient-to-r from-orange-400 to-rose-500 px-5 py-3 text-sm font-bold text-black shadow-[0_12px_40px_rgba(255,122,24,0.35)] transition hover:brightness-110">
              شروع رزرو
            </button>
            <button className="rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10">
              مشاهده برنامه اکران
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2 sm:grid-cols-4">
            {[
              ["24+", "سینما فعال"],
              ["180+", "سانس روزانه"],
              ["4.8", "رضایت کاربران"],
              ["VIP", "سالن اختصاصی"],
            ].map(([value, label]) => (
              <div key={label} className="rounded-2xl border border-white/10 bg-black/20 p-3">
                <p className="font-display text-2xl tracking-wide text-white">{value}</p>
                <p className="text-xs text-white/60">{label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative min-h-80 rounded-3xl border border-white/10 bg-black/25 p-4">
          <div className="absolute inset-4 rounded-2xl bg-gradient-to-br from-orange-500/20 via-transparent to-fuchsia-400/10" />
          <div className="relative flex h-full flex-col justify-between gap-4">
            <div className="flex items-center justify-between">
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
                Tonight Highlight
              </span>
              <span className="text-xs text-white/50">Hall IMAX</span>
            </div>

            <div className="space-y-3">
              <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-cyan-400/20 via-sky-400/15 to-indigo-500/20 p-4">
                <p className="text-xs text-cyan-100/80">18:45 • IMAX • زیرنویس</p>
                <p className="mt-2 text-2xl font-bold text-white">مدار آخر</p>
                <p className="text-sm text-white/65">Sci-Fi / Action • 132 min</p>
              </div>

              <div className="grid grid-cols-3 gap-2">
                {["A12", "A13", "A14"].map((seat) => (
                  <div
                    key={seat}
                    className="rounded-xl border border-emerald-300/25 bg-emerald-300/10 px-3 py-2 text-center text-sm font-semibold text-emerald-100"
                  >
                    {seat}
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="text-white/70">جمع موقت</span>
                <span className="font-bold text-white">870,000 تومان</span>
              </div>
              <div className="h-2 rounded-full bg-white/10">
                <div className="h-full w-2/3 rounded-full bg-gradient-to-r from-orange-400 to-rose-500" />
              </div>
              <p className="mt-2 text-xs text-white/55">3 صندلی انتخاب شده • کارمزد در مرحله پرداخت محاسبه می‌شود</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
