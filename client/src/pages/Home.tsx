import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  CalendarDays,
  ChevronDown,
  Heart,
  Instagram,
  MapPinned,
  Music2,
  Pause,
  Sparkles,
  Clock3,
  Disc3,
  MapPin,
  Navigation,
  Shirt,
} from "lucide-react";
import { HiOutlineSparkles } from "react-icons/hi2";
import { tsParticles } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";
import gsap from "gsap";
import Lenis from "lenis";
import { useEffect, useLayoutEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { getParallaxOffsets, getParallaxProgress } from "@/lib/parallax";

/* Design reminder: Couture Blue Botanical Invitation — a narrow floral ceremony with
   hand-engraved crests, rarefied paper details, a tall wide floral-garden opening arch, four-corner 3D florals, blue sakura branches, a gazebo-garden profile chapter, a lakeside event scene, a sundial attire chapter, an ornate garden-gate location chapter, a hydrangea gallery chapter, a dark-blue balustrade Love Story chapter, a fountain-garden Soundtrack chapter, and user-gesture-started background music. */

const localAssetBase = import.meta.env.VITE_INVITATION_ASSET_BASE?.replace(/\/$/, "");
const resolveAsset = (localFile: string, managedFile: string) =>
  localAssetBase ? `${localAssetBase}/${localFile}` : `/assets/${localFile}`;

const asset = {
  cover: resolveAsset("ivona-user-fountain-garden.webp", "ivona-user-fountain-garden_76b2a273.webp"),
  forest: resolveAsset("ivona-user-forest-path.webp", "ivona-user-forest-path_881196ec.webp"),
  gazebo: resolveAsset("ivona-user-gazebo-garden.png", "ivona-user-gazebo-garden_82f3c314.png"),
  lakeside: resolveAsset("ivona-user-lakeside-bridge.png", "ivona-user-lakeside-bridge_2c0b872c.png"),
  sundial: resolveAsset("ivona-user-sundial-garden.png", "ivona-user-sundial-garden_5a2cf529.png"),
  gate: resolveAsset("ivona-user-garden-gate.png", "ivona-user-garden-gate_e818e0a6.png"),
  gallery: resolveAsset("ivona-user-hydrangea-gallery.png", "ivona-user-hydrangea-gallery_46a9d0de.png"),
  balustrade: resolveAsset("ivona-user-stone-balustrade.png", "ivona-user-stone-balustrade_0ddff5f6.png"),
  soundtrack: resolveAsset("ivona-user-fountain-soundtrack.webp", "ivona-user-fountain-soundtrack_3c4125ed.webp"),
  music: resolveAsset("ivona-lovestory-background-music.mp3", "ivona-lovestory-background-music_a20208a9.mp3"),
  couple: resolveAsset("wedding-blank-image-placeholder.png", "wedding-blank-image-placeholder_61c292af.png"),
  closing: resolveAsset("ivona-blue-closing-blooms.jpg", "ivona-blue-closing-blooms_8fff14cc.jpg"),
  logo: resolveAsset("ivona-blue-monogram.png", "ivona-blue-monogram_993937c9.png"),
};

const ornament = {
  corner: resolveAsset("ivona-blue-corner-spray.png", "ivona-blue-corner-spray_68413a56.png"),
  lower: resolveAsset("ivona-blue-lower-flourish.png", "ivona-blue-lower-flourish_6937b28a.png"),
  vine: resolveAsset("ivona-blue-trailing-vine.png", "ivona-blue-trailing-vine_3128aaff.png"),
  engraving: resolveAsset("ivona-blue-engraved-ornament.png", "ivona-blue-engraved-ornament_436c6e9d.png"),
};

const galleryImages = Array.from(
  { length: 12 },
  () => asset.couple,
);

const eventDate = new Date("2026-09-21T09:00:00+08:00");

const eventDetails = [
  {
    title: "Holy Matrimony",
    day: "Monday",
    date: "September 21, 2026",
    time: "09.00 – 11.00 AM",
    place: "Trees Residences, Fairview",
    address: "Trees Residences, Quirino Highway, Novaliches, Quezon City, Metro Manila",
    map: "https://maps.google.com/?q=Trees+Residences+Fairview",
  },
  {
    title: "Reception",
    day: "Monday",
    date: "September 21, 2026",
    time: "06.00 – 09.00 PM",
    place: "Trees Residences, Fairview",
    address: "Trees Residences, Quirino Highway, Novaliches, Quezon City, Metro Manila",
    map: "https://maps.google.com/?q=Trees+Residences+Fairview",
  },
];

const attireGuidelines = [
  {
    role: "Ladies",
    note: "Formal dress or gown in light blue, powder blue, or soft silver tones.",
    colors: ["#d7edf8", "#a8cce0", "#8aaec5"],
  },
  {
    role: "Gentlemen",
    note: "Formal suit, barong, or long-sleeve shirt in navy, slate blue, or white.",
    colors: ["#f6fbfe", "#527b9e", "#294a66"],
  },
];

const scheduleItems = [
  ["08:30", "Guest arrival", "Please arrive early to settle in before the ceremony."],
  ["09:00", "Ceremony begins", "Witness the exchange of vows and rings."],
  ["11:00", "Ceremony reception", "A light celebration with family and friends."],
  ["18:00", "Evening reception", "Dinner, toasts, and a joyful celebration together."],
];

const entranceParticles = [
  { id: "petal-1", left: "7%", bottom: "7%", size: 14, delay: 0.1 },
  { id: "petal-2", left: "19%", bottom: "2%", size: 9, delay: 0.8 },
  { id: "petal-3", left: "36%", bottom: "9%", size: 12, delay: 1.3 },
  { id: "petal-4", left: "54%", bottom: "5%", size: 8, delay: 0.35 },
  { id: "petal-5", left: "68%", bottom: "11%", size: 16, delay: 1.8 },
  { id: "petal-6", left: "84%", bottom: "4%", size: 10, delay: 0.6 },
  { id: "petal-7", left: "4%", bottom: "29%", size: 8, delay: 1.5 },
  { id: "petal-8", left: "91%", bottom: "35%", size: 13, delay: 1.1 },
  { id: "petal-9", left: "25%", bottom: "22%", size: 7, delay: 2.1 },
  { id: "petal-10", left: "77%", bottom: "24%", size: 11, delay: 2.45 },
];

const entranceSparkles = [
  { id: "spark-1", left: "9%", bottom: "-5%", delay: 0.1, size: 4 },
  { id: "spark-2", left: "17%", bottom: "7%", delay: 1.6, size: 3 },
  { id: "spark-3", left: "28%", bottom: "-8%", delay: 2.4, size: 5 },
  { id: "spark-4", left: "39%", bottom: "4%", delay: 0.8, size: 3 },
  { id: "spark-5", left: "47%", bottom: "-4%", delay: 2.9, size: 4 },
  { id: "spark-6", left: "58%", bottom: "8%", delay: 1.2, size: 3 },
  { id: "spark-7", left: "66%", bottom: "-7%", delay: 2.1, size: 5 },
  { id: "spark-8", left: "76%", bottom: "5%", delay: 0.45, size: 3 },
  { id: "spark-9", left: "88%", bottom: "-6%", delay: 1.9, size: 4 },
  { id: "spark-10", left: "94%", bottom: "11%", delay: 3.2, size: 3 },
];

let particleEngineReady: Promise<void> | undefined;

function prepareParticleEngine() {
  if (!particleEngineReady) {
    particleEngineReady = loadSlim(tsParticles).catch((error: unknown) => {
      if (error instanceof Error && error.message.includes("Register plugins can only be done before")) return;
      particleEngineReady = undefined;
      throw error;
    });
  }
  return particleEngineReady;
}

type Countdown = { days: string; hours: string; minutes: string; seconds: string };

function getCountdown(): Countdown {
  const difference = Math.max(0, eventDate.getTime() - Date.now());
  const units = [86400000, 3600000, 60000, 1000];
  const values = units.reduce<number[]>((parts, unit) => {
    const consumed = parts.reduce((sum, value, index) => sum + value * units[index], 0);
    parts.push(Math.floor((difference - consumed) / unit));
    return parts;
  }, []);
  return {
    days: String(values[0]).padStart(2, "0"),
    hours: String(values[1]).padStart(2, "0"),
    minutes: String(values[2]).padStart(2, "0"),
    seconds: String(values[3]).padStart(2, "0"),
  };
}

function useCountdown() {
  const [countdown, setCountdown] = useState<Countdown>(getCountdown);

  useEffect(() => {
    const timer = window.setInterval(() => setCountdown(getCountdown()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  return countdown;
}

function SectionHeading({
  eyebrow,
  children,
  light = false,
}: {
  eyebrow?: string;
  children: React.ReactNode;
  light?: boolean;
}) {
  return (
    <div className={`section-heading ${light ? "section-heading--light" : ""}`}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2>{children}</h2>
      <span className="heading-flourish" aria-hidden="true">
        <i /> <Heart size={10} fill="currentColor" /> <i />
      </span>
    </div>
  );
}

function CoutureCrest({ className = "" }: { className?: string }) {
  return (
    <div className={`couture-crest ${className}`} aria-label="Groom and Bride monogram">
      <span>G</span>
      <em>&amp;</em>
      <span>B</span>
    </div>
  );
}

function ButterflyConstellation({ className = "" }: { className?: string }) {
  return (
    <div className={`butterfly-constellation ${className}`} aria-hidden="true">
      <i className="butterfly butterfly--one" />
      <i className="butterfly butterfly--two" />
      <i className="butterfly butterfly--three" />
    </div>
  );
}

function CoverFloralFrame() {
  return (
    <div className="cover-floral-frame" aria-hidden="true">
      <img className="cover-flower-3d cover-flower-3d--garden-bed" src={ornament.lower} alt="" />
      <img className="cover-flower-3d cover-flower-3d--garden-bloom-left" src={ornament.corner} alt="" />
      <img className="cover-flower-3d cover-flower-3d--garden-bloom-right" src={ornament.corner} alt="" />
    </div>
  );
}

function GateExteriorFloralBed() {
  return <img className="gate-exterior-floral-bed" src={ornament.lower} alt="" aria-hidden="true" />;
}

function EntranceBloomField({ opening, reducedMotion }: { opening: boolean; reducedMotion: boolean }) {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  if (isMobile) return null;

  return (
    <div
      className={`entrance-bloom-field ${opening ? "is-opening" : ""} ${reducedMotion ? "is-reduced" : ""}`}
      aria-hidden="true"
    >
      {entranceParticles.map((particle, index) => (
        <i
          key={particle.id}
          className={`entrance-petal entrance-petal--${index + 1}`}
          style={{
            left: particle.left,
            bottom: particle.bottom,
            width: particle.size,
            height: particle.size * 0.72,
            animationDelay: `${particle.delay}s`,
          } as CSSProperties}
        />
      ))}
      {entranceSparkles.map((sparkle) => (
        <b
          key={sparkle.id}
          className="entrance-sparkle"
          style={{
            left: sparkle.left,
            bottom: sparkle.bottom,
            width: sparkle.size,
            height: sparkle.size,
            animationDelay: `${sparkle.delay}s`,
          } as CSSProperties}
        />
      ))}
    </div>
  );
}

function PremiumParticleField({ active, reducedMotion }: { active: boolean; reducedMotion: boolean }) {
  const hostRef = useRef<HTMLDivElement>(null);
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  useEffect(() => {
    if (reducedMotion || !hostRef.current || isMobile) return;
    let cancelled = false;
    let particleContainer: { destroy: () => void } | undefined;

    const mountParticles = async () => {
      await prepareParticleEngine();
      if (cancelled || !hostRef.current) return;
      particleContainer = await tsParticles.load({
        id: "premium-blue-pollen",
        element: hostRef.current,
        options: {
          background: { color: { value: "transparent" } },
          detectRetina: true,
          fpsLimit: 60,
          fullScreen: { enable: false },
          interactivity: { events: { onHover: { enable: false }, onClick: { enable: false } } },
          particles: {
            color: { value: ["#f8fdff", "#bddff0", "#7ca8c5"] },
            links: { enable: false },
            move: { enable: true, direction: "top", outModes: { default: "out" }, speed: 0.7 },
            number: { density: { enable: true, width: 800, height: 800 }, value: 42 },
            opacity: { value: { min: 0.16, max: 0.72 } },
            shape: { type: "circle" },
            size: { value: { min: 1, max: 4 } },
          },
        },
      });
    };

    void mountParticles();
    return () => {
      cancelled = true;
      particleContainer?.destroy();
    };
  }, [reducedMotion, isMobile]);

  if (isMobile) return null;

  return (
    <div ref={hostRef} className={`premium-particles ${active ? "is-active" : ""}`} aria-hidden="true" />
  );
}

const sakuraBlossoms = ["one", "two", "three", "four", "five", "six", "seven"];

function SakuraBranch({ className = "" }: { className?: string }) {
  return (
    <div className={`sakura-branch ${className}`} aria-hidden="true">
      <i className="sakura-limb sakura-limb--main" />
      <i className="sakura-limb sakura-limb--small" />
      {sakuraBlossoms.map((blossom) => <span key={blossom} className={`sakura-blossom sakura-blossom--${blossom}`} />)}
    </div>
  );
}

function CinematicIntro({ reducedMotion }: { reducedMotion: boolean }) {
  const introRef = useRef<HTMLDivElement>(null);
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  useLayoutEffect(() => {
    if (reducedMotion || !introRef.current || isMobile) return;
    const context = gsap.context(() => {
      const timeline = gsap.timeline({ defaults: { ease: "power3.out" } });
      timeline
        .fromTo(".premium-intro__halo", { opacity: 0, scale: 0.6 }, { opacity: 0.9, scale: 1.15, duration: 1.1 })
        .fromTo(".premium-intro__seal", { opacity: 0, scale: 0.72, rotate: -14 }, { opacity: 1, scale: 1, rotate: 0, duration: 0.72 }, 0.16)
        .fromTo(".premium-intro__eyebrow", { opacity: 0, y: 18, letterSpacing: "0.42em" }, { opacity: 1, y: 0, letterSpacing: "0.24em", duration: 0.7 }, 0.42)
        .fromTo(".premium-intro__title strong", { opacity: 0, y: 34, scale: 1.08 }, { opacity: 1, y: 0, scale: 1, duration: 1.05 }, 0.56)
        .fromTo(".premium-intro__rule", { scaleX: 0, opacity: 0 }, { scaleX: 1, opacity: 0.9, duration: 0.62 }, 1.14)
        .fromTo(".premium-intro__status", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.58 }, 1.36)
        .to(".premium-intro__halo", { opacity: 0.3, scale: 1.55, duration: 2.55, ease: "sine.inOut" }, 1.62)
        .to(".premium-intro__title", { opacity: 0, y: -18, filter: "blur(5px)", duration: 0.72, ease: "power2.in" }, 4.54);
    }, introRef);
    return () => context.revert();
  }, [reducedMotion, isMobile]);

  if (isMobile) return null;

  return (
    <div ref={introRef} className={`cinematic-intro premium-cinematic-intro ${reducedMotion ? "is-reduced" : ""}`} aria-hidden="true">
      <div className="cinematic-intro__scene" style={{ backgroundImage: `url(${asset.cover})` }} />
      <div className="cinematic-intro__wash" />
      <div className="premium-intro__halo" />
      <EntranceBloomField opening reducedMotion={reducedMotion} />
      <div className="cinematic-corner-florals">
        <img className="corner-flower-3d corner-flower-3d--top-left" src={ornament.corner} alt="" />
        <img className="corner-flower-3d corner-flower-3d--top-right" src={ornament.lower} alt="" />
        <img className="corner-flower-3d corner-flower-3d--bottom-left" src={ornament.lower} alt="" />
        <img className="corner-flower-3d corner-flower-3d--bottom-right" src={ornament.corner} alt="" />
      </div>
      <SakuraBranch className="sakura-branch--top-left" />
      <SakuraBranch className="sakura-branch--top-right" />
      <SakuraBranch className="sakura-branch--bottom-left" />
      <SakuraBranch className="sakura-branch--bottom-right" />
      <span className="cinematic-bird" />
      <span className="cinematic-butterfly cinematic-butterfly--one" />
      <span className="cinematic-butterfly cinematic-butterfly--two" />
      <div className="cinematic-flock">
        <span className="flock-bird flock-bird--one" />
        <span className="flock-bird flock-bird--two" />
        <span className="flock-bird flock-bird--three" />
        <span className="flock-bird flock-bird--four" />
        <span className="flock-bird flock-bird--five" />
      </div>
      <div className="cinematic-intro__title premium-intro__title">
        <span className="premium-intro__seal"><HiOutlineSparkles /></span>
        <i className="premium-intro__eyebrow">A garden opens for</i>
        <strong>Groom <em>&amp;</em> Bride</strong>
        <span className="premium-intro__rule" />
        <small className="premium-intro__status">A floral story, unfolding</small>
      </div>
      <div className="foreground-floral-pass">
        <img className="foreground-flower foreground-flower--left" src={ornament.lower} alt="" />
        <img className="foreground-flower foreground-flower--right" src={ornament.corner} alt="" />
        <img className="foreground-flower foreground-flower--center" src={ornament.lower} alt="" />
        <img className="foreground-flower foreground-flower--mid-left" src={ornament.corner} alt="" />
        <img className="foreground-flower foreground-flower--mid-right" src={ornament.lower} alt="" />
        <img className="foreground-flower foreground-flower--top" src={ornament.corner} alt="" />
        <img className="foreground-flower foreground-flower--far-left" src={ornament.corner} alt="" />
        <img className="foreground-flower foreground-flower--far-right" src={ornament.lower} alt="" />
        <img className="foreground-flower foreground-flower--lower-spray" src={ornament.corner} alt="" />
      </div>
    </div>
  );
}

function ArchFrame({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`arch-frame ${className}`}>{children}</div>;
}

function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      /* Start visible so the full editorial invitation is never blank in print,
         deep-link, or full-document contexts; the gate and micro-interactions
         still provide the ceremonial transition language. */
      initial={false}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.78, delay, ease: [0.23, 1, 0.32, 1] }}
    >
      {children}
    </motion.div>
  );
}

