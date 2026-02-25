type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  action?: React.ReactNode;
};

export function SectionHeader({ eyebrow, title, action }: SectionHeaderProps) {
  return (
    <div className="mb-4 flex items-center justify-between gap-3">
      <div>
        <p className="text-xs uppercase tracking-[0.18em] text-white/45">{eyebrow}</p>
        <h2 className="text-xl font-bold text-white sm:text-2xl">{title}</h2>
      </div>
      {action}
    </div>
  );
}
