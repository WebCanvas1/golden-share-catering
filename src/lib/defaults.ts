import sandwiches from "@/assets/menu-sandwiches.jpg";
import wraps from "@/assets/menu-wraps.jpg";
import fruit from "@/assets/menu-fruit.jpg";
import cheese from "@/assets/menu-cheese.jpg";
import sausage from "@/assets/menu-sausage-rolls.jpg";
import quiche from "@/assets/menu-quiche.jpg";
import pasta from "@/assets/menu-pasta.jpg";
import potato from "@/assets/menu-potato.jpg";
import sweets from "@/assets/menu-sweets.jpg";
import pkgBusiness from "@/assets/pkg-business.jpg";
import pkgFuneral from "@/assets/pkg-funeral.jpg";
import pkgBirthday from "@/assets/pkg-birthday.jpg";
import pkgMeals from "@/assets/pkg-meals.jpg";

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: string;
  image: string;
  active: boolean;
}

export interface CateringPackage {
  id: string;
  name: string;
  description: string;
  price: string;
  priceLabel: string; // e.g. "per person" or "from"
  image: string;
  inclusions: string[];
  active: boolean;
}

export interface AddOn {
  id: string;
  name: string;
  price: string;
  active: boolean;
}

export interface GalleryImage {
  id: string;
  url: string;
  caption: string;
}

export interface BusinessInfo {
  name: string;
  tagline: string;
  phone: string;
  facebook: string;
  instagram: string;
  instagramHandle: string;
  location: string;
}

export interface DeliveryInfo {
  freeDeliveryAreas: string[];
  paidDeliveryAreas: string[];
  paidDeliveryFee: string;
  shortNotice: string;
  minimumSpend: string;
}

export interface HeroContent {
  badge: string;
  headline: string;
  subheadline: string;
  description: string;
  ctaPrimary: string;
  ctaSecondary: string;
}

export interface SiteData {
  hero: HeroContent;
  business: BusinessInfo;
  delivery: DeliveryInfo;
  menuItems: MenuItem[];
  packages: CateringPackage[];
  addOns: AddOn[];
  gallery: GalleryImage[];
}

export const DEFAULT_DATA: SiteData = {
  hero: {
    badge: "Thurgoona Local & Proud",
    headline: "Made to Share Catering",
    subheadline: "Fresh. Local. Made To Share.",
    description:
      "Homemade catering by Cass — fresh, local, and made with love for every occasion. From family gatherings to business lunches, we bring the table to you.",
    ctaPrimary: "View Menu",
    ctaSecondary: "Request a Quote",
  },
  business: {
    name: "Made to Share Catering",
    tagline: "Fresh. Local. Made To Share.",
    phone: "0433 813 324",
    facebook: "https://www.facebook.com/people/Made-to-Share-Catering/",
    instagram: "https://www.instagram.com/made.to.share.catering/",
    instagramHandle: "made.to.share.catering",
    location: "Thurgoona • Albury • Wodonga",
  },
  delivery: {
    freeDeliveryAreas: ["Albury", "Wodonga", "Thurgoona", "& surrounding areas"],
    paidDeliveryAreas: [
      "Wagga Wagga",
      "Beechworth",
      "Yarrawonga",
      "Wangaratta",
      "Junee",
      "The Rock",
      "Culcairn",
      "& more",
    ],
    paidDeliveryFee: "$50",
    shortNotice: "Short notice catering available — we've got you covered!",
    minimumSpend: "No minimum spend",
  },
  menuItems: [
    { id: "m1", name: "Fresh Sandwich Platter", description: "20 pieces (4 varieties)", price: "$55", image: sandwiches, active: true },
    { id: "m2", name: "Wrap Platter", description: "20 pieces (4 varieties)", price: "$65", image: wraps, active: true },
    { id: "m3", name: "Fresh Fruit Platter", description: "Seasonal fresh fruit. Serves 10–12", price: "$60", image: fruit, active: true },
    { id: "m4", name: "Fruit & Cheese Platter", description: "A selection of cheeses, fruits, crackers & dips. Serves 10–12", price: "$80", image: cheese, active: true },
    { id: "m5", name: "Gourmet Sausage Roll Platter", description: "24 pieces", price: "$50", image: sausage, active: true },
    { id: "m6", name: "Mini Quiche Platter", description: "24 pieces (3 varieties)", price: "$50", image: quiche, active: true },
    { id: "m7", name: "Pasta Salad Tray", description: "Freshly made. Serves 10–12", price: "$45", image: pasta, active: true },
    { id: "m8", name: "Potato Salad Tray", description: "Freshly made. Serves 10–12", price: "$45", image: potato, active: true },
    { id: "m9", name: "Sweet Treat Box", description: "A delicious selection of slices, cakes & treats", price: "$55", image: sweets, active: true },
  ],
  packages: [
    {
      id: "p1",
      name: "Business Lunch Package",
      description: "Sandwiches, wraps, fruit platter & sweet treats.",
      price: "$14",
      priceLabel: "per person",
      image: pkgBusiness,
      inclusions: ["Fresh sandwiches", "Gourmet wraps", "Seasonal fruit platter", "Sweet treats"],
      active: true,
    },
    {
      id: "p2",
      name: "Funeral & Wake Package",
      description: "Sandwiches, wraps, fruit, cheese & crackers, tea, coffee & sweets.",
      price: "$15",
      priceLabel: "per person",
      image: pkgFuneral,
      inclusions: ["Sandwiches & wraps", "Cheese & cracker platter", "Fresh fruit", "Tea & coffee service", "Sweet treats"],
      active: true,
    },
    {
      id: "p3",
      name: "Birthday Party Package",
      description: "Sandwiches, sausage rolls, party pies, fruit platter & sweet treats.",
      price: "$14",
      priceLabel: "per person",
      image: pkgBirthday,
      inclusions: ["Sandwich platter", "Gourmet sausage rolls", "Party pies", "Fresh fruit platter", "Sweet treats"],
      active: true,
    },
    {
      id: "p4",
      name: "Home Cooked Meals",
      description: "Delicious homestyle meals for a family of four. Ready to heat & enjoy!",
      price: "$25",
      priceLabel: "from",
      image: pkgMeals,
      inclusions: ["Lasagna", "Spaghetti Bolognese", "Beef & Veg Casserole", "Curried Sausages with Steamed Rice", "Shepherd's Pie", "Creamy Chicken & Veg Bake"],
      active: true,
    },
  ],
  addOns: [
    { id: "a1", name: "Dips & Crackers", price: "$20", active: true },
    { id: "a2", name: "Extra Dip", price: "$6", active: true },
    { id: "a3", name: "Bread Rolls (12)", price: "$10", active: true },
    { id: "a4", name: "Party Pies (12)", price: "$20", active: true },
    { id: "a5", name: "Extra Sauces", price: "$2", active: true },
  ],
  gallery: [
    { id: "g1", url: pkgBusiness, caption: "Business lunches" },
    { id: "g2", url: pkgBirthday, caption: "Birthday spreads" },
    { id: "g3", url: cheese, caption: "Cheese & fruit boards" },
    { id: "g4", url: sausage, caption: "Gourmet sausage rolls" },
    { id: "g5", url: quiche, caption: "Mini quiches" },
    { id: "g6", url: sweets, caption: "Sweet treat boxes" },
    { id: "g7", url: pkgMeals, caption: "Home-cooked meals" },
    { id: "g8", url: fruit, caption: "Fresh fruit platters" },
  ],
};
