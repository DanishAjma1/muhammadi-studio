import type { AppNotification, BlogPost, FaqItem, GalleryItem } from "@/types";
import { blogImages, galleryImages } from "./images";

export const gallery: GalleryItem[] = [
  { id: "g1", image: galleryImages[0], category: "weddings", title: "Royal Bridal Silhouette", barberId: "brb_usman" },
  { id: "g2", image: galleryImages[1], category: "films", title: "Anamorphic 4K Cinema Frame", barberId: "brb_attiq" },
  { id: "g3", image: galleryImages[2], category: "portraits", title: "Prime Lens Bokeh Portrait", barberId: "brb_ayesha" },
  { id: "g4", image: galleryImages[3], category: "weddings", title: "Cinematic Sunset Couple", barberId: "brb_attiq" },
  { id: "g5", image: galleryImages[4], category: "films", title: "4K Aerial Drone Vista", barberId: "brb_farhan" },
  { id: "g6", image: galleryImages[5], category: "commercial", title: "Studio Lighting Dramatic Set", barberId: "brb_attiq" },
  { id: "g7", image: galleryImages[6], category: "portraits", title: "High-Fashion Editorial Shoot", barberId: "brb_ayesha" },
  { id: "g8", image: galleryImages[7], category: "films", title: "35mm Cinema Scene Slate", barberId: "brb_attiq" },
  { id: "g9", image: galleryImages[8], category: "weddings", title: "Heritage Royal Ceremony", barberId: "brb_usman" },
  { id: "g10", image: galleryImages[9], category: "commercial", title: "DaVinci Color Suite Master", barberId: "brb_ayesha" },
  { id: "g11", image: galleryImages[10], category: "portraits", title: "Executive Portrait Headshot", barberId: "brb_usman" },
  { id: "g12", image: galleryImages[11], category: "commercial", title: "Grand Gala Night Celebration", barberId: "brb_farhan" },
];

export const blogPosts: BlogPost[] = [
  {
    id: "post_1",
    slug: "crafting-cinematic-wedding-film",
    title: "Behind the Lens: Crafting a 4K Cinematic Wedding Film",
    excerpt: "How we approach lighting, multi-mic audio recording, and visual storytelling to turn wedding memories into a timeless feature movie.",
    cover: blogImages[0],
    category: "Cinematography",
    readTime: 6,
    date: "2026-08-01",
    author: "Attiq Butt",
    content: [
      "A great wedding film isn't just a recording of events — it's an emotional narrative engineered with cinematic lighting, intention, and audio precision.",
      "1. Audio First: We place broadcast wireless lavaliers on the groom, officiant, and podium. Crisp vows and heartfelt speeches are the emotional spine of any great movie.",
      "2. 24fps Narrative Motion: We shoot in 24 frames-per-second with high-speed shutter angles to emulate classic 35mm Hollywood motion blur.",
      "3. Direction Without Interference: We believe in letting moments breathe. Rather than staging artificial poses, we guide natural interactions with gentle direction.",
      "4. The Score: Every music piece is carefully licensed and paced to match the emotional arc of your celebration.",
      "5. Color That Endures: Our colorists balance every frame in DaVinci Resolve so your wedding film looks as breathtaking 30 years from now as it does today.",
    ],
  },
  {
    id: "post_2",
    slug: "mastering-studio-portrait-lighting",
    title: "Mastering Light: The Secret Behind Signature Studio Portraits",
    excerpt: "From parabolic softboxes to Rembrandt lighting — how we sculpt light to bring out confidence and elegance.",
    cover: blogImages[1],
    category: "Photography",
    readTime: 4,
    date: "2026-07-20",
    author: "Muhammad Usman",
    content: [
      "Light is our brush and shadow is our depth. When clients step into Muhammadi Studio, lighting is customized to their unique bone structure and mood.",
      "We rely on large octabox diffusers to generate soft, flattering skin wraps while preserving catchlights in the eyes.",
      "Controlling falloff ensures that the background complements the subject rather than competing for attention.",
      "Whether you are booking a corporate executive headshot or an intimate bridal portrait, our lighting setups are crafted to make you feel empowered.",
    ],
  },
  {
    id: "post_3",
    slug: "drone-cinematography-grand-perspectives",
    title: "Drone Cinematography: Capturing Epic Perspectives",
    excerpt: "How aerial 4K filmmaking adds cinematic scale, establishing shots, and breathtaking venue perspectives.",
    cover: blogImages[2],
    category: "Drone & Aerial",
    readTime: 5,
    date: "2026-07-06",
    author: "Farhan Tariq",
    content: [
      "Drone cinematography transforms an event from a local gathering into an epic saga.",
      "Timing the Golden Hour: We schedule aerial sweeps during the 30 minutes before sunset when the landscape glows with warm raking light.",
      "Smooth Parallax: By flying low while panning past foreground architecture, we produce a dynamic parallax effect that looks spectacular in 4K.",
      "Safety and Certification: All our flights comply with civil aviation regulations, utilizing dual-sensor redundancies for flawless safety.",
    ],
  },
  {
    id: "post_4",
    slug: "art-of-color-grading",
    title: "The Art of Color Grading: Giving Your Film a Signature Soul",
    excerpt: "Why color grading is the emotional DNA of cinema — moving beyond basic LUTs to custom color palettes.",
    cover: blogImages[3],
    category: "Post-Production",
    readTime: 5,
    date: "2026-06-22",
    author: "Ayesha Noor",
    content: [
      "Raw footage is like an unbaked sculpture. Color grading is where mood, atmosphere, and visual poetry are born.",
      "At Muhammadi Studio, we work in calibrated ACES color spaces on reference monitors.",
      "We balance rich warm skin tones with cool cinematic shadows, drawing inspiration from classic Kodak 5219 film stock.",
      "Every shoot receives a dedicated color grading pass to ensure consistency between drone shots, indoor ceremonies, and sunset portraits.",
    ],
  },
];

