// Centralized image URLs for Muhammadi Studio (Photography & Movie Production)
// Unsplash photography & cinematography scenery, pravatar for people.

const u = (id: string, w = 1200) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

export const img = {
  // Cinema camera on set with anamorphic lens & dramatic studio lighting
  heroPrimary: u("1536240478700-b869070f9279", 1600),
  // High-end editorial photoshoot / studio set
  heroSecondary: u("1516035069371-29a1b244cc32", 1400),
  // Modern film studio & soundstage with lighting rigs
  aboutShop: u("1583863788434-e58a36330cf0", 1200),
  // Director of Photography operating a cinema rig with follow focus
  aboutCraft: u("1485846234645-a62644f84728", 1000),
  // Golden hour cinematic couple silhouette / movie still
  ctaBanner: u("1519741497674-611481863552", 1600),
  // Client consultation suite & gallery lounge
  contactShop: u("1574717024653-61fd2cf4d44d", 1400),
  // Muhammadi Studio exterior & production entrance
  storefront: u("1516962215378-7fa2e137ae93", 1200),
};

// Lead Directors, Cinematographers & Photographers
export const barberImages = {
  attiq: {
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    cover: u("1536240478700-b869070f9279", 1200),
  },
  usman: {
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
    cover: u("1519741497674-611481863552", 1200),
  },
  farhan: {
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
    cover: u("1508700115892-45ecd05ae2ad", 1200),
  },
  ayesha: {
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
    cover: u("1516724562728-afc824a36e84", 1200),
  },
};

// Gallery: 12 photography and movie stills
export const galleryImages = [
  u("1519741497674-611481863552", 800), // Royal Bridal Silhouette
  u("1536240478700-b869070f9279", 800), // Anamorphic Cinema Frame
  u("1516035069371-29a1b244cc32", 800), // Prime Lens Bokeh Portrait
  u("1526045612212-70caf35c14df", 800), // Cinematic Wedding Couple
  u("1508700115892-45ecd05ae2ad", 800), // 4K Drone Mountain Vista
  u("1583863788434-e58a36330cf0", 800), // Studio Lighting Dramatic Set
  u("1516724562728-afc824a36e84", 800), // High Fashion Editorial Shoot
  u("1485846234645-a62644f84728", 800), // 35mm Movie Scene Slate
  u("1511285560929-80b456fea0bc", 800), // Heritage Couple Ceremony
  u("1574717024653-61fd2cf4d44d", 800), // Color Grading Suite Monitor
  u("1531746020798-e6953c6e8e04", 800), // Executive Portrait Headshot
  u("1527529482837-4698179dc6ce", 800), // Celebration Grand Finale Night
];

// Blog covers
export const blogImages = [
  u("1536240478700-b869070f9279", 900), // Behind the lens wedding cinema
  u("1583863788434-e58a36330cf0", 900), // Lighting for studio portraits
  u("1508700115892-45ecd05ae2ad", 900), // Drone cinematography
  u("1574717024653-61fd2cf4d44d", 900), // Color grading in DaVinci
];

// Avatar helper for customers / reviewers
export const avatar = (n: number) => `https://i.pravatar.cc/150?img=${n}`;
