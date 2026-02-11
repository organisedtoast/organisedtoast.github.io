/* Import the avatar image and social media icons from lucide-react library */
import avatar from "@/assets/avatar.png";
import { Github, Linkedin, Mail, Twitter } from "lucide-react";

/* Hero component - the main landing section of the website with introduction and social links */
const Hero = () => {
  return (
    /* Section element with full height and vertical centering */
    <section className="section-container min-h-[90vh] flex flex-col justify-center">
      {/* Container for avatar and text content - stacks vertically on mobile, side-by-side on medium screens and above */}
      <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
        {/* Avatar section - contains the profile picture and decorative elements */}
        <div className="relative">
          {/* Circular avatar container with border and shadow */}
          <div className="w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-primary/20 shadow-xl">
            {/* Profile image - fills the circular container */}
            <img
              src={avatar}                    /* Path to the avatar image */
              alt="Developer Avatar"          /* Accessibility text for screen readers */
              className="w-full h-full object-cover"  /* Ensures image fills container while maintaining aspect ratio */
            />
          </div>
          {/* Decorative animated ring around the avatar */}
          <div className="absolute -inset-3 rounded-full border-2 border-dashed border-primary/30 animate-spin" style={{ animationDuration: '20s' }} />
        </div>

        {/* Text content section - contains name, title, description, and social links */}
        <div className="text-center md:text-left flex-1">
          {/* Main heading - displays the developer's name */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            organisedtoast
          </h1>
          {/* Subheading - describes the developer's role */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-6">
            Investment Research Automation Consultant
          </p>
          {/* Description paragraph - explains what the developer does */}
          <p className="text-muted-foreground max-w-lg mb-8">
            I infuse AI processes into the existing workflows of family offices and fundamentally driven equity fund managers, empowering investment decisionmakers with <strong className="text-foreground font-semibold">more time on what really matters</strong>.
          </p>

          {/* Social links section - displays links to social media profiles */}
          <div className="flex gap-4 justify-center md:justify-start">
            {/* Render SocialLink components for each social media platform */}
            <SocialLink href="https://github.com/organisedtoast" icon={<Github />} label="GitHub" />
            <SocialLink href="https://linkedin.com" icon={<Linkedin />} label="LinkedIn" />
            <SocialLink href="https://x.com/organisedtoast" icon={<Twitter />} label="Twitter" />
            <SocialLink href="mailto:organisedtoast@pm.me" icon={<Mail />} label="Email" />
          </div>
        </div>
      </div>
    </section>
  );
};

/* Define the interface for SocialLink props - specifies the expected data structure */
interface SocialLinkProps {
  href: string;         /* URL for the social media link */
  icon: React.ReactNode; /* The icon element to display */
  label: string;        /* Accessible label for the link */
}

/* SocialLink component - reusable component for social media links */
const SocialLink = ({ href, icon, label }: SocialLinkProps) => (
  <a
    href={href}                           /* The URL to navigate to when clicked */
    target="_blank"                       /* Opens link in a new tab */
    rel="noopener noreferrer"             /* Security measure for external links */
    aria-label={label}                    /* Accessibility attribute for screen readers */
    className="w-12 h-12 rounded-full bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-all duration-300 hover:shadow-md"
  >
    {icon}                                /* Displays the social media icon */
  </a>
);

/* Export the Hero component as default for use in other parts of the application */
export default Hero;