/**
 * ZoomEntranceOverlay
 * One-shot GSAP cinematic entrance: cover photo zooms toward the viewer,
 * a light burst blooms, a white veil washes in, couple names flash,
/**
 * ZoomEntranceOverlay
 * One-shot GSAP cinematic entrance: cover photo wildly zooms toward the viewer,
 * a light burst blooms, and it perfectly dissolves to reveal the real invitation.
 */
function ZoomEntranceOverlay({
  opening,
  coverSrc,
  reducedMotion,
}: {
  opening: boolean;
  coverSrc: string;
  reducedMotion: boolean;
}) {
  const overlayRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!opening || reducedMotion || !overlayRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.inOut" } });

      /* Phase 1: Camera zooms into the cover (0 → 5.5s) */
      tl.fromTo(
        ".zeo__stage",
        { scale: 1 },
        { scale: 8, duration: 5.4, ease: "power2.inOut" },
        0,
      );

      /* Phase 2: Radial light burst blooms gently to transition */
      tl.fromTo(
        ".zeo__burst",
        { opacity: 0, scale: 0.1 },
        { opacity: 1, scale: 2.8, duration: 3.5, ease: "power2.inOut" },
        1.0,
      );

      // Let standard React unmount handle the clean cut at 5.5s, 
      // or AnimatePresence if placed inside the gate.
    }, overlayRef);

    return () => ctx.revert();
  }, [opening, reducedMotion]);

  if (!opening) return null;

  return (
    <div ref={overlayRef} className="zoom-entrance-overlay" aria-hidden="true">
      <div className="zeo__stage" style={{ backgroundImage: `url(${coverSrc})` }} />
      <div className="zeo__burst" />
    </div>
  );
}

