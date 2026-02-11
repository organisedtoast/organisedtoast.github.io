/* Footer component - displays copyright information at the bottom of the page */
const Footer = () => {
  /* Get the current year dynamically to ensure the copyright year is always up to date */
  const currentYear = new Date().getFullYear();

  return (
    /* Footer element with styling and a top border */
    <footer className="py-8 border-t border-border">
      {/* Container for footer content - centered with max width and horizontal padding */}
      <div className="max-w-4xl mx-auto px-6 text-center">
        {/* Copyright notice with dynamic year */}
        <p className="text-muted-foreground">
          © {currentYear} organisedtoast
        </p>
      </div>
    </footer>
  );
};

/* Export the Footer component as default for use in other parts of the application */
export default Footer;
