"use client";

import { FormEvent, useState } from "react";

type AuthMode = "email" | "phone";

type TokenState = {
  accessToken: string;
  refreshToken: string;
} | null;

function mockToken(prefix: string) {
  return `${prefix}_${Math.random().toString(36).slice(2)}_${Date.now().toString(36)}`;
}

export function LoginPage() {
  const [mode, setMode] = useState<AuthMode>("email");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [tokens, setTokens] = useState<TokenState>(null);
  const [statusText, setStatusText] = useState("برای ادامه وارد حساب کاربری شوید.");

  const handleEmailSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setTokens({
      accessToken: mockToken("access"),
      refreshToken: mockToken("refresh"),
    });
    setStatusText(`ورود با ایمیل برای ${email || "کاربر"} با موفقیت شبیه‌سازی شد.`);
  };

  const handleSendOtp = () => {
    if (!phone.trim()) {
      setStatusText("ابتدا شماره موبایل را وارد کنید.");
      return;
    }

    setOtpSent(true);
    setStatusText(`کد یک‌بارمصرف به ${phone} ارسال شد (نمایشی).`);
  };

  const handlePhoneSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!otpSent) {
      setStatusText("ابتدا کد یک‌بارمصرف را ارسال کنید.");
      return;
    }

    if (!otp.trim()) {
      setStatusText("کد یک‌بارمصرف را وارد کنید.");
      return;
    }

    setTokens({
      accessToken: mockToken("access"),
      refreshToken: mockToken("refresh"),
    });
    setStatusText(`ورود با شماره ${phone} و کد ${otp} با موفقیت شبیه‌سازی شد.`);
  };

  return (
    <main className="min-h-screen px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto grid w-full max-w-6xl gap-6 lg:grid-cols-[1.1fr_0.95fr]">
        <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 via-white/0 to-orange-500/10 p-6 sm:p-8">
          <div className="absolute inset-0 opacity-60">
            <div className="absolute -right-12 top-6 h-40 w-40 rounded-full bg-orange-400/20 blur-3xl" />
            <div className="absolute bottom-8 left-0 h-36 w-36 rounded-full bg-fuchsia-400/10 blur-3xl" />
          </div>

          <div className="relative space-y-8">
            <div>
              <p className="mb-3 inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/75">
                ورود / ثبت‌نام کاربران
              </p>
              <h1 className="font-display text-4xl leading-tight text-white sm:text-5xl">
                CINEMA
                <span className="block text-orange-300">RESERVATION</span>
              </h1>
              <p className="mt-4 max-w-md text-sm leading-7 text-white/70 sm:text-base">
                برای رزرو سریع بلیت، پیگیری سفارش‌ها و مشاهده تاریخچه خرید وارد حساب کاربری
                شوید. این صفحه فعلا UI آماده اتصال به API است.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <InfoCard title="دو روش ورود" value="ایمیل یا موبایل" />
              <InfoCard title="توکن‌ها" value="Access / Refresh" />
              <InfoCard title="ذخیره‌سازی" value="کوکی (مرحله بعد)" />
              <InfoCard title="وضعیت" value="آماده اتصال به API" />
            </div>
          </div>
        </section>

        <section className="rounded-3xl border border-white/10 bg-white/5 p-4 shadow-2xl shadow-black/20 backdrop-blur-sm sm:p-6">
          <div className="mb-5 flex rounded-2xl border border-white/10 bg-black/20 p-1">
            <ModeButton
              active={mode === "email"}
              onClick={() => {
                setMode("email");
                setStatusText("حالت ورود با ایمیل فعال شد.");
              }}
            >
              ایمیل و رمز عبور
            </ModeButton>
            <ModeButton
              active={mode === "phone"}
              onClick={() => {
                setMode("phone");
                setStatusText("حالت ورود با شماره موبایل فعال شد.");
              }}
            >
              موبایل و OTP
            </ModeButton>
          </div>

          <div className="mb-4 rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white/75">
            {statusText}
          </div>

          {mode === "email" ? (
            <form className="space-y-4" onSubmit={handleEmailSubmit}>
              <Field label="ایمیل">
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="example@mail.com"
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/35 focus:border-orange-300/70 focus:bg-white/10"
                  dir="ltr"
                />
              </Field>

              <Field label="رمز عبور">
                <input
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/35 focus:border-orange-300/70 focus:bg-white/10"
                  dir="ltr"
                />
              </Field>

              <button
                type="submit"
                className="w-full rounded-xl bg-gradient-to-r from-orange-500 to-amber-400 px-4 py-3 text-sm font-bold text-black transition hover:brightness-110"
              >
                ورود با ایمیل
              </button>
            </form>
          ) : (
            <form className="space-y-4" onSubmit={handlePhoneSubmit}>
              <Field label="شماره موبایل">
                <div className="flex gap-2">
                  <input
                    type="tel"
                    value={phone}
                    onChange={(event) => setPhone(event.target.value)}
                    placeholder="09xxxxxxxxx"
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/35 focus:border-orange-300/70 focus:bg-white/10"
                    dir="ltr"
                  />
                  <button
                    type="button"
                    onClick={handleSendOtp}
                    className="shrink-0 rounded-xl border border-orange-300/40 bg-orange-400/10 px-4 py-3 text-xs font-semibold text-orange-200 transition hover:bg-orange-400/20"
                  >
                    ارسال کد
                  </button>
                </div>
              </Field>

              <Field label="کد یک‌بارمصرف">
                <input
                  type="text"
                  inputMode="numeric"
                  value={otp}
                  onChange={(event) => setOtp(event.target.value)}
                  placeholder="123456"
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm tracking-[0.25em] text-white outline-none transition placeholder:text-white/35 focus:border-orange-300/70 focus:bg-white/10"
                  dir="ltr"
                />
              </Field>

              <button
                type="submit"
                className="w-full rounded-xl bg-gradient-to-r from-orange-500 to-amber-400 px-4 py-3 text-sm font-bold text-black transition hover:brightness-110"
              >
                تایید کد و ورود
              </button>
            </form>
          )}

          <div className="mt-6 space-y-3 rounded-2xl border border-white/10 bg-black/20 p-4">
            <p className="text-xs uppercase tracking-[0.16em] text-white/45">Auth Response Preview</p>
            <TokenPreview label="accessToken" value={tokens?.accessToken} />
            <TokenPreview label="refreshToken" value={tokens?.refreshToken} />
            <p className="text-xs leading-6 text-white/50">
              در مرحله بعدی این مقادیر از API گرفته می‌شوند و داخل کوکی ذخیره خواهند شد.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}

function ModeButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "flex-1 rounded-xl px-3 py-2 text-sm font-semibold transition",
        active
          ? "bg-white text-black shadow-lg shadow-white/10"
          : "text-white/65 hover:bg-white/5 hover:text-white",
      ].join(" ")}
    >
      {children}
    </button>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-white/85">{label}</span>
      {children}
    </label>
  );
}

function InfoCard({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
      <p className="text-xs text-white/50">{title}</p>
      <p className="mt-2 text-sm font-semibold text-white">{value}</p>
    </div>
  );
}

function TokenPreview({ label, value }: { label: string; value?: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-3">
      <p className="mb-1 text-xs text-white/45">{label}</p>
      <code className="block overflow-x-auto text-xs text-orange-200">
        {value ?? "هنوز مقداری دریافت نشده است."}
      </code>
    </div>
  );
}
