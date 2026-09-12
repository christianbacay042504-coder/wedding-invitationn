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
  Users,
  Camera,
  StickyNote,
  Play,
  SkipForward,
  SkipBack,
  Eye,
  X,
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
  coverPhoto: resolveAsset("bg2.jpg", "bg2.jpg"),
  closing: resolveAsset("ivona-blue-closing-blooms.jpg", "ivona-blue-closing-blooms_8fff14cc.jpg"),
  logo: resolveAsset("ivona-blue-monogram.png", "ivona-blue-monogram_993937c9.png"),
  back: resolveAsset("back.jpg", "back.jpg"),
  wemet: resolveAsset("wemet.jpg", "wemet.jpg"),
  groom: resolveAsset("groom.jpg", "groom.jpg"),
  bride: resolveAsset("bride.jpg", "bride.jpg"),
  memory1: resolveAsset("memory1.jpg", "memory1.jpg"),
  memory2: resolveAsset("memory2.jpg", "memory2.jpg"),
  memory3: resolveAsset("memory3.jpg", "memory3.jpg"),
  memory4: resolveAsset("memory4.jpg", "memory4.jpg"),
  memory5: resolveAsset("memory5.jpg", "memory5.jpg"),
  memory6: resolveAsset("memory6.jpg", "memory6.jpg"),
  memory7: resolveAsset("memory7.jpg", "memory7.jpg"),
  memory8: resolveAsset("memory8.jpg", "memory8.jpg"),
  memory9: resolveAsset("memory9.jpg", "memory9.jpg"),
  memory10: resolveAsset("memory10.jpg", "memory10.jpg"),
  memory11: resolveAsset("memory11.jpg", "memory11.jpg"),
  memory12: resolveAsset("memory12.jpg", "memory12.jpg"),
  memory13: resolveAsset("memory13.jpg", "memory13.jpg"),
  song1: resolveAsset("song1.mp3", "song1.mp3"),
  song2: resolveAsset("song2.mp3", "song2.mp3"),
  song3: resolveAsset("song3.mp3", "song3.mp3"),
  song4: resolveAsset("song4.mp3", "song4.mp3"),
};

const ornament = {
  corner: resolveAsset("ivona-blue-corner-spray.png", "ivona-blue-corner-spray_68413a56.png"),
  lower: resolveAsset("ivona-blue-lower-flourish.png", "ivona-blue-lower-flourish_6937b28a.png"),
  vine: resolveAsset("ivona-blue-trailing-vine.png", "ivona-blue-trailing-vine_3128aaff.png"),
  engraving: resolveAsset("ivona-blue-engraved-ornament.png", "ivona-blue-engraved-ornament_436c6e9d.png"),
};

const galleryImages = [
  asset.memory1,
  asset.memory2,
  asset.memory3,
  asset.memory4,
  asset.memory5,
  asset.memory6,
  asset.memory7,
  asset.memory8,
  asset.memory9,
  asset.memory10,
  asset.memory11,
  asset.memory12,
  asset.memory13,
];

const eventDate = new Date("2026-09-21T09:00:00+08:00");

const eventDetails = [
  {
    title: "Holy Matrimony",
    day: "Monday",
    date: "September 21, 2026",
    time: "2:30 – 5:00 PM",
    place: "Trees Residences (Indoor Function Hall), Fairview",
    address: "Trees Residences, Quirino Highway, Novaliches, Quezon City, Metro Manila",
    map: "https://www.google.com/maps/place/Trees+Residences+Indoor+Function+Hall/@14.7359149,121.0616809,17z/data=!3m1!4b1!4m6!3m5!1s0x3397b10006988d2d:0xdbbe01d6a6ce9fd9!8m2!3d14.7359097!4d121.0642558!16s%2Fg%2F11vwzw9vdj?entry=ttu&g_ep=EgoyMDI2MDkwOC4wIKXMDSoASAFQAw%3D%3D",
  },
  {
    title: "Reception",
    day: "Monday",
    date: "September 21, 2026",
    time: "5:00 – 6:30 PM",
    place: "Trees Residences (Indoor Function Hall), Fairview",
    address: "Trees Residences, Quirino Highway, Novaliches, Quezon City, Metro Manila",
    map: "https://www.google.com/maps/place/Trees+Residences+Indoor+Function+Hall/@14.7359149,121.0616809,17z/data=!3m1!4b1!4m6!3m5!1s0x3397b10006988d2d:0xdbbe01d6a6ce9fd9!8m2!3d14.7359097!4d121.0642558!16s%2Fg%2F11vwzw9vdj?entry=ttu&g_ep=EgoyMDI2MDkwOC4wIKXMDSoASAFQAw%3D%3D",
  },
];

const attirePalette = ["#f6fbfe", "#c9dbe7", "#8aaec5", "#5e7f9f", "#263a48"];

const attireGuidelines: {
  role: string;
  details: { label: string; value: string }[];
  icons: { type: "bag" | "heels" | "lipstick"; label: string }[];
}[] = [
    {
      role: "Ladies",
      details: [
        { label: "Hair", value: "Soft waves or an elegant updo" },
        { label: "Dress", value: "Long, formal gown" },
        { label: "Color", value: "Powder blue to silver gradient" },
        { label: "Footwear", value: "Comfortable heels" },
      ],
      icons: [
        { type: "bag", label: "Clutch" },
        { type: "lipstick", label: "Soft glam" },
        { type: "heels", label: "Heels" },
      ],
    },
    {
      role: "Gentlemen",
      details: [
        { label: "Hair", value: "Classic, groomed style" },
        { label: "Attire", value: "Barong or long-sleeve polo" },
        { label: "Suit", value: "Navy or slate blue blazer, optional" },
        { label: "Color", value: "Navy, slate blue, or white" },
        { label: "Footwear", value: "Formal leather shoes" },
      ],
      icons: [
        { type: "bag", label: "Belt & watch" },
        { type: "heels", label: "Leather shoes" },
      ],
    },
  ];

