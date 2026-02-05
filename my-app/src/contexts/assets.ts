/**
 * Centralized public asset paths and asset-based data.
 * All paths are relative to the public folder (e.g. /about-us/office_1.avif).
 */

// --- About Us ---
export const aboutUs = {
  everyone: "/about-us/Everyone.avif",
  team: "/about-us/team.avif",
  offices: [
    "/about-us/office_1.avif",
    "/about-us/office_2.avif",
    "/about-us/office_3.avif",
    "/about-us/office_4.avif",
    "/about-us/office_5.avif",
    "/about-us/office_6.avif",
    "/about-us/office_7.avif",
    "/about-us/office_8.avif",
    "/about-us/office_9.avif",
    "/about-us/team.avif",
  ],
} as const;

export const founderEmployee = {
  emp1: "/founder & employee/emp-1.webp",
  emp2: "/founder & employee/emp-2.webp",
  emp3: "/founder & employee/emp-3.webp",
  emp4: "/founder & employee/emp-4.webp",
  emp5: "/founder & employee/emp-5.webp",
  emp6: "/founder & employee/emp-6.webp",
} as const;

export const teamMembers = [
  { image: founderEmployee.emp1, name: "Alexandra Chen", designation: "Founder & CEO" },
  { image: founderEmployee.emp2, name: "Marcus Rodriguez", designation: "Co-Founder & CTO" },
  { image: founderEmployee.emp3, name: "Sarah Johnson", designation: "VP of Design" },
  { image: founderEmployee.emp4, name: "David Kim", designation: "Head of Product" },
  { image: founderEmployee.emp5, name: "Emma Williams", designation: "Lead UX Designer" },
  { image: founderEmployee.emp6, name: "James Anderson", designation: "Creative Director" },
] as const;

// --- Founders (carousel / testimonials) ---
export const founderImages = {
  one: "/founders/founder_one.webp",
  two: "/founders/founder_two.webp",
  three: "/founders/founder_three.webp",
} as const;

export const founders = [
  { id: 1, image: founderImages.one, name: "Matt Kabus", title: "CEO & Founder @LifeTales", quote: "Wavespace is a fantastic design team, with a healthy blend of UI and UX skills. Highly recommended" },
  { id: 2, image: founderImages.two, name: "Ishraq Khan", title: "CEO @Kodezi", quote: "Wavespace very reliable at all times and we have enjoyed working & designs are truly impressive An absolute pleasure to work with and I'm super satisfied with the results. Highly recommended!" },
  { id: 3, image: founderImages.three, name: "Nikita Ribakovs", title: "Founder & CEO @Tournated", quote: "Highly happy with a design delivered by Wavespace. Definitely will keep working with Wavespace. Great quality and smooth communication" },
  { id: 4, image: founderImages.one, name: "Sarah Chen", title: "Co-Founder @ScaleUp", quote: "Outstanding design partnership. They understood our vision and delivered beyond expectations. Would work with again." },
  { id: 5, image: founderImages.two, name: "Marcus Webb", title: "Founder @TechFlow", quote: "Professional, creative, and on time. Graphilence helped us stand out in a crowded market. Highly recommend." },
] as const;

// --- Company logos (with names) ---
export const companyLogosByRow = [
  [
    { name: "On Deck", logo: "/company-logos/on deck.avif" },
    { name: "Peel", logo: "/company-logos/peel.avif" },
    { name: "Microsoft", logo: "/company-logos/microsoft.avif" },
    { name: "The Motley Fool.", logo: "/company-logos/motley.avif" },
    { name: "ARRIVE", logo: "/company-logos/arrive.avif" },
  ],
  [
    { name: "متا UMS", logo: null as string | null },
    { name: "panther", logo: "/company-logos/panther.avif" },
    { name: "DOCSHIPPER", logo: "/company-logos/docshipper.avif" },
    { name: "On Deck", logo: "/company-logos/on deck.avif" },
    { name: "The Motley Fool.", logo: "/company-logos/motley.avif" },
    { name: "Microsoft", logo: "/company-logos/microsoft.avif" },
    { name: "Packt>", logo: "/company-logos/packt.avif" },
    { name: "CIS", logo: "/company-logos/cis.avif" },
  ],
  [
    { name: "pathrise", logo: "/company-logos/pathrise.avif" },
    { name: "RECHARGE W", logo: "/company-logos/recharge.avif" },
    { name: "telenor", logo: "/company-logos/telenor.avif" },
    { name: "PRIME>", logo: "/company-logos/prime.avif" },
    { name: "CYBER AUTOMOTIVE SOLUTIONS", logo: "/company-logos/cas.avif" },
  ],
] as const;

// --- Animated logos (Lottie JSON) ---
export const animatedLogos = {
  rocket: "/animated logo/Rocket.json",
  webDesign: "/animated logo/web design.json",
  orderPacked: "/animated logo/Order packed.json",
} as const;

// --- Blog / AI icons ---
export const blogIcons = {
  chatGpt: "/chat-gpt.png",
  ai: "/ai.png",
  google: "/google.png",
} as const;

