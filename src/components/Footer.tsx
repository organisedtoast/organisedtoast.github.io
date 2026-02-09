const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 border-t border-border">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <p className="text-muted-foreground">
          © {currentYear} organisedtoast
        </p>
      </div>
    </footer>
  );
};

export default Footer;
