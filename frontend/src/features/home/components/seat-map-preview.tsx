import { seatPreview } from "../data/home-content";
import type { SeatStatus } from "../types";
import { SectionHeader } from "@/shared/ui";

const seatClassMap: Record<SeatStatus, string> = {
  available: "bg-white/12 border-white/10",
  selected: "bg-orange-400/80 border-orange-200/50",
  taken: "bg-zinc-700/70 border-zinc-500/30 opacity-55",
  vip: "bg-emerald-400/70 border-emerald-200/40",
};

const legend: Array<{ label: string; status: SeatStatus }> = [
  { label: "آزاد", status: "available" },
  { label: "انتخاب‌شده", status: "selected" },
  { label: "رزرو شده", status: "taken" },
  { label: "VIP", status: "vip" },
];

export function SeatMapPreview() {
  return (
    <section className="rounded-3xl border border-white/10 bg-white/4 p-4 sm:p-5">
      <SectionHeader
        eyebrow="Seat Map"
        title="پیش‌نمایش انتخاب صندلی"
        action={
          <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/65">
            سالن IMAX
          </span>
        }
      />

      <div className="mb-5 rounded-2xl border border-dashed border-white/15 bg-black/15 p-3 text-center text-sm tracking-[0.25em] text-white/65">
        SCREEN
      </div>

      <div className="space-y-2">
        {seatPreview.map((row, rowIndex) => (
          <div key={rowIndex} className="flex items-center gap-2">
            <span className="w-6 text-xs text-white/45">{String.fromCharCode(65 + rowIndex)}</span>
            <div className="grid flex-1 grid-cols-8 gap-2">
              {row.map((seat, seatIndex) => (
                <div
                  key={`${rowIndex}-${seatIndex}`}
                  className={`h-8 rounded-lg border ${seatClassMap[seat]}`}
                  title={`${String.fromCharCode(65 + rowIndex)}${seatIndex + 1}`}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-5 flex flex-wrap gap-3">
        {legend.map((item) => (
          <div key={item.label} className="flex items-center gap-2 text-xs text-white/70">
            <span className={`h-3.5 w-3.5 rounded border ${seatClassMap[item.status]}`} />
            {item.label}
          </div>
        ))}
      </div>
    </section>
  );
}
