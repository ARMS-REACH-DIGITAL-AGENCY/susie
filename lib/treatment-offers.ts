export type TreatmentKey = "ultimate" | "pemf" | "lymphatic" | "fascia" | "pelvic" | "contour" | "muscle";

export type TreatmentProduct = {
  count: number;
  price: number;
  duration: number | null;
  href: string;
};

export type TreatmentOffer = {
  key: TreatmentKey;
  name: string;
  short: string;
  icon: string;
  description: string;
  included: string[];
  benefits: string[];
  products: TreatmentProduct[];
};

// Keep all public treatment pages aligned to the same approved price list.
export const treatmentOffers: TreatmentOffer[] = [
  {
    key: "ultimate", name: 'Ultimate "YOU" Experience', short: "Ultimate YOU", icon: "/images/susie.jpg",
    description: "Susie’s complete six-treatment experience when several goals matter or you want help identifying the best focused path.",
    included: ["One Body Contouring treatment", "One Fascia and Skin Revival treatment", "One Lymphatic Wellness treatment", "One Muscle + Strength + Tone treatment", "One Pelvic Floor Strengthening treatment", "One PEMF Recovery and Wellness treatment"], benefits: [],
    products: [{ count: 6, price: 1297, duration: null, href: "https://api.armsreachdigital.com/payment-link/6a6da6b87b99151a54041af5" }],
  },
  {
    key: "muscle", name: "Muscle + Strength + Tone Series", short: "Muscle + Strength + Tone", icon: "/images/treatment-muscle.png", description: "Muscle activation, strengthening, toning, and body-sculpting support.",
    included: ["EMShape muscle activation", "Strengthening and toning support", "50-minute appointments"], benefits: ["Supports muscle activation and strengthening", "Supports toning and body-sculpting goals", "Helps target areas that can be difficult to tone with exercise alone"],
    products: [{ count: 20, price: 5997, duration: 50, href: "https://api.armsreachdigital.com/payment-link/6a6da301a655fa0b802a7622" }, { count: 10, price: 3997, duration: 50, href: "https://api.armsreachdigital.com/payment-link/6a6da29c7b99151a54041ae9" }, { count: 5, price: 2497, duration: 50, href: "https://api.armsreachdigital.com/payment-link/6a6da211a655fa0b802a7620" }, { count: 1, price: 597, duration: 50, href: "https://api.armsreachdigital.com/payment-link/6a6da028a655fa0b802a761d" }],
  },
  {
    key: "contour", name: "Body Contouring Series", short: "Body Contouring", icon: "/images/treatment-contour.png", description: "Targeted support for inches, stubborn areas, skin tightening, and contouring goals.",
    included: ["Ultrasonic cavitation", "RF skin-tightening support", "55-minute appointments"], benefits: ["Targets stubborn areas and inch-loss goals", "Supports smoother, firmer-looking skin", "Helps refine body contours"],
    products: [{ count: 20, price: 3197, duration: 55, href: "https://api.armsreachdigital.com/payment-link/6a6da44fa655fa0b802a7625" }, { count: 10, price: 1697, duration: 55, href: "https://api.armsreachdigital.com/payment-link/6a6da41ea655fa0b802a7624" }, { count: 5, price: 897, duration: 55, href: "https://api.armsreachdigital.com/payment-link/6a6da3e57b99151a54041aee" }, { count: 1, price: 197, duration: 55, href: "https://api.armsreachdigital.com/payment-link/6a6da32fa655fa0b802a7623" }],
  },
  {
    key: "fascia", name: "Fascia and Skin Revival Series", short: "Fascia + Skin Revival", icon: "/images/treatment-fascia.png", description: "Fascia, circulation, skin-texture, and smoothing support.",
    included: ["Rollerwave fascia treatment", "Circulation and skin-texture support", "55-minute appointments"], benefits: ["Supports fascia mobility and circulation", "Supports smoother-looking skin texture", "Helps address the appearance of cellulite"],
    products: [{ count: 20, price: 3197, duration: 55, href: "https://api.armsreachdigital.com/payment-link/6a6da7f07b99151a54041af8" }, { count: 10, price: 1697, duration: 55, href: "https://api.armsreachdigital.com/payment-link/6a6da84e7b99151a54041af9" }, { count: 5, price: 897, duration: 55, href: "https://api.armsreachdigital.com/payment-link/6a6da727a655fa0b802a7629" }, { count: 1, price: 197, duration: 55, href: "https://api.armsreachdigital.com/payment-link/6a6da6ec7b99151a54041af6" }],
  },
  {
    key: "pelvic", name: "Pelvic Floor Strengthening Series", short: "Pelvic Floor Strengthening", icon: "/images/treatment-pelvic.png", description: "Pelvic-floor and deep-core strengthening support in a private, fully clothed session.",
    included: ["Pelvic-floor muscle activation", "Private, fully clothed treatment", "45-minute appointments"], benefits: ["Supports pelvic-floor strength", "Supports deep-core activation", "Private, fully clothed sessions"],
    products: [{ count: 20, price: 3197, duration: 45, href: "https://api.armsreachdigital.com/payment-link/6a6e2f6da655fa0b802a76b8" }, { count: 10, price: 1697, duration: 45, href: "https://api.armsreachdigital.com/payment-link/6a6da5d87b99151a54041af4" }, { count: 5, price: 897, duration: 45, href: "https://api.armsreachdigital.com/payment-link/6a6da591a655fa0b802a7627" }, { count: 1, price: 197, duration: 45, href: "https://api.armsreachdigital.com/payment-link/6a6da4797b99151a54041af1" }],
  },
  {
    key: "lymphatic", name: "Lymphatic Wellness Series", short: "Lymphatic Wellness", icon: "/images/treatment-lymphatic.png", description: "Lymphatic and circulation support for puffiness, bloating, heaviness, and sluggishness.",
    included: ["Synergie vacuum massage", "Lymphatic-flow and circulation support", "45-minute appointments", "$50 spandex bodysuit included"], benefits: ["Supports healthy lymphatic flow", "Supports circulation and wellness", "Helps you feel lighter and less puffy"],
    products: [{ count: 20, price: 1597, duration: 45, href: "https://api.armsreachdigital.com/payment-link/6a6e1fc77b99151a54041b85" }, { count: 10, price: 897, duration: 45, href: "https://api.armsreachdigital.com/payment-link/6a6e20567b99151a54041b87" }, { count: 5, price: 497, duration: 45, href: "https://api.armsreachdigital.com/payment-link/6a6e221ea655fa0b802a76a6" }, { count: 1, price: 147, duration: 45, href: "https://api.armsreachdigital.com/payment-link/6a6e2307a655fa0b802a76a7" }],
  },
  {
    key: "pemf", name: "PEMF Recovery and Wellness Series", short: "PEMF Recovery + Wellness", icon: "/images/treatment-pemf.png", description: "Recovery and wellness support for aches, fatigue, stress, fogginess, and low energy.",
    included: ["PEMF recovery and wellness treatment", "Relaxation, circulation, and energy support", "30-minute appointments"], benefits: ["Supports recovery and relaxation", "Supports circulation and energy", "Designed for aches, fatigue, stress, and fogginess"],
    products: [{ count: 20, price: 797, duration: 30, href: "https://api.armsreachdigital.com/payment-link/6a6e20ba7b99151a54041b89" }, { count: 10, price: 497, duration: 30, href: "https://api.armsreachdigital.com/payment-link/6a6e22c57b99151a54041b8c" }, { count: 5, price: 297, duration: 30, href: "https://api.armsreachdigital.com/payment-link/6a6e2370a655fa0b802a76ab" }, { count: 1, price: 67, duration: 30, href: "https://api.armsreachdigital.com/payment-link/6a6e23957b99151a54041b8f" }],
  },
];
