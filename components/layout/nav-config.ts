export interface NavLink {
  href: string;
  label: string;
}

// Primary links shown in the desktop navbar
export const primaryLinks: NavLink[] = [
  { href: "/services", label: "Setups & Functions" },
  { href: "/gallery", label: "Decor & Portfolio" },
  { href: "/cinematographers", label: "Meet Atiq Butt" },
  { href: "/reviews", label: "Reviews" },
  { href: "/about", label: "About Studio" },
  { href: "/contact", label: "Contact & Location" },
];

// Secondary links surfaced in the mobile menu + footer
export const secondaryLinks: NavLink[] = [
  { href: "/faq", label: "FAQ" },
  { href: "/blog", label: "Event Stories" },
  { href: "/social", label: "Instagram" },
  { href: "/account", label: "Client Portal" },
  { href: "/admin", label: "Studio Admin" },
];

export const footerColumns: { title: string; links: NavLink[] }[] = [
  {
    title: "Event Arrangements",
    links: [
      { href: "/services", label: "Movie & Studio Setup" },
      { href: "/services#event-decoration", label: "Event Decoration" },
      { href: "/services#lighting-setup", label: "Stunning Lighting" },
      { href: "/book", label: "Book Multi-Function Event" },
    ],
  },
  {
    title: "Muhammadi Studio",
    links: [
      { href: "/about", label: "Atiq Butt (Owner)" },
      { href: "/cinematographers", label: "Directors & Team" },
      { href: "/reviews", label: "Client Reviews" },
      { href: "/contact", label: "Main Bazar Office" },
    ],
  },
  {
    title: "Studio Portal",
    links: [
      { href: "/book", label: "Book an Event" },
      { href: "/account", label: "Client Account" },
      { href: "/admin", label: "Admin Dashboard" },
      { href: "/admin/appointments", label: "Approve Bookings" },
    ],
  },
];
