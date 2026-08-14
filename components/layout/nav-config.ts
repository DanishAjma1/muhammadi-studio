export interface NavLink {
  href: string;
  label: string;
}

// Primary links shown in the desktop navbar
export const primaryLinks: NavLink[] = [
  { href: "/services", label: "Services" },
  { href: "/barbers", label: "Barbers" },
  { href: "/gallery", label: "Gallery" },
  { href: "/reviews", label: "Reviews" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

// Secondary links surfaced in the mobile menu + footer
export const secondaryLinks: NavLink[] = [
  { href: "/faq", label: "FAQ" },
  { href: "/blog", label: "Style Guide" },
  { href: "/social", label: "Instagram" },
  { href: "/account", label: "My Account" },
  { href: "/admin", label: "Admin" },
];

export const footerColumns: { title: string; links: NavLink[] }[] = [
  {
    title: "Visit",
    links: [
      { href: "/services", label: "Services" },
      { href: "/barbers", label: "Barbers" },
      { href: "/gallery", label: "Gallery" },
      { href: "/book", label: "Book Now" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About" },
      { href: "/reviews", label: "Reviews" },
      { href: "/blog", label: "Style Guide" },
      { href: "/contact", label: "Contact" },
    ],
  },
  {
    title: "Account",
    links: [
      { href: "/account", label: "Dashboard" },
      { href: "/account/appointments", label: "My Appointments" },
      { href: "/login", label: "Sign In" },
      { href: "/admin", label: "Shop Admin" },
    ],
  },
];
