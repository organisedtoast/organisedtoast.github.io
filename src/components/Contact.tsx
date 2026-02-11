/* Import icons from lucide-react library for use in the contact form */
import { Mail, MapPin, Send } from "lucide-react";

/* Contact component - displays contact information and a call-to-action button */
const Contact = () => {
  return (
    /* Section element with ID "contact" for navigation and styling */
    <section id="contact" className="section-container">
      {/* Title for the contact section */}
      <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
        Get In <span className="gradient-text">Touch</span>
      </h2>
      {/* Subtitle explaining the purpose of this section */}
      <p className="text-muted-foreground text-center mb-12 max-w-lg mx-auto">
        I'm always open to new opportunities and collaborations. Feel free to reach out!
      </p>

      {/* Container for contact information */}
      <div className="max-w-md mx-auto">
        {/* Contact Info section - displays email and location */}
        <div className="space-y-4 mb-8">
          {/* Email contact information */}
          <div className="flex items-center gap-4 p-4 bg-card rounded-lg border border-border">
            {/* Icon container for the mail icon */}
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <Mail size={20} />
            </div>
            {/* Email address with link */}
            <div>
              <p className="text-sm text-muted-foreground">Email</p>
              <a
                href="mailto:organisedtoast@pm.me"  /* Opens default email client */
                className="font-medium hover:text-primary transition-colors"
              >
                organisedtoast@pm.me
              </a>
            </div>
          </div>

          {/* Location information */}
          <div className="flex items-center gap-4 p-4 bg-card rounded-lg border border-border">
            {/* Icon container for the map pin icon */}
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <MapPin size={20} />
            </div>
            {/* Location text */}
            <div>
              <p className="text-sm text-muted-foreground">Location</p>
              <p className="font-medium">London, UK</p>
            </div>
          </div>
        </div>

        {/* Call-to-action button - sends user to email client */}
        <a
          href="mailto:organisedtoast@pm.me"       /* Opens default email client */
          className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground py-4 px-6 rounded-lg font-semibold hover:opacity-90 transition-opacity"
        >
          <Send size={18} />                      /* Send icon from lucide-react */
          Send Me a Message                       /* Button text */
        </a>
      </div>
    </section>
  );
};

/* Export the Contact component as default for use in other parts of the application */
export default Contact;
