/* Import React's useState hook for managing component state and menu icons from lucide-react */
import { useState } from "react";
import { Menu, X } from "lucide-react";

/* Navbar component - creates a responsive navigation bar with mobile menu toggle */
const Navbar = () => {
  /* State variable to track whether the mobile menu is open or closed */
  const [isOpen, setIsOpen] = useState(false);

  /* Array of navigation links - defines the pages/sections accessible from the navbar */
  const navLinks = [
    { href: "#about", label: "About" },      /* Link to the About section */
    { href: "#projects", label: "Projects" }, /* Link to the Projects section */
    { href: "#contact", label: "Contact" },   /* Link to the Contact section */
  ];

  return (
    /* Navigation element positioned at the top of the viewport with backdrop blur effect */
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      {/* Container for navbar content with max width and horizontal padding */}
      <div className="max-w-4xl mx-auto px-6 py-4">
        {/* Flex container for logo, desktop navigation, and mobile menu button */}
        <div className="flex items-center justify-between">
          {/* Logo - links to the homepage (top of the page) */}
          <a href="#" className="text-xl font-bold font-heading">
            🍞 <span className="gradient-text">OT</span>  {/* Logo with bread emoji and initials */}
          </a>

          {/* Desktop Navigation - hidden on mobile screens (md:flex) */}
          <div className="hidden md:flex items-center gap-8">
            {/* Map through navLinks array and render each link as an anchor element */}
            {navLinks.map((link) => (
              <a
                key={link.href}  /* Unique key for React's reconciliation algorithm */
                href={link.href} /* URL for the navigation link */
                className="text-muted-foreground hover:text-foreground link-underline transition-colors"
              >
                {link.label}     {/* Display text for the navigation link */}
              </a>
            ))}
          </div>

          {/* Mobile Menu Button - only visible on mobile screens (md:hidden) */}
          <button
            className="md:hidden p-2 text-muted-foreground hover:text-foreground"
            onClick={() => setIsOpen(!isOpen)}  /* Toggle the isOpen state when clicked */
            aria-label="Toggle menu"            /* Accessibility attribute for screen readers */
          >
            {/* Conditionally render X icon if menu is open, otherwise render Menu icon */}
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation - only visible when menu is open and on mobile screens */}
        {isOpen && (
          <div className="md:hidden pt-4 pb-2 space-y-2">
            {/* Map through navLinks array and render each link as an anchor element for mobile */}
            {navLinks.map((link) => (
              <a
                key={link.href}                  /* Unique key for React's reconciliation algorithm */
                href={link.href}                 /* URL for the navigation link */
                className="block py-2 text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setIsOpen(false)} /* Close the mobile menu when a link is clicked */
              >
                {link.label}                     /* Display text for the navigation link */
              </a>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

/* Export the Navbar component as default for use in other parts of the application */
export default Navbar;
