export const content = {
  nav: ["About", "Profile", "Contact", "My Works"],
  headline: {
    prefix: "I am",
    name: "Fardin Kibria",
  },
  role: "designer / developer",
  stats: ["Trustworthy", "Modern designs", "Persevering"],
  social: [
    {
      name: "Instagram",
      href: "https://www.instagram.com/s.m._fardin?utm_source=ig_web_button_share_sheet&mdxt=ZDNlZDc0MzIxNw==",
    },
    { name: "GitHub", href: "https://github.com/fardinkibria-bd" },
    {
      name: "Facebook",
      href: "https://www.facebook.com/profile.php?id=61577127808938",
    },
  ],
  portrait: {
    src: "/Fardin.png",
    alt: "Illustrated portrait of Fardin",
    width: 1086,
    height: 1448,
  },
  works: [
    {
      id: "studia",
      title: "Studia | Plan Smarter. Study Better.",
      subtitle: "Academic workspace & productivity planner",
      description:
        "A student-focused web application designed to streamline academic routines. Features centralized homework and revision tracking, daily study session planning, and visual productivity analytics without juggling multiple tools.",
      tags: [
        "React",
        "TypeScript",
        "JSON",
        "Study Planner",
        "Productivity tool",
      ],
      url: "https://studia-planner.netlify.app/#dashboard",
      actionLabel: "Open live project",
      features: [
        "Centralized assignment, homework, and exam tracking",
        "Daily study session scheduler and routine builder",
        "Visual productivity metrics and progress dashboard",
      ],
    },
  ],
  about: {
    fullName: "S. M. Fardin Kibria",
    portrait: {
      src: "/Fardin_2.png",
      alt: "Profile portrait of S. M. Fardin Kibria",
      width: 1086,
      height: 1448,
    },
    quote:
      "I have seen the graves of those who didn't fight fearing they will die. - Ernesto Che' Guevara",
    introduction:
      "Hi, I'm S. M. Fardin Kibria, a web developer from Barishal, Bangladesh. I build clean, eye-catching websites that look good and are easy to use. I'm at the start of my journey, and I'm most excited by projects that solve real-life problems, turning everyday challenges into simple, practical web solutions. I'm always learning new tools and techniques, and I bring curiosity and a hands-on mindset to everything I build. Have a look at my work, and feel free to get in touch if you'd like to collaborate.",
    background: "[Your educational background and personal journey]",
    skills: [
      "HTML",
      "CSS",
      "Tailwind CSS",
      "JavaScript",
      "TypeScript",
      "Photo editing",
      "Artificial Intellignence",
    ],
    interests: [
      "Astronomy, Quantum Mechanics, Photography, Travelling, Music, Gaming, Coding, Reading, and more",
    ],
    goals:
      "To score something meaningful for humanity and create a lasting impact on the world through my work.",
    cta: {
      worksLabel: "Explore My Works",
      worksHref: "#my-works",
      contactLabel: "Get in Touch",
      contactHref: "#contact",
    },
  },
  contact: {
    heading: "Let's Talk",
    intro:
      "Have a project, a collaboration, an opportunity, or just a question? Send me a message and I'll get back to you soon.",
  },
} as const;
