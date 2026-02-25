import { SectionHeader } from "@/shared/ui";
import { formatPrice } from "@/shared/lib";

export function BookingSummary() {
  const subtotal = 870000;
  const discount = 70000;
  const fee = 18000;
  const total = subtotal - discount + fee;

  return (
    <aside className="rounded-3xl border border-white/10 bg-gradient-to-b from-white/6 to-white/3 p-5">
      <SectionHeader
        eyebrow="Cart"
        title="خلاصه سفارش"
        action={
          <span className="rounded-full border border-orange-300/20 bg-orange-300/10 px-3 py-1 text-xs text-orange-100">
            3 بلیط
          </span>
        }
      />

      <div className="space-y-4">
        <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
          <p className="text-sm font-semibold text-white">مدار آخر</p>
          <p className="mt-1 text-xs text-white/55">IMAX • فردا • 18:45 • سالن IMAX</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {["A12", "A13", "A14"].map((seat) => (
              <span key={seat} className="rounded-lg border border-white/10 bg-white/5 px-2 py-1 text-xs text-white/80">
                {seat}
              </span>
            ))}
          </div>
        </div>

        <div className="space-y-2 rounded-2xl border border-white/10 bg-black/20 p-4 text-sm">
          <div className="flex items-center justify-between text-white/70">
            <span>بلیط‌ها (3x)</span>
            <span>{formatPrice(subtotal)}</span>
          </div>
          <div className="flex items-center justify-between text-white/70">
            <span>تخفیف باشگاه مشتریان</span>
            <span className="text-emerald-200">-{formatPrice(discount)}</span>
          </div>
          <div className="flex items-center justify-between text-white/70">
            <span>کارمزد</span>
            <span>{formatPrice(fee)}</span>
          </div>
          <div className="my-1 h-px bg-white/10" />
          <div className="flex items-center justify-between font-bold text-white">
            <span>مبلغ نهایی</span>
            <span>{formatPrice(total)}</span>
          </div>
        </div>

        <button className="w-full rounded-2xl bg-gradient-to-r from-orange-400 to-rose-500 px-4 py-3 text-sm font-bold text-black shadow-[0_12px_35px_rgba(255,122,24,0.35)] transition hover:brightness-110">
          ادامه تا پرداخت
        </button>

        <p className="text-center text-xs leading-6 text-white/45">
          این بخش فعلاً UI اولیه است و هنوز به بک‌اند متصل نشده.
        </p>
      </div>
    </aside>
  );
}
