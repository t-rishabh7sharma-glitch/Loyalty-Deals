import {
  ChevronRight,
  Crown,
  Gift,
  MapPin,
  Sparkles,
  Star,
  Tag,
  Ticket,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { mppsDataset } from "../../data/mpps";
import { formatInr, formatInt } from "../../lib/format";
import { cn } from "../../lib/cn";
import { CustomerDealIcon } from "./customerIcons";

const THEME: Record<string, string> = {
  blue: "from-[#0066CC] to-secondary",
  amber: "from-amber-500 to-orange-600",
  violet: "from-violet-500 to-purple-700",
  emerald: "from-emerald-500 to-teal-700",
};

export function CustomerHome() {
  const navigate = useNavigate();
  const { appBranding, profile, loyalty, promoCarousel, nearbyDeals, popularDeals, todaysDeals, popularCategories } =
    mppsDataset.customer;
  const pointsValue = loyalty.points * loyalty.pointsToRupee;

  const slides = promoCarousel;
  const [slide, setSlide] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const suppressCarouselLink = useRef(false);

  const next = useCallback(() => setSlide((s) => (s + 1) % slides.length), [slides.length]);
  const prev = useCallback(() => setSlide((s) => (s - 1 + slides.length) % slides.length), [slides.length]);

  useEffect(() => {
    const t = window.setInterval(next, 5500);
    return () => window.clearInterval(t);
  }, [next]);

  const current = slides[slide];
  const carouselTo = current && "linkTo" in current && current.linkTo ? String(current.linkTo) : "/app/browse";
  const carouselCta = current && "cta" in current && current.cta ? String(current.cta) : "View";

  return (
    <div className="space-y-5 pb-6 md:space-y-8">
      <section className="-mx-4 overflow-hidden rounded-b-[28px] bg-gradient-to-br from-[#0a5fc7] via-secondary to-[#001a4d] px-4 pb-8 pt-4 text-white shadow-lg md:mx-0 md:rounded-3xl md:px-6 md:pb-10 md:pt-6">
        <div className="flex items-center justify-between gap-2">
          <Link to="/app" className="flex items-center gap-1.5 rounded-lg outline-none ring-white/40 focus-visible:ring-2">
            <Star className="h-4 w-4 fill-amber-300 text-amber-200" />
            <span className="text-sm font-bold tracking-tight">{appBranding}</span>
          </Link>
          <div className="flex items-center gap-2">
            <Link
              to="/app/points"
              className="inline-flex items-center gap-1 rounded-full bg-white/15 px-2.5 py-1 text-[11px] font-semibold backdrop-blur-sm outline-none ring-white/30 focus-visible:ring-2"
            >
              <Crown className="h-3.5 w-3.5 text-amber-300" />
              {loyalty.tier}
            </Link>
            <Link
              to="/app/points"
              className="inline-flex items-center gap-1 rounded-full bg-primary px-2.5 py-1 text-[11px] font-bold text-secondary outline-none ring-white/40 focus-visible:ring-2"
            >
              <Star className="h-3.5 w-3.5 fill-secondary/20" />
              {formatInt(loyalty.points)}
            </Link>
          </div>
        </div>
        <h1 className="mt-6 text-2xl font-bold leading-tight md:text-3xl">
          Hello, {profile.displayName}{" "}
          <span className="inline-block" aria-hidden>
            👋
          </span>
        </h1>
        <p className="mt-2 max-w-sm text-sm text-white/85">Discover deals and earn rewards today.</p>
        <div className="mt-5 grid grid-cols-2 gap-3 md:max-w-md">
          <Link
            to="/app/points"
            className="rounded-2xl border border-white/10 bg-white/10 p-3 backdrop-blur-sm outline-none ring-white/30 focus-visible:ring-2"
          >
            <p className="text-[11px] text-white/75">My points</p>
            <p className="mt-0.5 text-lg font-bold tabular-nums">{formatInt(loyalty.points)}</p>
            <p className="text-[10px] text-white/65">≈ {formatInr(pointsValue)}</p>
          </Link>
          <Link
            to="/app/cashback"
            className="rounded-2xl border border-white/10 bg-white/10 p-3 backdrop-blur-sm outline-none ring-white/30 focus-visible:ring-2"
          >
            <p className="text-[11px] text-white/75">Cashback</p>
            <p className="mt-0.5 text-lg font-bold tabular-nums">{formatInr(loyalty.cashbackInr)}</p>
            <p className="text-[10px] text-white/65">Tap for details</p>
          </Link>
        </div>
      </section>

      <section className="rounded-2xl border border-black/[0.06] bg-white p-4 shadow-card md:p-5">
        <div className="grid grid-cols-4 gap-2">
          <button type="button" onClick={() => navigate("/app/browse")} className="flex flex-col items-center gap-2 rounded-xl py-2 transition hover:bg-surface">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-100 text-amber-700 shadow-sm">
              <Tag className="h-5 w-5" />
            </span>
            <span className="text-center text-[10px] font-semibold leading-tight text-black">Browse deals</span>
          </button>
          <button type="button" onClick={() => navigate("/app/coupons")} className="flex flex-col items-center gap-2 rounded-xl py-2 transition hover:bg-surface">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-pink-100 text-pink-600 shadow-sm">
              <Ticket className="h-5 w-5" />
            </span>
            <span className="text-center text-[10px] font-semibold leading-tight text-black">My coupons</span>
          </button>
          <button type="button" onClick={() => navigate("/app/points")} className="flex flex-col items-center gap-2 rounded-xl py-2 transition hover:bg-surface">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-200 text-amber-900 shadow-sm">
              <Star className="h-5 w-5 fill-amber-600/30" />
            </span>
            <span className="text-center text-[10px] font-semibold leading-tight text-black">Points</span>
          </button>
          <button type="button" onClick={() => navigate("/app/nearby")} className="flex flex-col items-center gap-2 rounded-xl py-2 transition hover:bg-surface">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-rose-100 text-rose-600 shadow-sm">
              <MapPin className="h-5 w-5" />
            </span>
            <span className="text-center text-[10px] font-semibold leading-tight text-black">Nearby</span>
          </button>
        </div>
      </section>

      <section>
        <div
          role="region"
          aria-roledescription="carousel"
          aria-label="Promotions"
          className="relative touch-pan-y"
          onTouchStart={(e) => {
            touchStartX.current = e.targetTouches[0].clientX;
          }}
          onTouchEnd={(e) => {
            if (touchStartX.current == null) return;
            const dx = e.changedTouches[0].clientX - touchStartX.current;
            touchStartX.current = null;
            if (Math.abs(dx) > 50) {
              suppressCarouselLink.current = true;
              window.setTimeout(() => {
                suppressCarouselLink.current = false;
              }, 400);
              if (dx > 0) prev();
              else next();
            }
          }}
        >
          <Link
            to={carouselTo}
            onClick={(ev) => {
              if (suppressCarouselLink.current) ev.preventDefault();
            }}
            className={cn(
              "relative block w-full overflow-hidden rounded-2xl border border-white/20 bg-gradient-to-br p-5 text-left text-white shadow-lg transition active:opacity-95 md:p-6",
              THEME[slides[slide]?.theme ?? "blue"] ?? THEME.blue,
            )}
          >
            <div className="relative z-10 max-w-[min(100%,240px)] pr-2">
              <span className="inline-block rounded-full bg-white/20 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide">
                {slides[slide]?.pill}
              </span>
              <p className="mt-3 text-lg font-bold leading-snug md:text-xl">{slides[slide]?.title}</p>
              <p className="mt-1 text-xs text-white/85 md:text-sm">{slides[slide]?.subtitle}</p>
              <span className="mt-4 inline-flex items-center gap-0.5 text-xs font-semibold text-white underline decoration-white/60">
                {carouselCta}
                <ChevronRight className="h-4 w-4" />
              </span>
            </div>
            <div className="pointer-events-none absolute -bottom-2 right-2 opacity-95 md:right-6">
              <Gift className="h-24 w-24 text-amber-300 drop-shadow-lg md:h-28 md:w-28" strokeWidth={1.25} />
            </div>
          </Link>
          <div className="mt-3 flex justify-center gap-2">
            {slides.map((s, i) => (
              <button
                key={s.id}
                type="button"
                aria-label={`Go to slide ${i + 1}`}
                aria-current={i === slide}
                onClick={() => setSlide(i)}
                className={cn(
                  "h-2 rounded-full transition-all",
                  i === slide ? "w-6 bg-secondary" : "w-2 bg-black/20 hover:bg-black/30",
                )}
              />
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="flex items-center gap-1.5 text-base font-bold text-black md:text-lg">
            <span aria-hidden>📍</span> Deals nearby
          </h2>
          <Link to="/app/nearby" className="text-sm font-semibold text-secondary">
            See all →
          </Link>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {nearbyDeals.map((d) => (
            <Link
              key={d.dealId}
              to={`/app/deals/${d.dealId}`}
              className="min-w-[148px] max-w-[160px] shrink-0 rounded-2xl border border-black/5 bg-white p-3 shadow-card transition hover:border-primary/25"
            >
              <div className="flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-50">
                  <CustomerDealIcon name={d.icon} className="h-5 w-5 text-sky-700" />
                </div>
                <span className="text-[10px] font-semibold text-muted-navy">{d.distanceKm} km</span>
              </div>
              <p className="mt-2 text-xs font-bold text-black">{d.merchant}</p>
              <span className="mt-2 inline-block rounded-full bg-bo-orange/15 px-2 py-0.5 text-[10px] font-bold text-bo-orange">{d.discountLabel}</span>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="flex items-center gap-1.5 text-base font-bold text-black md:text-lg">
            <span aria-hidden>🔥</span> Popular offers
          </h2>
          <Link to="/app/browse" className="text-sm font-semibold text-secondary">
            See all →
          </Link>
        </div>
        <ul className="space-y-3">
          {popularDeals.map((d) => (
            <li key={d.dealId}>
              <Link
                to={`/app/deals/${d.dealId}`}
                className="flex items-center gap-3 rounded-2xl border border-black/5 bg-white p-4 shadow-card transition active:scale-[0.99] hover:border-primary/20"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-amber-50">
                  <CustomerDealIcon name={d.icon} className="h-6 w-6 text-amber-800" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-black">{d.title}</p>
                  <p className="text-sm text-muted-navy">
                    {d.merchant} · Expires {d.expiresOn}
                  </p>
                </div>
                <span className="shrink-0 rounded-lg bg-bo-orange/15 px-2 py-1 text-xs font-bold text-bo-orange">{d.discountLabel}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-base font-bold text-black md:text-lg">Today&apos;s deals</h2>
          <Link to="/app/browse" className="text-sm font-semibold text-secondary">
            See all →
          </Link>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {todaysDeals.map((d) => (
            <Link
              key={d.dealId}
              to={`/app/deals/${d.dealId}`}
              className="min-w-[200px] shrink-0 rounded-2xl border border-amber-200/70 bg-gradient-to-b from-amber-50 to-white p-4 shadow-card transition hover:border-amber-300"
            >
              <p className="text-xs font-semibold text-amber-800">Ends in {d.endsInHours}h</p>
              <p className="mt-2 font-bold text-black">{d.title}</p>
              <p className="mt-1 text-sm text-muted-navy">{d.merchant}</p>
              <p className="mt-3 text-lg font-bold text-secondary">{d.discountLabel}</p>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-3 text-base font-bold text-black md:text-lg">Popular categories</h2>
        <div className="grid grid-cols-3 gap-2 md:grid-cols-3 md:gap-4">
          {popularCategories.map((c) => (
            <Link
              key={c.categoryId}
              to={`/app/category/${c.categoryId}`}
              className="flex flex-col items-center rounded-2xl border border-black/5 bg-white p-4 text-center shadow-card transition hover:border-primary/25"
            >
              <span className="text-2xl">{c.emoji}</span>
              <p className="mt-2 text-xs font-semibold text-black">{c.name}</p>
              <p className="mt-0.5 text-[10px] text-muted-navy">{c.dealCount} deals</p>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-base font-bold text-black">Scratch &amp; win</h2>
          <Sparkles className="h-5 w-5 text-primary" />
        </div>
        <Link
          to="/app/scratch"
          className="block w-full rounded-2xl border-2 border-dashed border-primary/40 bg-gradient-to-br from-primary/10 to-white p-5 text-left shadow-card transition hover:border-primary/60"
        >
          <p className="font-semibold text-black">Daily reward</p>
          <p className="mt-1 text-sm text-muted-navy">One scratch per 24 hours — open full screen.</p>
          <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-secondary">
            Play now
            <ChevronRight className="h-4 w-4" />
          </span>
        </Link>
      </section>
    </div>
  );
}
