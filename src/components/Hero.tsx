import avatar from "@/assets/avatar.png";
import { Github, Linkedin, Mail, Twitter } from "lucide-react";

const Hero = () => {
  return (
    <section className="section-container min-h-[90vh] flex flex-col justify-center">
      <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
        {/* Avatar */}
        <div className="relative">
          <div className="w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-primary/20 shadow-xl">
            <img 
              src={avatar} 
              alt="Developer Avatar" 
              className="w-full h-full object-cover"
            />
          </div>
          {/* Decorative ring */}
          <div className="absolute -inset-3 rounded-full border-2 border-dashed border-primary/30 animate-spin" style={{ animationDuration: '20s' }} />
        </div>

        {/* Text Content */}
        <div className="text-center md:text-left flex-1">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            organisedtoast
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-6">
            Investment Research Automation Consultant
          </p>
          <p className="text-muted-foreground max-w-lg mb-8">
            I infuse AI processes neatly into the existing workflows of family offices and fundamentally driven equity fund managers, empowering decisionmakers to <strong className="text-foreground font-semibold">spend more time on what really matters</strong>.
          </p>

          {/* Social Links */}
          <div className="flex gap-4 justify-center md:justify-start">
            <SocialLink href="https://github.com" icon={<Github />} label="GitHub" />
            <SocialLink href="https://linkedin.com" icon={<Linkedin />} label="LinkedIn" />
            <SocialLink href="https://twitter.com" icon={<Twitter />} label="Twitter" />
            <SocialLink href="mailto:organisedtoast@pm.me" icon={<Mail />} label="Email" />
          </div>
        </div>
      </div>
    </section>
  );
};

interface SocialLinkProps {
  href: string;
  icon: React.ReactNode;
  label: string;
}

const SocialLink = ({ href, icon, label }: SocialLinkProps) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={label}
    className="w-12 h-12 rounded-full bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-all duration-300 hover:shadow-md"
  >
    {icon}
  </a>
);

export default Hero;