type CeremonySubItem = {
  label: string;
  name?: string;
  time?: string;
};

type CeremonyPhase = {
  number: string;
  title: string;
  time?: string;
  approx?: boolean;
  song?: string;
  notes?: string[];
  subitems?: CeremonySubItem[];
};

const ceremonyFlow: CeremonyPhase[] = [
  {
    number: "01",
    title: "Prelude",
    time: "2:30 – 2:35 PM",
    song: "Firm Foundation (Instrumental) — c/o Lights & Sound",
  },
  {
    number: "02",
    title: "Processional",
    time: "2:35 – 3:35 PM",
    song: "1st Song — Alabaster Jar & Been So Good (Piano with Singer)",
    notes: ["Entrance of the entourage (parents, sponsors, bridesmaids, groomsmen), followed by the entrance of the bride."],
    subitems: [
      { label: "Pastor", name: "Pr. Manny Manuel", time: "2:35 – 2:40" },
      { label: "Principal Sponsors", name: "Enter by partner", time: "2:40 – 2:45" },
      { label: "Groom with Parents", name: "Renato Rosal & Marichu Rosal", time: "2:45 – 2:50" },
      { label: "Candle Sponsors", name: "Adrin Tipones & Ilona Jean Rosal", time: "2:50 – 2:55" },
      { label: "Veil Sponsors", name: "Pres Joel Manuel & Rica Jaine Rosal (Remover: Cyrus Palomar & Rose Jane Atibagos)", time: "2:55 – 3:00" },
      { label: "Cord Sponsors", name: "Elijah Hernandez & Angela Diaz (Remover: Atty. Jorenz Obiedo & Donisa Diaz)", time: "3:00 – 3:05" },
      { label: "Maid of Honor & Best Man", name: "James Hernandez & Jennifer Diaz · Ptr. Justine Rosal & Mhariz Diaz", time: "3:05 – 3:10" },
      { label: "Ring Bearer", name: "Azarayah Baisa", time: "3:10 – 3:15" },
      { label: "Bible Bearer", name: "Abdiel John Lael Diaz", time: "3:15 – 3:20" },
      { label: "Coin Bearer", name: "Lance Leo Mendoza", time: "3:20 – 3:25" },
      { label: "Flower Girls", name: "Nathalia Jaine Rosal, Princess Ryzza Rosal, Zia Jean Grace, Faith Diaz", time: "3:25 – 3:30" },
      { label: "The Bride", name: "With parents Damaso Diaz & Susan Diaz", time: "3:30 – 3:35" },
    ],
  },
  {
    number: "02b",
    title: "The Bride's Entrance",
    time: "3:35 – 3:40 PM",
    song: "2nd Song — What A Beautiful Name It Is (Chorus, piano instrumental)",
  },
  {
    number: "03",
    title: "Crowd Worship",
    time: "≈ 2–3 mins",
    song: "3rd Song — Lilim (1st chorus–bridge)",
  },
  {
    number: "04",
    title: "Opening Words from the Officiating Minister",
    approx: true,
    time: "3:40 – 3:45 PM",
  },
  {
    number: "05",
    title: "Candle Sponsors — Lighting the Candles",
    time: "3:45 – 3:50 PM",
    song: "4th Song — Reckless Love (Chorus & Bridge, piano)",
    subitems: [{ label: "Candle Sponsors", name: "Adrin Tipones & Ilona Jean Rosal" }],
  },
  {
    number: "06",
    title: "Opening Prayer",
    time: "3:50 – 3:55 PM",
    song: "5th Song — Jesus at the Center (Piano Instrumental, plays through this segment)",
    notes: ["Ptra. Corazon Manuel"],
  },
  {
    number: "07",
    title: "Parents — Blessing and Pledge of Support",
    time: "3:55 – 4:00 PM",
  },
  {
    number: "08",
    title: "Reading & Short Exhortation of the Minister",
    time: "4:00 – 4:05 PM",
  },
  {
    number: "09",
    title: "Declaration of Intentions — \"I Do\"",
    time: "4:05 – 4:10 PM",
  },
  {
    number: "10",
    title: "Presentation of Rings, Coin & Bible",
    time: "4:10 – 4:15 PM",
    subitems: [
      { label: "Rings", name: "Azarayah Baisa" },
      { label: "Coin", name: "Lance Leo Mendoza" },
      { label: "Bible", name: "Abdiel John Lael Diaz" },
    ],
  },
  {
    number: "11",
    title: "Exchange of Rings and Giving of Vows",
    time: "4:15 – 4:20 PM",
  },
  {
    number: "12",
    title: "Giving of the Arrhae / Aras",
    time: "4:20 – 4:25 PM",
  },
  {
    number: "13",
    title: "Giving of the Bible",
    time: "4:25 – 4:30 PM",
    notes: ["Minister will give a short exhortation; the veil and cord ceremony follow right after."],
  },
  {
    number: "14",
    title: "Pinning of the Veil",
    time: "4:30 – 4:35 PM",
    song: "6th Song — Build My Life (Piano with Singer)",
    subitems: [{ label: "Veil Sponsors", name: "Pres Joel Manuel & Rica Jaine Rosal" }],
  },
  {
    number: "15",
    title: "Placing of the Cord",
    time: "4:10 – 4:15 PM",
    subitems: [{ label: "Cord Sponsors", name: "Elijah Hernandez & Angela Diaz" }],
  },
  {
    number: "16",
    title: "Signing of the Certificate",
    approx: true,
    time: "4:15 – 4:25 PM",
  },
  {
    number: "17",
    title: "Prayer of Blessing to the Couple",
    time: "4:25 – 4:30 PM",
  },
  {
    number: "18",
    title: "Removal of the Cord and Veil",
    time: "4:30 – 4:35 PM",
    song: "7th Song — More Than Able (Piano Instrumental)",
    notes: ["Cord sponsor removes first, then the veil sponsor."],
    subitems: [
      { label: "Cord Remover", name: "Atty. Jorenz Obiedo & Donisa Diaz" },
      { label: "Veil Remover", name: "Cyrus Palomar & Rose Jane Atibagos" },
    ],
  },
  {
    number: "19",
    title: "Lighting of the Unity Candle",
    time: "4:35 – 4:40 PM",
    song: "8th Song — I Trust in God (Piano Instrumental)",
    notes: ["The couple lights the center candle using their individual candles."],
  },
  {
    number: "20",
    title: "Marriage Blessing & Thanks to Parents",
    time: "4:40 – 4:45 PM",
  },
  {
    number: "21",
    title: "Pronouncement of Marriage & Kiss the Bride",
    time: "4:45 – 4:50 PM",
  },
  {
    number: "22",
    title: "Presentation of the Newlywed",
    time: "4:50 – 4:55 PM",
    song: "9th Song — Mula sa Aking Puso (c/o Lights & Sound)",
  },
  {
    number: "23",
    title: "Recessional",
    time: "4:55 – 5:00 PM",
    song: "9th Song — Mula sa Aking Puso (c/o Lights & Sound)",
  },
  {
    number: "24",
    title: "Pictorial",
    time: "Following the ceremony",
    subitems: [
      { label: "1", name: "Bride and Groom with Pastor" },
      { label: "2", name: "Bride and Groom with Pastor and the Pastor's Wife" },
      { label: "3", name: "Bride and Groom with Principal Sponsors" },
      { label: "4", name: "Bride and Groom with Secondary Sponsors" },
      { label: "5", name: "Bride and Groom with the Best Men" },
      { label: "6", name: "Bride and Groom with the Matron of Honour" },
      { label: "7", name: "Bride and Groom with the Matron of Honour, Best Men & All Secondary Sponsors" },
      { label: "8", name: "Bride and Groom with both Parents" },
      { label: "9", name: "Bride and Groom with Bride's Parents only" },
      { label: "10", name: "Bride and Groom with Bride's Immediate Family" },
      { label: "11", name: "Bride and Groom with Bride's Immediate Family and Relatives" },
      { label: "12", name: "Bride and Groom with Groom's Parents only" },
      { label: "13", name: "Bride and Groom with Groom's Immediate Family" },
      { label: "14", name: "Bride and Groom with Groom's Immediate Family and Relatives" },
      { label: "15", name: "Bride and Groom with all friends" },
    ],
  },
  {
    number: "25",
    title: "Reception Program",
    time: "5:00 – 6:30 PM",
    subitems: [
      { label: "•", name: "Pre-Program" },
      { label: "•", name: "Worship Rally" },
      { label: "•", name: "Opening Prayer" },
      { label: "•", name: "Game 1: How Well Do You Know The Couple (5-10 Questions)" },
      { label: "•", name: "Sending-off Dance" },
      { label: "•", name: "Couple's First Dance" },
      { label: "•", name: "Fortune Dance" },
      { label: "•", name: "Cake-Slicing" },
      { label: "•", name: "Ceremonial Toast" },
      { label: "•", name: "Game 2: Bring Me" },
      { label: "•", name: "Blessing of the Food" },
      { label: "•", name: "Photo Opportunity" },
      { label: "•", name: "DINNER" },
      { label: "•", name: "Game 3: Guess the title of the song" },
      { label: "•", name: "Well-wishers" },
      { label: "•", name: "SDE Video" },
      { label: "•", name: "Couple's Thank You Speech" },
      { label: "•", name: "Outro" },
    ],
  },
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

function AttireIcon({ type }: { type: "bag" | "heels" | "lipstick" }) {
  const common = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  if (type === "bag") {
    return (
      <svg {...common} width="18" height="18" aria-hidden="true">
        <path d="M4 9.5c0-.9.7-1.6 1.6-1.6h12.8c.9 0 1.6.7 1.6 1.6v8.4c0 1.2-1 2.1-2.1 2.1H6.1C5 20 4 19.1 4 17.9V9.5Z" />
        <path d="M9 8V6.6C9 5.2 10.2 4 11.6 4h.8C13.8 4 15 5.2 15 6.6V8" />
        <circle cx="12" cy="12.2" r="1" />
      </svg>
    );
  }
  if (type === "lipstick") {
    return (
      <svg {...common} width="18" height="18" aria-hidden="true">
        <path d="M9.5 21V13.5c0-1.4 1.1-2.5 2.5-2.5s2.5 1.1 2.5 2.5V21h-5Z" />
        <path d="M9.5 13.2 12 4l2.5 9.2" />
        <path d="M9.8 17h4.4" />
      </svg>
    );
  }
  return (
    <svg {...common} width="18" height="18" aria-hidden="true">
      <path d="M4.5 19.5c0-1.6 1.6-2 3.4-2.4 1.7-.4 2.7-.9 3-1.9.3-1-.2-1.8-1-2.6-1.3-1.3-1.9-2.8-1.1-4.4C9.6 6.6 11 6 12.4 6.4c1.6.5 2.3 1.9 2.6 3.4.4 2 .3 4.4-.2 6.6-.3 1.4-.2 2.3.9 2.7.9.3 1.8.2 2.4-.4" />
      <path d="M4.5 19.5h15" />
    </svg>
  );
}

function CoutureCrest({ className = "" }: { className?: string }) {
  return (
    <div className={`couture-crest ${className}`} aria-label="Rene and Yheng">
      <span>R</span>
      <em>&amp;</em>
      <span>Y</span>
    </div>
  );
}

function CountdownLocket({ value, label, index }: { value: string; label: string; index: number }) {
  const reduceMotion = useReducedMotion();
  return (
    <div className="countdown-locket" style={{ animationDelay: `${index * 0.45}s` }}>
      <svg className="countdown-locket__ring" viewBox="0 0 100 100" aria-hidden="true">
        <circle className="countdown-locket__ring-outer" cx="50" cy="50" r="46.5" />
        <circle className="countdown-locket__ring-inner" cx="50" cy="50" r="39" />
      </svg>
      <div className="countdown-locket__face">
        <span className="countdown-locket__digits">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span
              key={value}
              className="countdown-locket__digit"
              initial={reduceMotion ? false : { y: 14, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={reduceMotion ? undefined : { y: -14, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              {value}
            </motion.span>
          </AnimatePresence>
        </span>
        <span className="countdown-locket__label">{label}</span>
      </div>
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
        <strong>Rene <em>&amp;</em> Yheng</strong>
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

function ArchFrame({ children, className = "", style }: { children: React.ReactNode; className?: string; style?: CSSProperties }) {
  return <div className={`arch-frame ${className}`} style={style}>{children}</div>;
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

function CeremonyTimelinePhase({
  phase,
  index,
  isOpen,
  onToggle,
}: {
  phase: CeremonyPhase;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const hasDetails = Boolean(phase.notes?.length || phase.subitems?.length);
  const isPictorial = phase.number === "24";

  return (
    <Reveal delay={Math.min(index * 0.035, 0.5)} className="scroll-reveal">
      <article className={`timeline-item ${isOpen ? "is-open" : ""}`}>
        <button
          type="button"
          className="timeline-item__head"
          onClick={hasDetails ? onToggle : undefined}
          aria-expanded={hasDetails ? isOpen : undefined}
          disabled={!hasDetails}
        >
          <span className="timeline-item__number">{phase.number.replace("b", "")}</span>
          <span className="timeline-item__heading">
            <h3>{phase.title}</h3>
            <span className="timeline-item__meta">
              {phase.time && (
                <span className="timeline-item__time">
                  <Clock3 size={12} /> {phase.approx ? "≈ " : ""}
                  {phase.time}
                </span>
              )}
              {phase.song && (
                <span className="timeline-item__song">
                  <Music2 size={12} /> {phase.song}
                </span>
              )}
            </span>
          </span>
          {hasDetails && (
            <span className="timeline-item__chevron">
              <ChevronDown size={16} />
            </span>
          )}
        </button>

        <AnimatePresence initial={false}>
          {hasDetails && isOpen && (
            <motion.div
              className="timeline-item__body"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
            >
              <div className="timeline-item__body-inner">
                {phase.notes?.map((note, noteIndex) => (
                  <p className="timeline-item__note" key={noteIndex}>
                    <StickyNote size={12} /> {note}
                  </p>
                ))}
                {phase.subitems && (
                  <ol className="timeline-sublist">
                    {phase.subitems.map((item, itemIndex) => (
                      <li className="timeline-subitem" key={itemIndex}>
                        <span className="timeline-subitem__icon" aria-hidden="true">
                          {isPictorial ? <Camera size={12} /> : <Users size={12} />}
                        </span>
                        <span className="timeline-subitem__text">
                          <strong>{item.label}</strong>
                          {item.name && <span> — {item.name}</span>}
                        </span>
                        {item.time && <span className="timeline-subitem__time">{item.time}</span>}
                      </li>
                    ))}
                  </ol>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </article>
    </Reveal>
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

      /* Phase 1: Camera zooms into the cover (0 → 3.5s) */
      tl.fromTo(
        ".zeo__stage",
        { scale: 1, opacity: 1 },
        { scale: 4, opacity: 0, duration: 3.5, ease: "power2.inOut" },
        0,
      );

      /* Phase 2: Radial light burst blooms gently to transition */
      tl.fromTo(
        ".zeo__burst",
        { opacity: 0, scale: 0.2 },
        { opacity: 1, scale: 2.5, duration: 2, ease: "power2.out" },
        1.0,
      );

      /* Phase 3: Fade out burst at the end */
      tl.to(
        ".zeo__burst",
        { opacity: 0, duration: 0.5, ease: "power2.in" },
        3.0,
      );

      /* Phase 4: Reveal the actual cover content */
      tl.fromTo(
        ".cover-section",
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 1, ease: "power2.out" },
        3.2,
      );
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
  const [soundtrackOn, setSoundtrackOn] = useState(false);
  const [openPhases, setOpenPhases] = useState<Set<string>>(() => new Set(["02"]));
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const lenisRef = useRef<Lenis | null>(null);
  const musicRef = useRef<HTMLAudioElement | null>(null);
  const soundtrackRef = useRef<HTMLAudioElement | null>(null);
  const countdown = useCountdown();
  const reduceMotion = useReducedMotion();

  const playlist = [
    { title: "Been So Good", artist: "Elevation Worship (feat. Tiffany Hudson)", duration: "5:30", src: asset.song1 },
    { title: "Lilim Cover", artist: "UPC Imus Virtual Choir", duration: "4:45", src: asset.song2 },
    { title: "Mula Sa Aking Puso", artist: "Joseph Ponce & Carlo David", duration: "5:15", src: asset.song3 },
    { title: "Nangangamoy Pag Ibig", artist: "Kent Charcos (feat. Dana Algabre)", duration: "4:50", src: asset.song4 },
  ];

  const calendarLink = useMemo(() => {
    const params = new URLSearchParams({
      text: "The Wedding of Rene & Yheng",
      details: "With grateful hearts, we invite you to share our first day as husband and wife.",
      location: "Trees Residences (Indoor Function Hall), Fairview, Quezon City",
      dates: "20260921T063000Z/20260921T103000Z",
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
    if (reduceMotion) return;

    // Scroll reveal animations - run immediately when page loads
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const scrollObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    }, observerOptions);

    // Observe all scroll-reveal elements
    const scrollElements = document.querySelectorAll('.scroll-reveal, .scroll-reveal-left, .scroll-reveal-right, .scroll-reveal-scale, .scroll-reveal-rotate, .scroll-reveal-blur');
    scrollElements.forEach((el) => scrollObserver.observe(el));

    // Set gallery index for staggered animation
    const galleryTiles = document.querySelectorAll('.gallery-tile');
    galleryTiles.forEach((tile, index) => {
      (tile as HTMLElement).style.setProperty('--gallery-index', index.toString());
    });

    return () => {
      scrollObserver.disconnect();
      scrollElements.forEach((el) => scrollObserver.unobserve(el));
    };
  }, [reduceMotion]);

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

  useEffect(() => {
    return () => {
      musicRef.current?.pause();
      soundtrackRef.current?.pause();
    };
  }, []);

  const startBackgroundMusic = async (startAtOpeningOffset = false) => {
    const audio = musicRef.current;
    if (!audio) return;
    audio.volume = 0.46;

    // Ensure the audio source is set
    if (!audio.src || audio.src !== playlist[currentSongIndex].src) {
      audio.src = playlist[currentSongIndex].src;
    }

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

  const startSoundtrack = async () => {
    const audio = soundtrackRef.current;
    if (!audio) return;
    audio.volume = 0.46;

    if (!audio.src || audio.src !== playlist[currentSongIndex].src) {
      audio.src = playlist[currentSongIndex].src;
    }

    try {
      await audio.play();
      setSoundtrackOn(true);
    } catch {
      setSoundtrackOn(false);
    }
  };

  const toggleSoundtrack = () => {
    const audio = soundtrackRef.current;
    if (!audio) return;
    if (audio.paused) {
      void startSoundtrack();
      return;
    }
    audio.pause();
    setSoundtrackOn(false);
  };

  const playNextSong = () => {
    const nextIndex = (currentSongIndex + 1) % playlist.length;
    setCurrentSongIndex(nextIndex);
    const audio = soundtrackRef.current;
    if (audio) {
      audio.src = playlist[nextIndex].src;
      if (soundtrackOn) {
        void startSoundtrack();
      }
    }
  };

  const playPreviousSong = () => {
    const prevIndex = (currentSongIndex - 1 + playlist.length) % playlist.length;
    setCurrentSongIndex(prevIndex);
    const audio = soundtrackRef.current;
    if (audio) {
      audio.src = playlist[prevIndex].src;
      if (soundtrackOn) {
        void startSoundtrack();
      }
    }
  };

  const selectSong = (index: number) => {
    setCurrentSongIndex(index);
    const audio = soundtrackRef.current;
    if (audio) {
      audio.src = playlist[index].src;
      void startSoundtrack();
    }
  };

  // Update progress bar and auto-advance
  useEffect(() => {
    const audio = soundtrackRef.current;
    if (!audio || !soundtrackOn) return;

    const updateProgress = () => {
      if (audio.duration) {
        setProgress((audio.currentTime / audio.duration) * 100);
      }
    };

    const interval = setInterval(updateProgress, 100);

    const handleEnded = () => {
      playNextSong();
    };

    audio.addEventListener('ended', handleEnded);

    return () => {
      clearInterval(interval);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [soundtrackOn, currentSongIndex]);

  const toggleTimelinePhase = (number: string) => {
    setOpenPhases((current) => {
      const next = new Set(current);
      if (next.has(number)) {
        next.delete(number);
      } else {
        next.add(number);
      }
      return next;
    });
  };

  const allTimelineOpen = openPhases.size === ceremonyFlow.length;
  const toggleAllTimelinePhases = () => {
    setOpenPhases(allTimelineOpen ? new Set() : new Set(ceremonyFlow.map((phase) => phase.number)));
  };

  const openInvitation = async () => {
    if (opening) return;
    setOpening(true);

    // Ensure background audio is loaded before playing
    const audio = musicRef.current;
    if (audio) {
      audio.load();
      // Wait a bit for the audio to be ready
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    void startBackgroundMusic(true);
    // Force the 3500ms duration so the cinematic zoom animation always has time to play
    window.setTimeout(() => setOpened(true), 3500);
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
      <audio ref={musicRef} src={asset.music} loop preload="auto" />
      <audio ref={soundtrackRef} src={playlist[currentSongIndex].src} preload="metadata" />
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
                  <b>Rene</b>
                  <span>&amp;</span>
                  <b>Yheng</b>
                </h1>
                <div className="gate-rule" />
                <p className="guest-label"></p>
                <p className="guest-name"></p>
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
            <ArchFrame
              className="cover-arch cover-arch--oval"
              style={{
                backgroundImage: `linear-gradient(180deg, rgb(250 254 255 / .55), rgb(234 246 251 / .68)), url(${asset.coverPhoto})`,
                backgroundSize: "cover",
                backgroundPosition: "center center",
                backgroundRepeat: "no-repeat",
              }}
            >
              <div className="cover-content">
                <CoutureCrest className="couture-crest--cover" />
                <p className="eyebrow">The Wedding Of</p>
                <h1>
                  Rene <span>&amp;</span> Yheng
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
          <Reveal className="endless-arch scroll-reveal-scale">
            <img className="endless-ornament endless-ornament--top" src={ornament.engraving} alt="" />
            <span className="endless-seal"><Sparkles size={15} strokeWidth={1.4} /></span>
            <div className="endless-image-frame">
              <img src={asset.back} alt="Endless Love couple" />
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
          <Reveal className="couple-heading-reveal scroll-reveal">
            <SectionHeading eyebrow="With grateful hearts">Rene &amp; Yheng</SectionHeading>
          </Reveal>
          <div className="couple-card couple-card--groom">
            <div className="portrait-wrap">
              <img src={asset.groom} alt="Groom portrait" />
              <span className="portrait-label">The Groom</span>
            </div>
            <div className="person-copy">
              <p className="eyebrow">A beloved son</p>
              <h3>Groom</h3>
              <p>Son of Renato Rosal &amp; Marichu Rosal</p>
            </div>
          </div>
          <div className="ampersand-divider" aria-hidden="true">&amp;</div>
          <div className="couple-card couple-card--bride">
            <div className="person-copy">
              <p className="eyebrow">A cherished daughter</p>
              <h3>Bride</h3>
              <p>Daughter of Damaso Diaz &amp; Susan Diaz</p>
            </div>
            <div className="portrait-wrap portrait-wrap--offset">
              <img src={asset.bride} alt="Bride portrait" />
              <span className="portrait-label">The Bride</span>
            </div>
          </div>
        </section>

        <section className="film-section" aria-label="Prewedding film">
          <div className="film-section__canvas" aria-hidden="true" />
          <div className="film-section__overlay" />
          <span className="film-section__stamp">A memory in bloom</span>
          <img className="film-section__decoration film-section__decoration--top-left" src={ornament.corner} alt="" aria-hidden="true" />
          <img className="film-section__decoration film-section__decoration--top-right" src={ornament.corner} alt="" aria-hidden="true" />
          <img className="film-section__decoration film-section__decoration--bottom-left" src={ornament.lower} alt="" aria-hidden="true" />
          <img className="film-section__decoration film-section__decoration--bottom-right" src={ornament.lower} alt="" aria-hidden="true" />
          <img className="film-section__vine film-section__vine--left" src={ornament.vine} alt="" aria-hidden="true" />
          <img className="film-section__vine film-section__vine--right" src={ornament.vine} alt="" aria-hidden="true" />
          <span className="film-section__sparkle film-section__sparkle--one" aria-hidden="true">✦</span>
          <span className="film-section__sparkle film-section__sparkle--two" aria-hidden="true">✦</span>
          <span className="film-section__sparkle film-section__sparkle--three" aria-hidden="true">✦</span>
          <span className="film-section__sparkle film-section__sparkle--four" aria-hidden="true">✦</span>
          <span className="film-section__sparkle film-section__sparkle--five" aria-hidden="true">✦</span>
          <span className="film-section__sparkle film-section__sparkle--six" aria-hidden="true">✦</span>
          <span className="film-section__petal film-section__petal--one" aria-hidden="true" />
          <span className="film-section__petal film-section__petal--two" aria-hidden="true" />
          <span className="film-section__petal film-section__petal--three" aria-hidden="true" />
          <ButterflyConstellation className="butterfly-constellation--film" />
          <Reveal className="film-section__content">
            <p className="eyebrow">Our Prelude</p>
            <h2>A ministry, a promise,<br />a lifetime.</h2>
            <div className="film-section__video">
              <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/ok_jH1kPDZw"
                title="Wedding prelude video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </Reveal>
        </section>

        <section
          className="event-section event-section--lakeside parchment-section"
          style={{ backgroundImage: `linear-gradient(180deg, rgb(244 251 254 / .12), rgb(33 74 96 / .13)), url(${asset.lakeside})` }}
        >
          <img className="event-engraving" src={ornament.engraving} alt="" />
          <Reveal className="scroll-reveal">
            <SectionHeading eyebrow="Save the date">Wedding Event</SectionHeading>
            <p className="intro-copy">
              By the grace of God, we are pleased to announce our wedding to you, our family, and our friends.
              We request the honor of your presence on our special day.
            </p>
          </Reveal>
          <div className="event-list">
            {eventDetails.map((event, index) => (
              <Reveal key={event.title} delay={index * 0.08} className="scroll-reveal">
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
          <Reveal className="scroll-reveal">
            <SectionHeading eyebrow="Dress with us">Attire Guidelines</SectionHeading>
            <p className="intro-copy">A touch of blue will make the day feel even more like ours.</p>
          </Reveal>

          <Reveal className="attire-colors scroll-reveal">
            <p className="attire-colors__label">
              <span className="attire-colors__script">the</span> Colors
            </p>
            <div className="attire-colors__row" aria-label="Wedding color palette">
              {attirePalette.map((color) => (
                <i key={color} style={{ backgroundColor: color }} />
              ))}
            </div>
          </Reveal>

          <Reveal className="attire-look scroll-reveal">
            <p className="attire-look__label">
              <span className="attire-look__script">the</span> Look
            </p>
            <div className="attire-grid">
              {attireGuidelines.map((attire, index) => (
                <Reveal key={attire.role} delay={index * 0.08} className="scroll-reveal">
                  <article className="attire-card">
                    <span className="attire-card__icon"><Shirt size={18} /></span>
                    <p className="eyebrow">{attire.role}</p>
                    <ul className="attire-look__list">
                      {attire.details.map((detail) => (
                        <li key={detail.label}>
                          <span className="attire-look__label-text">{detail.label}</span>
                          <span className="attire-look__sep">|</span>
                          <span className="attire-look__value">{detail.value}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="attire-look__icons">
                      {attire.icons.map((icon) => (
                        <div className="attire-look__icon" key={icon.label}>
                          <span className="attire-look__icon-circle"><AttireIcon type={icon.type} /></span>
                          <em>{icon.label}</em>
                        </div>
                      ))}
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </Reveal>
        </section>

        <section
          className="gallery-section gallery-section--hydrangea parchment-section"
          style={{ backgroundImage: `linear-gradient(180deg, rgb(247 253 255 / .1), rgb(43 82 103 / .12)), url(${asset.gallery})` }}
        >
          <span className="gallery-sparkle gallery-sparkle--one" aria-hidden="true">✦</span>
          <span className="gallery-sparkle gallery-sparkle--two" aria-hidden="true">✦</span>
          <Reveal className="scroll-reveal">
            <SectionHeading eyebrow="Fragments of us">Our Gallery</SectionHeading>
          </Reveal>
          <p className="gallery-note scroll-reveal">A collection of little moments, kept close.</p>
          <div className="gallery-grid">
            {galleryImages.map((src, index) => (
              <Reveal key={`gallery-placeholder-${index + 1}`} delay={(index % 3) * 0.06} className={`gallery-tile gallery-tile--${index + 1} scroll-reveal`}>
                <div className="gallery-image-wrapper" onClick={() => setLightboxImage(src)}>
                  <img src={src} alt={`Wedding gallery placeholder ${index + 1}`} />
                  <span className="gallery-view-indicator" aria-label="Click to view image">
                    <Eye size={20} />
                  </span>
                </div>
                <span className="polaroid-caption">Memory {index + 1}</span>
              </Reveal>
            ))}
          </div>
        </section>

        <section
          className="location-section location-section--garden-gate"
          style={{ backgroundImage: `linear-gradient(180deg, rgb(245 252 254 / .05), rgb(38 79 104 / .1)), url(${asset.gate})` }}
        >
          <div className="location-section__wash" />
          <Reveal className="location-content scroll-reveal">
            <SectionHeading eyebrow="Find your way">Location</SectionHeading>
            <div className="location-card scroll-reveal">
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
            <img src={asset.wemet} alt="Love story couple" />
          </Reveal>
          <div className="story-list">
            {[
              ["01", "first meeting", "We met at Apostolic Tabernacle of Mt. Heights Church, specifically in evangelism ministry. The ministry of winning souls coupled with uncomfortable situations and circumstances opened the way."],
              ["02", "First person point of view", "Little did we know that by doing our God-given ministries faced by situations not favorable to both of us came an open door for our hearts to grow in love with each other."],
              ["03", "new journey", "Today, in the perfect will of the Lord and with the people who have shaped our lives beside us, we begin the gentle work and joy of building a home together."],
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
          <Reveal className="scroll-reveal">
            <SectionHeading eyebrow="A song for our day">Our Soundtrack</SectionHeading>
          </Reveal>
          <Reveal className="soundtrack-card scroll-reveal">
            <span className={`soundtrack-card__disc ${musicOn ? 'soundtrack-card__disc--playing' : 'soundtrack-card__disc--paused'}`}>
              <Disc3 size={64} className="soundtrack-disc-icon" />
            </span>
            <p className="eyebrow">Now playing</p>
            <h3>{playlist[currentSongIndex].title}</h3>
            <p className="soundtrack-artist">{playlist[currentSongIndex].artist}</p>

            <div className="soundtrack-progress">
              <div className="soundtrack-progress-bar">
                <div className="soundtrack-progress-bar__fill" style={{ width: `${progress}%` }} />
              </div>
              <div className="soundtrack-progress__time">
                <span>0:00</span>
                <span>{playlist[currentSongIndex].duration}</span>
              </div>
            </div>

            <div className="soundtrack-controls">
              <button
                type="button"
                className="soundtrack-control-button"
                onClick={playPreviousSong}
                aria-label="Previous song"
              >
                <SkipBack size={18} />
              </button>
              <button
                type="button"
                className="soundtrack-control-button soundtrack-control-button--main"
                onClick={toggleSoundtrack}
                aria-label={soundtrackOn ? "Pause music" : "Play music"}
              >
                {soundtrackOn ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" />}
              </button>
              <button
                type="button"
                className="soundtrack-control-button"
                onClick={playNextSong}
                aria-label="Next song"
              >
                <SkipForward size={18} />
              </button>
            </div>

            <ul className="soundtrack-playlist">
              {playlist.map((song, index) => (
                <li
                  key={index}
                  className={`soundtrack-playlist-item ${index === currentSongIndex ? 'soundtrack-playlist-item--active' : ''}`}
                  onClick={() => selectSong(index)}
                >
                  <span className="soundtrack-playlist-item__icon">
                    {index === currentSongIndex && soundtrackOn ? <Pause size={14} fill="currentColor" /> : <Play size={14} fill="currentColor" />}
                  </span>
                  <div className="soundtrack-playlist-item__info">
                    <h4 className="soundtrack-playlist-item__title">{song.title}</h4>
                    <p className="soundtrack-playlist-item__artist">{song.artist}</p>
                  </div>
                  <span className="soundtrack-playlist-item__duration">{song.duration}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </section>

        <section className="timeline-section parchment-section">
          <img className="timeline-engraving" src={ornament.engraving} alt="" />
          <span className="paper-orbit paper-orbit--timeline" aria-hidden="true" />
          <img className="timeline-decoration timeline-decoration--top-left" src={ornament.corner} alt="" aria-hidden="true" />
          <img className="timeline-decoration timeline-decoration--bottom-right" src={ornament.lower} alt="" aria-hidden="true" />
          <span className="timeline-sparkle timeline-sparkle--one" aria-hidden="true">✦</span>
          <span className="timeline-sparkle timeline-sparkle--two" aria-hidden="true">✦</span>
          <span className="timeline-sparkle timeline-sparkle--three" aria-hidden="true">✦</span>
          <Reveal className="scroll-reveal">
            <SectionHeading eyebrow="Celebrate with us">Wedding Ceremony Flow</SectionHeading>
            <p className="intro-copy">A gentle, complete guide to every moment we will share together — tap a step for the full details.</p>
          </Reveal>
          <button type="button" className="timeline-toggle-all scroll-reveal" onClick={toggleAllTimelinePhases}>
            {allTimelineOpen ? "Collapse all" : "Expand all"}
          </button>
          <div className="timeline-list">
            {ceremonyFlow.map((phase, index) => (
              <CeremonyTimelinePhase
                key={phase.number}
                phase={phase}
                index={index}
                isOpen={openPhases.has(phase.number)}
                onToggle={() => toggleTimelinePhase(phase.number)}
              />
            ))}
          </div>
        </section>

        <section className="closing-section" style={{ backgroundImage: `url(${asset.closing})` }}>
          <div className="closing-section__wash" />
          <span className="closing-star closing-star--one" aria-hidden="true">✦</span>
          <span className="closing-star closing-star--two" aria-hidden="true">✦</span>
          <Reveal className="closing-content scroll-reveal">
            <CoutureCrest className="couture-crest--closing" />
            <p className="eyebrow">Counting the days</p>
            <div className="countdown-cluster" aria-label="Countdown to wedding day">
              <svg className="countdown-cluster__vine" viewBox="0 0 400 60" preserveAspectRatio="none" aria-hidden="true">
                <path d="M24,30 Q100,6 200,30 T376,30" />
                <circle className="countdown-cluster__vine-mark" cx="120" cy="15" r="2.4" />
                <circle className="countdown-cluster__vine-mark" cx="200" cy="30" r="2.4" />
                <circle className="countdown-cluster__vine-mark" cx="280" cy="15" r="2.4" />
              </svg>
              <div className="countdown-cluster__row">
                {[
                  [countdown.days, "Days"],
                  [countdown.hours, "Hours"],
                  [countdown.minutes, "Minutes"],
                  [countdown.seconds, "Seconds"],
                ].map(([value, label], index) => (
                  <CountdownLocket key={label} value={value} label={label} index={index} />
                ))}
              </div>
            </div>
            <a href={calendarLink} target="_blank" rel="noreferrer" className="save-date-button scroll-reveal">
              <CalendarDays size={16} /> Save The Date
            </a>
            <div className="closing-blessing scroll-reveal">
              <p>It is a pleasure and honor for us, if you are willing to attend and give us your blessing.</p>
              <h2>Rene <span>&amp;</span> Yheng</h2>
            </div>
          </Reveal>
        </section>

        <footer>
          <img src={asset.logo} alt="" />
          <p>Made with love for a day to remember</p>
          <span>© 2026 Rene &amp; Yheng</span>
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

      {lightboxImage && (
        <motion.div
          className="lightbox"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setLightboxImage(null)}
        >
          <motion.img
            src={lightboxImage}
            alt="Gallery image in lightbox"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8 }}
            onClick={(e) => e.stopPropagation()}
          />
          <button
            className="lightbox-close"
            onClick={() => setLightboxImage(null)}
            aria-label="Close lightbox"
          >
            <X size={24} />
          </button>
        </motion.div>
      )}

    </main>
  );
}