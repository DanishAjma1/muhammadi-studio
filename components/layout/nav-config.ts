export interface NavLink {
  href: string;
  label: string;
}

// Primary links shown in the desktop navbar
export const primaryLinks: NavLink[] = [
  { href: "/services", label: "Services" },
  { href: "/barbers", label: "Cinematographers" },
  { href: "/gallery", label: "Portfolio" },
  { href: "/reviews", label: "Reviews" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

// Secondary links surfaced in the mobile menu + footer
export const secondaryLinks: NavLink[] = [
  { href: "/faq", label: "FAQ" },
  { href: "/blog", label: "Cinema Insights" },
  { href: "/social", label: "Instagram" },
  { href: "/account", label: "Client Portal" },
  { href: "/admin", label: "Studio Admin" },
];

export const footerColumns: { title: string; links: NavLink[] }[] = [
  {
    title: "Production",
    links: [
      { href: "/services", label: "Films & Photography" },
      { href: "/barbers", label: "Directors & Artists" },
      { href: "/gallery", label: "Visual Portfolio" },
      { href: "/book", label: "Book a Shoot" },
    ],
  },
  {
    title: "Muhammadi Studio",
    links: [
      { href: "/about", label: "Our Story & Co-Founders" },
      { href: "/reviews", label: "Client Reviews" },
      { href: "/blog", label: "Cinema Insights" },
      { href: "/contact", label: "Contact & Location" },
    ],
  },
  {
    title: "Client Portal",
    links: [
      { href: "/account", label: "Dashboard" },
      { href: "/account/appointments", label: "My Shoot Bookings" },
      { href: "/login", label: "Sign In" },
      { href: "/admin", label: "Studio Admin" },
    ],
  },
];