export default function Home() {
  const [opened, setOpened] = useState(false);
  const [opening, setOpening] = useState(false);
  const [musicOn, setMusicOn] = useState(false);
  const lenisRef = useRef<Lenis | null>(null);
  const musicRef = useRef<HTMLAudioElement | null>(null);
  const countdown = useCountdown();
  const reduceMotion = useReducedMotion();

  const calendarLink = useMemo(() => {
    const params = new URLSearchParams({
      text: "The Wedding of Groom & Bride",
      details: "With grateful hearts, we invite you to share our first day as husband and wife.",
      location: "Trees Residences, Fairview, Quezon City",
      dates: "20260921T010000Z/20260921T030000Z",
    });
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&${params.toString()}`;
  }, []);

  useEffect(() => {
    document.body.style.overflow = opened ? "auto" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [opened]);

  useEffect(() => {
    if (!opened || reduceMotion) return;
    // Disable Lenis on mobile - use native scrolling for better performance
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    if (isMobile) return;

    const lenis = new Lenis({
      lerp: 0.085,
      smoothWheel: true,
      wheelMultiplier: 0.82,
      touchMultiplier: 1.05,
      smoothTouch: false // Disable smooth touch for better mobile performance
    });
    lenisRef.current = lenis;
    let frame = 0;
    const animate = (time: number) => {
      lenis.raf(time);
      frame = window.requestAnimationFrame(animate);
    };
    frame = window.requestAnimationFrame(animate);
    return () => {
      window.cancelAnimationFrame(frame);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [opened, reduceMotion]);

  useEffect(() => {
    if (!opened || reduceMotion) return;

    // Disable all parallax on mobile for performance
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    if (isMobile) return;

    // Cache DOM references to avoid repeated queries
    const sections = Array.from(document.querySelectorAll<HTMLElement>(".invitation-content > section"));
    const cover = document.querySelector<HTMLElement>(".cover-scroll-journey");
    const visibleSections = new Set<HTMLElement>();

    // IntersectionObserver to track visible sections and skip off-screen ones
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            visibleSections.add(entry.target as HTMLElement);
          } else {
            visibleSections.delete(entry.target as HTMLElement);
            // Reset parallax for off-screen sections
            (entry.target as HTMLElement).style.setProperty("--parallax-progress", "0");
            (entry.target as HTMLElement).style.setProperty("--parallax-background-y", "0px");
            (entry.target as HTMLElement).style.setProperty("--parallax-far-y", "0px");
            (entry.target as HTMLElement).style.setProperty("--parallax-near-y", "0px");
          }
        });
      },
      { rootMargin: "20%", threshold: 0.1 }
    );

    sections.forEach((section) => sectionObserver.observe(section));

    let frame = 0;
    let lastScrollY = 0;
    const updateParallax = () => {
      frame = 0;
      const viewportHeight = window.innerHeight || 1;
      const scrollY = window.scrollY;

      // Skip update if scroll position hasn't changed significantly
      if (Math.abs(scrollY - lastScrollY) < 0.5) {
        return;
      }
      lastScrollY = scrollY;

      // Only update visible sections
      visibleSections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        const progress = getParallaxProgress(rect.top, rect.height, viewportHeight);
        const offsets = getParallaxOffsets(progress);
        section.style.setProperty("--parallax-progress", progress.toFixed(4));
        section.style.setProperty("--parallax-background-y", `${offsets.backgroundY.toFixed(2)}px`);
        section.style.setProperty("--parallax-far-y", `${offsets.farY.toFixed(2)}px`);
        section.style.setProperty("--parallax-near-y", `${offsets.nearY.toFixed(2)}px`);
      });

      if (cover) {
        const rect = cover.getBoundingClientRect();
        const scrollRange = Math.max(cover.offsetHeight - viewportHeight, 1);
        const coverProgress = Math.max(0, Math.min(1, -rect.top / scrollRange));
        const revealProgress = Math.max(0, Math.min(1, (coverProgress - 0.58) / 0.42));
        const revealEase = revealProgress * revealProgress * (3 - 2 * revealProgress);
        const setCoverVar = (name: string, value: number) => cover.style.setProperty(name, `${value.toFixed(2)}px`);
        cover.style.setProperty("--cover-progress", coverProgress.toFixed(4));
        cover.style.setProperty("--cover-backdrop-scale", (1.04 + coverProgress * 0.42).toFixed(3));
        setCoverVar("--cover-backdrop-y", coverProgress * -38);
        cover.style.setProperty("--cover-tunnel-opacity", (1 - Math.max(0, coverProgress - 0.54) * 1.25).toFixed(3));
        cover.style.setProperty("--cover-tunnel-far-scale", (1 + coverProgress * 0.72).toFixed(3));
        cover.style.setProperty("--cover-tunnel-middle-scale", (1.08 + coverProgress * 1.55).toFixed(3));
        cover.style.setProperty("--cover-tunnel-near-scale", (1.16 + coverProgress * 2.65).toFixed(3));
        cover.style.setProperty("--cover-tunnel-near-opacity", (0.58 + Math.max(0, 0.52 - coverProgress) * 0.7).toFixed(3));
        cover.style.setProperty("--cover-gateway-opacity", (Math.max(0, Math.min(1, (coverProgress - 0.27) / 0.38))).toFixed(3));
        cover.style.setProperty("--cover-gateway-scale", (0.72 + Math.max(0, Math.min(1, (coverProgress - 0.27) / 0.38)) * 0.3).toFixed(3));
        setCoverVar("--cover-bed-y", coverProgress * 128);
        cover.style.setProperty("--cover-bed-scale", (1 + coverProgress * 1.35).toFixed(3));
        setCoverVar("--cover-left-x", coverProgress * -118);
        setCoverVar("--cover-left-y", coverProgress * 92);
        cover.style.setProperty("--cover-left-scale", (1 + coverProgress * 1.5).toFixed(3));
        setCoverVar("--cover-right-x", coverProgress * 118);
        setCoverVar("--cover-right-y", coverProgress * 92);
        cover.style.setProperty("--cover-right-scale", (1 + coverProgress * 1.5).toFixed(3));
        setCoverVar("--cover-vine-x", coverProgress * 86);
        setCoverVar("--cover-vine-y", coverProgress * -74);
        cover.style.setProperty("--cover-vine-scale", (1 + coverProgress * 0.78).toFixed(3));
        cover.style.setProperty("--cover-vine-opacity", (0.78 - coverProgress * 0.58).toFixed(3));
        cover.style.setProperty("--cover-floral-opacity", (0.08 + revealEase * 0.92).toFixed(3));
        cover.style.setProperty("--cover-floral-scale", (1.02 + revealEase * 0.12).toFixed(3));
        cover.style.setProperty("--cover-accent-opacity", (0.92 - revealEase * 0.72).toFixed(3));
        cover.style.setProperty("--cover-corridor-opacity", (0.98 - revealEase * 0.2).toFixed(3));
        cover.style.setProperty("--cover-sparse-opacity", (0.96 - revealEase * 0.18).toFixed(3));
        cover.style.setProperty("--cover-curtain-opacity", (1 - revealEase * 0.98).toFixed(3));
        setCoverVar("--cover-curtain-left-x", -coverProgress * 220);
        setCoverVar("--cover-curtain-right-x", coverProgress * 220);
        setCoverVar("--cover-curtain-top-y", -coverProgress * 150);
        setCoverVar("--cover-curtain-bottom-y", coverProgress * 170);
        cover.style.setProperty("--cover-max-opacity", (0.96 - revealEase * 0.78).toFixed(3));
        setCoverVar("--cover-max-left-x", -coverProgress * 155);
        setCoverVar("--cover-max-right-x", coverProgress * 155);
        setCoverVar("--cover-max-top-y", -coverProgress * 92);
        setCoverVar("--cover-max-bottom-y", coverProgress * 118);
        cover.style.setProperty("--cover-max-scale", (1.02 + revealEase * 0.18).toFixed(3));
        setCoverVar("--cover-mist-scale", 1 + revealEase * 0.24);
        cover.style.setProperty("--cover-mist-opacity", (revealEase * 0.72).toFixed(3));
        cover.style.setProperty("--cover-arch-opacity", (0.03 + revealEase * 0.97).toFixed(3));
        cover.style.setProperty("--cover-arch-scale", (0.88 + revealEase * 0.12).toFixed(3));
        setCoverVar("--cover-arch-y", 34 - revealEase * 34);
        cover.style.setProperty("--cover-content-opacity", revealEase.toFixed(3));
        setCoverVar("--cover-content-y", 28 - revealEase * 28);
      }

    };
    const queueParallax = () => {
      if (!frame) frame = window.requestAnimationFrame(updateParallax);
    };

    window.addEventListener("scroll", queueParallax, { passive: true });
    window.addEventListener("resize", queueParallax);
    const lenis = lenisRef.current;
    lenis?.on("scroll", queueParallax);
    queueParallax();

    return () => {
      window.removeEventListener("scroll", queueParallax);
      window.removeEventListener("resize", queueParallax);
      lenis?.off("scroll", queueParallax);
      if (frame) window.cancelAnimationFrame(frame);
      sectionObserver.disconnect();
      sections.forEach((section) => {
        section.style.removeProperty("--parallax-progress");
        section.style.removeProperty("--parallax-background-y");
        section.style.removeProperty("--parallax-far-y");
        section.style.removeProperty("--parallax-near-y");
      });
    };
  }, [opened, reduceMotion]);

  useEffect(() => () => {
    musicRef.current?.pause();
  }, []);

  const startBackgroundMusic = async (startAtOpeningOffset = false) => {
    const audio = musicRef.current;
    if (!audio) return;
    audio.volume = 0.46;
    if (startAtOpeningOffset) {
      const applyOpeningOffset = () => {
        audio.currentTime = 26;
      };
      if (audio.readyState >= HTMLMediaElement.HAVE_METADATA) {
        applyOpeningOffset();
      } else {
        audio.addEventListener("loadedmetadata", applyOpeningOffset, { once: true });
      }
    }
    try {
      await audio.play();
      setMusicOn(true);
    } catch {
      setMusicOn(false);
    }
  };

  const toggleBackgroundMusic = () => {
    const audio = musicRef.current;
    if (!audio) return;
    if (audio.paused) {
      void startBackgroundMusic();
      return;
    }
    audio.pause();
    setMusicOn(false);
  };

  const openInvitation = () => {
    if (opening) return;
    setOpening(true);
    void startBackgroundMusic(true);
    // Force the 5500ms duration so the cinematic zoom animation always has time to play
    window.setTimeout(() => setOpened(true), 5500);
  };

  const scrollToVow = () => {
    const cover = document.querySelector<HTMLElement>(".cover-scroll-journey");
    const target = cover ? window.scrollY + cover.getBoundingClientRect().top + window.innerHeight * 0.72 : window.innerHeight * 0.72;
    if (lenisRef.current) {
      lenisRef.current.scrollTo(target, { duration: 1.25 });
      return;
    }
    window.scrollTo({ top: target, behavior: "smooth" });
  };

  return (
    <main className="invitation-shell">
      <audio ref={musicRef} src={asset.music} loop preload="metadata" />
      <div className="film-grain" aria-hidden="true" />

      <AnimatePresence>
        {!opened && (
          <motion.section
            className={`invitation-gate ${opening ? "is-opening" : ""}`}
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: reduceMotion ? 0.18 : 1.2, ease: [0.33, 1, 0.68, 1] }}
            aria-label="Invitation cover"
            aria-busy={opening}
          >
            {/* Cinematic GSAP zoom entrance — renders inside gate to fade smoothly */}
            <ZoomEntranceOverlay
              opening={opening}
              coverSrc={asset.cover}
              reducedMotion={false}
            />
            <div className="gate-image" style={{ backgroundImage: `url(${asset.cover})` }} />
            <div className="gate-wash" />
            <EntranceBloomField opening={opening} reducedMotion={Boolean(reduceMotion)} />
            <PremiumParticleField active={opening} reducedMotion={Boolean(reduceMotion)} />
            <img className="gate-corner-spray" src={ornament.corner} alt="" />
            <img className="gate-lower-flourish" src={ornament.lower} alt="" />
            <ArchFrame className="gate-arch">
              <motion.div
                className="gate-content"
                initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
              >
                <CoutureCrest className="couture-crest--gate" />
                <p className="eyebrow">The Wedding Of</p>
                <h1 className="couple-names couple-names--gate">
                  <b>Groom</b>
                  <span>&amp;</span>
                  <b>Bride</b>
                </h1>
                <div className="gate-rule" />
                <p className="guest-label">Dear</p>
                <p className="guest-name">Guest Name</p>
                <button className="open-button" type="button" onClick={openInvitation} disabled={opening}>
                  <span>{opening ? "Unfolding our story" : "Open Invitation"}</span>
                  <Heart size={13} fill="currentColor" />
                </button>
              </motion.div>
            </ArchFrame>
            <GateExteriorFloralBed />
          </motion.section>
        )}
      </AnimatePresence>

      <div
        className={`invitation-content ${opened ? "is-open" : ""}`}
        aria-hidden={!opened}
      >
        <section className="cover-section cover-scroll-journey">
          <div className="cover-parallax-stage">
            <div className="cover-parallax-backdrop" style={{ backgroundImage: `url(${asset.cover})` }} />
            <div className="cover-tunnel" aria-hidden="true">
              <div className="cover-tunnel-plane cover-tunnel-plane--far" style={{ backgroundImage: `url(${asset.cover})` }} />
              <div className="cover-tunnel-plane cover-tunnel-plane--middle" style={{ backgroundImage: `url(${asset.cover})` }} />
              <div className="cover-tunnel-plane cover-tunnel-plane--near" style={{ backgroundImage: `url(${asset.cover})` }} />
              <div className="cover-gateway">
                <div className="cover-gateway-door" />
              </div>
            </div>
            <div className="cover-parallax-mist" />
            <div className="cover-closed-floral-curtain" aria-hidden="true">
              <img className="curtain-flower curtain-flower--left" src={ornament.lower} alt="" />
              <img className="curtain-flower curtain-flower--right" src={ornament.lower} alt="" />
              <img className="curtain-flower curtain-flower--top" src={ornament.corner} alt="" />
              <img className="curtain-flower curtain-flower--bottom" src={ornament.lower} alt="" />
            </div>
            <div className="soft-vignette" />
            <div className="cover-corridor-florals" aria-hidden="true">
              <img className="corridor-flower corridor-flower--left-top" src={ornament.corner} alt="" />
              <img className="corridor-flower corridor-flower--left-upper" src={ornament.lower} alt="" />
              <img className="corridor-flower corridor-flower--left-middle" src={ornament.corner} alt="" />
              <img className="corridor-flower corridor-flower--left-lower" src={ornament.lower} alt="" />
              <img className="corridor-flower corridor-flower--right-top" src={ornament.corner} alt="" />
              <img className="corridor-flower corridor-flower--right-upper" src={ornament.lower} alt="" />
              <img className="corridor-flower corridor-flower--right-middle" src={ornament.corner} alt="" />
              <img className="corridor-flower corridor-flower--right-lower" src={ornament.lower} alt="" />
            </div>
            <div className="cover-sparse-florals" aria-hidden="true">
              <img className="sparse-flower sparse-flower--bottom-left" src={ornament.corner} alt="" />
              <img className="sparse-flower sparse-flower--bottom-right" src={ornament.corner} alt="" />
              <img className="sparse-flower sparse-flower--bottom-center" src={ornament.lower} alt="" />
              <img className="sparse-flower sparse-flower--side-left" src={ornament.corner} alt="" />
              <img className="sparse-flower sparse-flower--side-right" src={ornament.corner} alt="" />
              <img className="sparse-flower sparse-flower--left-middle" src={ornament.lower} alt="" />
              <img className="sparse-flower sparse-flower--right-middle" src={ornament.lower} alt="" />
              <img className="sparse-flower sparse-flower--top-left" src={ornament.corner} alt="" />
              <img className="sparse-flower sparse-flower--top-right" src={ornament.corner} alt="" />
            </div>
            <ButterflyConstellation className="butterfly-constellation--cover" />
            <div className="cover-botanical-accents" aria-hidden="true">
              <img className="cover-accent cover-accent--top-left" src={ornament.corner} alt="" />
              <img className="cover-accent cover-accent--top-right" src={ornament.corner} alt="" />
              <img className="cover-accent cover-accent--mid-left" src={ornament.corner} alt="" />
              <img className="cover-accent cover-accent--mid-right" src={ornament.corner} alt="" />
              <img className="cover-accent cover-accent--lower-left" src={ornament.lower} alt="" />
              <img className="cover-accent cover-accent--lower-right" src={ornament.lower} alt="" />
              <span className="cover-petal cover-petal--one" />
              <span className="cover-petal cover-petal--two" />
              <span className="cover-petal cover-petal--three" />
              <span className="cover-petal cover-petal--four" />
              <span className="cover-petal cover-petal--five" />
              <span className="cover-petal cover-petal--six" />
            </div>
            <div className="cover-max-floral" aria-hidden="true">
              <img className="max-flower max-flower--canopy-left" src={ornament.corner} alt="" />
              <img className="max-flower max-flower--canopy-right" src={ornament.corner} alt="" />
              <img className="max-flower max-flower--side-left" src={ornament.lower} alt="" />
              <img className="max-flower max-flower--side-right" src={ornament.lower} alt="" />
              <img className="max-flower max-flower--arch-left" src={ornament.corner} alt="" />
              <img className="max-flower max-flower--arch-right" src={ornament.corner} alt="" />
              <img className="max-flower max-flower--front-left" src={ornament.corner} alt="" />
              <img className="max-flower max-flower--front-right" src={ornament.corner} alt="" />
              <img className="corner-flower corner-flower--top-left" src={ornament.corner} alt="" />
              <img className="corner-flower corner-flower--top-right" src={ornament.corner} alt="" />
              <img className="corner-flower corner-flower--bottom-left" src={ornament.corner} alt="" />
              <img className="corner-flower corner-flower--bottom-right" src={ornament.corner} alt="" />
            </div>
            <CoverFloralFrame />
            <ArchFrame className="cover-arch cover-arch--oval">
              <div className="cover-content">
                <CoutureCrest className="couture-crest--cover" />
                <p className="eyebrow">The Wedding Of</p>
                <h1>
                  Groom <span>&amp;</span> Bride
                </h1>
                <p className="cover-date">Monday · September 21, 2026</p>
                <button className="scroll-cue" type="button" onClick={scrollToVow}>
                  <span>Scroll to reveal</span>
                  <ChevronDown size={17} />
                </button>
              </div>
            </ArchFrame>
          </div>
        </section>

        <section
          id="vow"
          className="vow-section"
          style={{ backgroundImage: `linear-gradient(180deg, rgb(238 249 252 / .08), rgb(36 78 103 / .12)), url(${asset.cover})` }}
        >
          <div className="vow-overlay" />
          <ButterflyConstellation className="butterfly-constellation--vow" />
          <Reveal className="endless-arch">
            <img className="endless-ornament endless-ornament--top" src={ornament.engraving} alt="" />
            <span className="endless-seal"><Sparkles size={15} strokeWidth={1.4} /></span>
            <div className="endless-image-frame">
              <img src={asset.couple} alt="Endless Love image placeholder" />
            </div>
            <img className="endless-ornament endless-ornament--bottom" src={ornament.engraving} alt="" />
            <h2>Endless Love</h2>
            <div className="endless-rule"><i /> <Heart size={10} fill="currentColor" /> <i /></div>
            <blockquote>
              “Above all, clothe yourselves with love, which binds everything together in perfect harmony. And
              let the peace of Christ rule in your hearts, to which indeed you were called in the one body. And
              be thankful.”
            </blockquote>
            <cite>Colossians 3:14–15</cite>
          </Reveal>
        </section>

        <section
          className="couple-section couple-section--gazebo parchment-section"
          style={{ backgroundImage: `linear-gradient(180deg, rgb(246 252 254 / .1), rgb(33 73 96 / .11)), url(${asset.gazebo})` }}
        >
          <span className="paper-orbit paper-orbit--one" aria-hidden="true" />
          <span className="paper-orbit paper-orbit--two" aria-hidden="true" />
          <Reveal className="couple-heading-reveal">
            <SectionHeading eyebrow="With grateful hearts">Groom &amp; Bride</SectionHeading>
          </Reveal>
          <div className="couple-card couple-card--groom">
            <div className="portrait-wrap">
              <img src={asset.couple} alt="Groom portrait placeholder" />
              <span className="portrait-label">The Groom</span>
            </div>
            <div className="person-copy">
              <p className="eyebrow">A beloved son</p>
              <h3>Groom</h3>
              <p>Eldest son of Mr. Swee Lik Low &amp; Mrs. Sock Tin Tan</p>
              <a href="https://www.instagram.com/" target="_blank" rel="noreferrer" aria-label="Jay See's Instagram">
                <Instagram size={18} />
              </a>
            </div>
          </div>
          <div className="ampersand-divider" aria-hidden="true">&amp;</div>
          <div className="couple-card couple-card--bride">
            <div className="person-copy">
              <p className="eyebrow">A cherished daughter</p>
              <h3>Bride</h3>
              <p>Eldest daughter of Mr. Swee Lik Jesisca &amp; Mrs. Sock Tin Tan</p>
              <a href="https://www.instagram.com/" target="_blank" rel="noreferrer" aria-label="Micheala's Instagram">
                <Instagram size={18} />
              </a>
            </div>
            <div className="portrait-wrap portrait-wrap--offset">
              <img src={asset.couple} alt="Bride portrait placeholder" />
              <span className="portrait-label">The Bride</span>
            </div>
          </div>
        </section>

        <section className="film-section" aria-label="Prewedding film">
          <div className="film-section__canvas" aria-hidden="true" />
          <div className="film-section__overlay" />
          <span className="film-section__stamp">A memory in bloom</span>
          <Reveal className="film-section__content">
            <p className="eyebrow">Our Prelude</p>
            <h2>A garden, a promise,<br />a lifetime.</h2>
          </Reveal>
        </section>

        <section
          className="event-section event-section--lakeside parchment-section"
          style={{ backgroundImage: `linear-gradient(180deg, rgb(244 251 254 / .12), rgb(33 74 96 / .13)), url(${asset.lakeside})` }}
        >
          <img className="event-engraving" src={ornament.engraving} alt="" />
          <Reveal>
            <SectionHeading eyebrow="Save the date">Wedding Event</SectionHeading>
            <p className="intro-copy">
              By the grace of God, we are pleased to announce our wedding to you, our family, and our friends.
              We request the honor of your presence on our special day.
            </p>
          </Reveal>
          <div className="event-list">
            {eventDetails.map((event, index) => (
              <Reveal key={event.title} delay={index * 0.08}>
                <article className="event-card">
                  <span className="event-card__seal" aria-hidden="true">✦</span>
                  <span className="event-card__number">0{index + 1}</span>
                  <p className="eyebrow">{event.title}</p>
                  <h3>{event.day}</h3>
                  <p className="event-card__date">{event.date}</p>
                  <div className="event-card__rule" />
                  <p>{event.time}</p>
                  <h4>{event.place}</h4>
                  <address>{event.address}</address>
                  <a href={event.map} target="_blank" rel="noreferrer" className="text-button">
                    <MapPinned size={14} /> Open Maps
                  </a>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        <section
          className="attire-section attire-section--sundial parchment-section"
          style={{ backgroundImage: `linear-gradient(180deg, rgb(244 251 254 / .1), rgb(41 79 99 / .11)), url(${asset.sundial})` }}
        >
          <img className="attire-engraving" src={ornament.engraving} alt="" />
          <Reveal>
            <SectionHeading eyebrow="Dress with us">Attire Guidelines</SectionHeading>
            <p className="intro-copy">A touch of blue will make the day feel even more like ours.</p>
          </Reveal>
          <div className="attire-grid">
            {attireGuidelines.map((attire, index) => (
              <Reveal key={attire.role} delay={index * 0.08}>
                <article className="attire-card">
                  <span className="attire-card__icon"><Shirt size={20} /></span>
                  <p className="eyebrow">{attire.role}</p>
                  <p>{attire.note}</p>
                  <div className="attire-swatches" aria-label={`${attire.role} color palette`}>
                    {attire.colors.map((color) => <i key={color} style={{ backgroundColor: color }} />)}
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        <section
          className="gallery-section gallery-section--hydrangea parchment-section"
          style={{ backgroundImage: `linear-gradient(180deg, rgb(247 253 255 / .1), rgb(43 82 103 / .12)), url(${asset.gallery})` }}
        >
          <span className="gallery-sparkle gallery-sparkle--one" aria-hidden="true">✦</span>
          <span className="gallery-sparkle gallery-sparkle--two" aria-hidden="true">✦</span>
          <Reveal>
            <SectionHeading eyebrow="Fragments of us">Our Gallery</SectionHeading>
          </Reveal>
          <p className="gallery-note">A collection of little moments, kept close.</p>
          <div className="gallery-grid">
            {galleryImages.map((src, index) => (
              <Reveal key={`gallery-placeholder-${index + 1}`} delay={(index % 3) * 0.06} className={`gallery-tile gallery-tile--${index + 1}`}>
                <img src={src} alt={`Wedding gallery placeholder ${index + 1}`} />
              </Reveal>
            ))}
          </div>
        </section>

        <section
          className="location-section location-section--garden-gate"
          style={{ backgroundImage: `linear-gradient(180deg, rgb(245 252 254 / .05), rgb(38 79 104 / .1)), url(${asset.gate})` }}
        >
          <div className="location-section__wash" />
          <Reveal className="location-content">
            <SectionHeading eyebrow="Find your way">Location</SectionHeading>
            <div className="location-card">
              <span className="location-card__icon"><MapPin size={21} /></span>
              <h3>{eventDetails[0].place}</h3>
              <p>{eventDetails[0].address}</p>
              <div className="venue-map" role="img" aria-label="Illustrated map preview of Trees Residences in Fairview">
                <span className="map-road map-road--one" />
                <span className="map-road map-road--two" />
                <span className="map-road map-road--three" />
                <span className="map-river" />
                <span className="map-pin"><MapPin size={18} fill="currentColor" /></span>
                <strong>TREES RESIDENCES</strong>
                <small>Fairview · Venue map preview</small>
              </div>
              <a href={eventDetails[0].map} target="_blank" rel="noreferrer" className="text-button">
                <Navigation size={14} /> Open in Maps
              </a>
            </div>
          </Reveal>
        </section>

        <section
          className="story-section story-section--balustrade"
          style={{ backgroundImage: `linear-gradient(160deg, rgb(28 72 98 / .46), rgb(45 101 130 / .4) 52%, rgb(24 62 87 / .5)), url(${asset.balustrade})` }}
        >
          <div className="story-section__wash" />
          <img className="story-corner-spray" src={ornament.corner} alt="" />
          <span className="story-section__ribbon">A story written gently</span>
          <Reveal>
            <SectionHeading eyebrow="Love Story" light>Our little history</SectionHeading>
          </Reveal>
          <Reveal className="story-image-wrap">
            <img src={asset.couple} alt="Love story image placeholder" />
          </Reveal>
          <div className="story-list">
            {[
              ["01", "first meeting", "At the beginning of our acquaintance, we were in the same class in college. A private chat, a shared hometown, and a small friendship opened the way."],
              ["02", "two become one", "From easy conversations came a friendship that learned patience, laughter, and the rare comfort of being known by another heart."],
              ["03", "new journey", "Today, with the people who have shaped our lives beside us, we begin the gentle work and joy of building a home together."],
            ].map(([number, title, copy], index) => (
              <Reveal key={number} delay={index * 0.1}>
                <article className="story-item">
                  <span>{number}</span>
                  <div>
                    <h3>{title}</h3>
                    <p>{copy}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        <section
          className="soundtrack-section soundtrack-section--fountain parchment-section"
          style={{ backgroundImage: `linear-gradient(180deg, rgb(247 253 255 / .04), rgb(220 240 248 / .12)), url(${asset.soundtrack})` }}
        >
          <img className="soundtrack-engraving" src={ornament.engraving} alt="" />
          <Reveal>
            <SectionHeading eyebrow="A song for our day">Our Soundtrack</SectionHeading>
          </Reveal>
          <Reveal className="soundtrack-card">
            <span className="soundtrack-card__disc"><Disc3 size={23} /></span>
            <p className="eyebrow">Now playing</p>
            <h3>Our Song Title</h3>
            <p className="soundtrack-artist">Artist Name</p>
            <button type="button" className="soundtrack-button" onClick={toggleBackgroundMusic}>
              <Music2 size={15} /> {musicOn ? "Pause ambience" : "Play ambience"}
            </button>
          </Reveal>
        </section>

        <section className="timeline-section parchment-section">
          <Reveal>
            <SectionHeading eyebrow="Celebrate with us">Timeline</SectionHeading>
            <p className="intro-copy">A gentle guide to the moments we will share together.</p>
          </Reveal>
          <div className="timeline-list">
            {scheduleItems.map(([time, title, copy], index) => (
              <Reveal key={time} delay={index * 0.08}>
                <article className="timeline-item">
                  <span className="timeline-item__time"><Clock3 size={14} /> {time}</span>
                  <div>
                    <h3>{title}</h3>
                    <p>{copy}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="closing-section" style={{ backgroundImage: `url(${asset.closing})` }}>
          <div className="closing-section__wash" />
          <span className="closing-star closing-star--one" aria-hidden="true">✦</span>
          <span className="closing-star closing-star--two" aria-hidden="true">✦</span>
          <Reveal className="closing-content">
            <CoutureCrest className="couture-crest--closing" />
            <p className="eyebrow">Counting the days</p>
            <div className="countdown-grid" aria-label="Countdown to wedding day">
              {[
                [countdown.days, "Days"],
                [countdown.hours, "Hours"],
                [countdown.minutes, "Minutes"],
                [countdown.seconds, "Seconds"],
              ].map(([value, label]) => (
                <div key={label}>
                  <strong>{value}</strong>
                  <span>{label}</span>
                </div>
              ))}
            </div>
            <a href={calendarLink} target="_blank" rel="noreferrer" className="save-date-button">
              <CalendarDays size={16} /> Save The Date
            </a>
            <div className="closing-blessing">
              <p>It is a pleasure and honor for us, if you are willing to attend and give us your blessing.</p>
              <h2>Groom <span>&amp;</span> Bride</h2>
            </div>
          </Reveal>
        </section>

        <footer>
          <img src={asset.logo} alt="" />
          <p>Made with love for a day to remember</p>
          <span>© 2026 Groom &amp; Bride</span>
        </footer>
      </div>

      {opened && (
        <button
          className={`music-toggle ${musicOn ? "is-active" : ""}`}
          type="button"
          onClick={toggleBackgroundMusic}
          aria-label={musicOn ? "Pause invitation ambience" : "Play invitation ambience"}
          title={musicOn ? "Pause invitation ambience" : "Play invitation ambience"}
        >
          {musicOn ? <Pause size={16} fill="currentColor" /> : <Music2 size={16} />}
        </button>
      )}

    </main>
  );
}
