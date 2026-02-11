/*
 * Import the Navbar component from the components directory
 * This component provides navigation links at the top of the page
 */
import Navbar from "@/components/Navbar";

/*
 * Import the Hero component from the components directory
 * This component typically contains the main headline and call-to-action
 */
import Hero from "@/components/Hero";

/*
 * Import the About component from the components directory
 * This component provides information about the person or company
 */
import About from "@/components/About";

/*
 * Import the Projects component from the components directory
 * This component showcases featured projects or work samples
 */
import Projects from "@/components/Projects";

/*
 * Import the Contact component from the components directory
 * This component provides contact information and/or a contact form
 */
import Contact from "@/components/Contact";

/*
 * Import the Footer component from the components directory
 * This component contains footer content like copyright and additional links
 */
import Footer from "@/components/Footer";

/*
 * Index component - the main page component that serves as the homepage
 * This component composes multiple child components to create a complete page
 * It follows a common layout pattern: navigation, main content sections, and footer
 */
const Index = () => {
  /*
   * Return the JSX for the Index page
   * This creates the main layout structure with all the imported components
   */
  return (
    /*
     * Main container div that ensures the page takes at least the full screen height
     * This prevents layout issues when content is shorter than the viewport
     */
    <div className="min-h-screen">
      {/* Navigation component placed at the top of the page */}
      <Navbar />
      
      {/* Main content area with top padding to account for fixed navbar */}
      <main className="pt-16">
        {/* Hero section - typically the first visible content */}
        <Hero />
        
        {/* About section - provides information about the subject */}
        <About />
        
        {/* Projects section - showcases work or projects */}
        <Projects />
        
        {/* Contact section - provides contact information or form */}
        <Contact />
      </main>
      
      {/* Footer component placed at the bottom of the page */}
      <Footer />
    </div>
  );
};

/*
 * Export the Index component as the default export
 * This allows other files to import it without specifying a name
 */
export default Index;
