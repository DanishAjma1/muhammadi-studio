// Centralized image URLs so the whole mockup can be re-skinned from one file.
// Unsplash (unoptimized in next.config) for scenery, pravatar for people.

const u = (id: string, w = 1200) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

export const img = {
  heroPrimary: u("1503951914875-452162b0f3f1", 1600),
  heroSecondary: u("1585747860715-2ba37e788b70", 1400),
  aboutShop: u("1521490878406-4d8c40a5e3c1", 1200),
  aboutCraft: u("1622286342621-4bd786c2447c", 1000),
  ctaBanner: u("1599351431202-1e0f0137899a", 1600),
  contactShop: u("1600948836101-f9ffda59d250", 1400),
  storefront: u("1512690459411-b9245aed614b", 1200),
};

// Barber portraits + cover shots
export const barberImages = {
  alex: {
    avatar: "https://i.pravatar.cc/400?img=12",
    cover: u("1599351431202-1e0f0137899a", 1200),
  },
  mike: {
    avatar: "https://i.pravatar.cc/400?img=33",
    cover: u("1503951914875-452162b0f3f1", 1200),
  },
  james: {
    avatar: "https://i.pravatar.cc/400?img=68",
    cover: u("1585747860715-2ba37e788b70", 1200),
  },
  omar: {
    avatar: "https://i.pravatar.cc/400?img=51",
    cover: u("1521490878406-4d8c40a5e3c1", 1200),
  },
};

// Gallery / haircut shots
export const galleryImages = [
  u("1599351431202-1e0f0137899a", 800),
  u("1503951914875-452162b0f3f1", 800),
  u("1585747860715-2ba37e788b70", 800),
  u("1622286342621-4bd786c2447c", 800),
  u("1521490878406-4d8c40a5e3c1", 800),
  u("1600948836101-f9ffda59d250", 800),
  u("1512690459411-b9245aed614b", 800),
  u("1605497788044-5a32c7078486", 800),
  u("1567894340315-735d7c361db0", 800),
  u("1589985270826-4b7bb135bc9d", 800),
  u("1493256338651-d82f7acb2b38", 800),
  u("1595475207225-428b62bda831", 800),
];

// Blog covers
export const blogImages = [
  u("1503951914875-452162b0f3f1", 900),
  u("1622286342621-4bd786c2447c", 900),
  u("1585747860715-2ba37e788b70", 900),
  u("1521490878406-4d8c40a5e3c1", 900),
];

// Avatar helper for customers / reviewers
export const avatar = (n: number) => `https://i.pravatar.cc/150?img=${n}`;