export const faqs: FaqItem[] = [
  {
    id: "faq_1",
    question: "How far in advance should we book our wedding or shoot date?",
    answer:
      "For weddings and large commercial productions, we recommend booking 3 to 6 months in advance. Dates are reserved on a first-come, first-served basis upon contract signing and deposit.",
  },
  {
    id: "faq_2",
    question: "Can we request Attiq Butt or Muhammad Usman specifically?",
    answer:
      "Yes! When using our booking form or contacting us, you can select Attiq Butt (Director of Cinematography), Muhammad Usman (Master Photographer), or any member of our senior team to lead your project.",
  },
  {
    id: "faq_3",
    question: "What camera gear and cinema lenses does Muhammadi Studio use?",
    answer:
      "We shoot on professional cinema systems including RED Digital Cinema, Sony FX Cinema Line, Zeiss and Cooke cinema prime lenses, DJI Inspire & Mavic 3 Cine drones, and Profoto studio lighting.",
  },
  {
    id: "faq_4",
    question: "When will we receive our photos and cinematic films?",
    answer:
      "You will receive a 60-second teaser trailer within 7–10 days of your shoot. The complete hand-retouched photo gallery and full 4K cinematic movie are delivered within 3–4 weeks via our private online client portal.",
  },
  {
    id: "faq_5",
    question: "Do you travel for destination weddings and international productions?",
    answer:
      "Absolutely. Our team regularly travels across the country and internationally for destination weddings, fashion campaigns, and documentary shoots. Travel and accommodation are arranged seamlessly.",
  },
  {
    id: "faq_6",
    question: "Do we receive the high-resolution files and RAW footage?",
    answer:
      "Yes. All delivered stills are full-resolution, print-ready, and free of watermarks. RAW unedited video footage and master hard drives can be included as an add-on in your package.",
  },
  {
    id: "faq_7",
    question: "What payment methods and deposit schedule do you accept?",
    answer:
      "We accept credit/debit cards, bank wire transfers, and online payments. Typically, a 30% deposit secures your date, with the balance due before or on the shoot day.",
  },
];

export const notifications: AppNotification[] = [
  {
    id: "ntf_1",
    type: "appointment",
    title: "New Shoot Booking",
    message: "Zubair & Sarah booked Signature Royal Production Package with Attiq Butt.",
    time: "5 minutes ago",
    read: false,
  },
  {
    id: "ntf_2",
    type: "review",
    title: "5-Star Review Received",
    message: "Hamza & Fatima left a 5-star review: 'Attiq and Usman made our wedding film feel like Hollywood!'",
    time: "35 minutes ago",
    read: false,
  },
  {
    id: "ntf_3",
    type: "reminder",
    title: "Upcoming 4K Shoot Today",
    message: "Commercial Brand Film for Vertex Media at Studio 4 today at 10:30 AM.",
    time: "2 hours ago",
    read: false,
  },
  {
    id: "ntf_4",
    type: "customer",
    title: "New VIP Client",
    message: "Fashion designer Daniyal Malik registered via Instagram portfolio.",
    time: "4 hours ago",
    read: true,
  },
  {
    id: "ntf_5",
    type: "appointment",
    title: "Bridal Shoot Confirmed",
    message: "Amina Tariq confirmed Royal Bridal Shoot with Muhammad Usman.",
    time: "Yesterday",
    read: true,
  },
  {
    id: "ntf_6",
    type: "cancellation",
    title: "Date Rescheduled",
    message: "Imran Khan rescheduled studio headshots session to next Tuesday.",
    time: "Yesterday",
    read: true,
  },
];

export const instagramFeed = galleryImages.slice(0, 9);
