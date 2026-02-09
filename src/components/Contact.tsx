import { Mail, MapPin, Send } from "lucide-react";

const Contact = () => {
  return (
    <section id="contact" className="section-container">
      <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
        Get In <span className="gradient-text">Touch</span>
      </h2>
      <p className="text-muted-foreground text-center mb-12 max-w-lg mx-auto">
        I'm always open to new opportunities and collaborations. Feel free to reach out!
      </p>

      <div className="max-w-md mx-auto">
        {/* Contact Info */}
        <div className="space-y-4 mb-8">
          <div className="flex items-center gap-4 p-4 bg-card rounded-lg border border-border">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <Mail size={20} />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Email</p>
              <a 
                href="mailto:organisedtoast@pm.me" 
                className="font-medium hover:text-primary transition-colors"
              >
                organisedtoast@pm.me
              </a>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 bg-card rounded-lg border border-border">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <MapPin size={20} />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Location</p>
              <p className="font-medium">London, UK</p>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <a
          href="mailto:organisedtoast@pm.me"
          className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground py-4 px-6 rounded-lg font-semibold hover:opacity-90 transition-opacity"
        >
          <Send size={18} />
          Send Me a Message
        </a>
      </div>
    </section>
  );
};

export default Contact;