// --- Services page images ---
// Graphics Design and Web dev from founder & employee folder
export const servicesImages = {
  screenImg: "/screen_img.webp",
  uiUx: "/founder & employee/Graphics Design.webp",
  webDev: "/founder & employee/Web dev.webp",
} as const;

// --- Work list placeholders (services fallback when no works) ---
export const workListPlaceholders = [
  "/work-list/first.avif",
  "/work-list/second.avif",
  "/work-list/third.avif",
  "/work-list/fourth.avif",
  "/work-list/fifth.avif",
  "/work-list/sixth.avif",
] as const;

export const workListPlaceholderFallback = workListPlaceholders[0];

// --- Services page testimonials ---
export const testimonials = [
  { company: "TechCorp", comment: "Outstanding design work that completely transformed our digital presence and user engagement. The team's attention to detail and innovative approach resulted in a significant increase in user satisfaction. Highly recommend their services!", name: "John Smith", position: "CEO" },
  { company: "InnovateLabs", comment: "The team delivered exceptional UX/UI designs that far exceeded our expectations. Their user-centered approach helped us create products that our customers truly love. The collaboration was smooth and the results speak for themselves.", name: "Sarah Johnson", position: "Product Manager" },
  { company: "StartupHub", comment: "Professional service and innovative solutions that helped us scale quickly and effectively. Their expertise in design systems and user experience made a tremendous difference in our product development journey. Truly exceptional work!", name: "Michael Chen", position: "Founder" },
  { company: "DesignCo", comment: "Their attention to detail and user-centered approach made all the difference in our project. The designs are not only beautiful but also highly functional, resulting in improved user engagement and business metrics. Exceptional work from start to finish.", name: "Emily Davis", position: "Design Director" },
  { company: "Digital Solutions", comment: "Fast, efficient, and incredibly creative. They understood our vision perfectly and brought it to life in ways we hadn't even imagined. The design quality and user experience improvements have been remarkable, and our users have taken notice.", name: "David Wilson", position: "CTO" },
  { company: "Creative Agency", comment: "Best investment we made this year. The design quality is top-notch, and the team's professionalism is unmatched. They helped us create a digital experience that truly represents our brand and connects with our audience on a deeper level.", name: "Lisa Anderson", position: "Marketing Head" },
  { company: "TechVentures", comment: "Excellent collaboration and outstanding results. Our users absolutely love the new interface, and we've seen a significant improvement in key metrics. The team's expertise in UX design and their ability to understand our business needs is truly impressive.", name: "Robert Taylor", position: "VP of Product" },
  { company: "Innovation Labs", comment: "They transformed our complex product into an intuitive and user-friendly experience. The design process was smooth, and the final result exceeded all our expectations. Our user feedback has been overwhelmingly positive, and engagement has increased substantially.", name: "Jennifer Martinez", position: "Product Lead" },
  { company: "FutureTech", comment: "Outstanding work from start to finish. The team is highly professional, responsive, and truly understands how to create designs that drive business results. The attention to detail and commitment to excellence is evident in every aspect of their work.", name: "James Brown", position: "Operations Manager" },
  { company: "NextGen Solutions", comment: "The designs are beautiful, functional, and exactly what we needed to elevate our brand. The team's creative approach combined with their technical expertise resulted in an excellent digital experience.", name: "Amanda White", position: "Founder & CEO" },
] as const;

/** Dummy work cards used when no works are loaded (services page). */
export const workListDummyCards = [
  { src: workListPlaceholders[0], alt: "Work 1", title: "E-Commerce & DTC", description: "Our approach of making things simpler and more effective helps users go from browsing to checkout in simple steps", bullets: ["E-commerce", "Branding", "Web Design"] },
  { src: workListPlaceholders[1], alt: "Work 2", title: "Finance & Fintech", description: "Building secure and user-friendly financial solutions that empower users to manage their finances effortlessly", bullets: ["UI/UX Design", "Product Design", "Mobile App"] },
  { src: workListPlaceholders[2], alt: "Work 3", title: "SaaS & B2B Platforms", description: "Creating powerful business solutions that streamline operations and enhance productivity for teams worldwide", bullets: ["SaaS Design", "Web Design", "UI/UX Consulting"] },
  { src: workListPlaceholders[3], alt: "Work 4", title: "Healthcare & Wellness", description: "Designing intuitive health platforms that connect patients with care providers seamlessly", bullets: ["Healthcare Design", "Mobile App", "UI/UX Design"] },
  { src: workListPlaceholders[4], alt: "Work 5", title: "Education & E-Learning", description: "Transforming learning experiences with engaging and accessible educational platforms", bullets: ["E-Learning Platform", "Web Design", "Branding"] },
  { src: workListPlaceholders[5], alt: "Work 6", title: "Travel & Hospitality", description: "Crafting memorable travel experiences through beautiful and functional booking platforms", bullets: ["Travel App", "Web Design", "UI/UX Design"] },
] as const;
