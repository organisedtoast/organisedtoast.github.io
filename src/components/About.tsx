// About component - displays information about the developer and their skills
const About = () => {
  return (
    // Section element with ID "about" for navigation and styling
    <section id="about" className="section-container">
      {/* Title for the about section */}
      <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
        About <span className="gradient-text">Me</span>
      </h2>

      {/* Container for the about content */}
      <div className="max-w-2xl mx-auto">
        {/* Paragraph containing the developer's bio */}
        <p className="text-muted-foreground mb-6 text-center text-lg">
          I'm a passionate investor who loves converting research into investment performance through codified processes.
          Combining 15 years experience in fundamental equity research across all major sectors with software project management skills,
          I create seamless digital experiences that boutique investment teams love.
        </p>

        {/* Skills section - displays the technologies the developer works with */}
        <div className="mt-12">
          {/* Title for the skills section */}
          <h3 className="text-xl font-semibold mb-6 text-center">Technologies I Work With</h3>
          
          {/* Flex container for skill badges - wraps on smaller screens */}
          <div className="flex flex-wrap justify-center gap-3">
            {/* Map through the skills array and render each skill as a badge */}
            {skills.map((skill) => (
              <span
                key={skill}  // Unique key for React's reconciliation algorithm
                className="px-4 py-2 bg-card rounded-full border border-border text-sm font-medium hover:border-primary hover:text-primary transition-colors duration-300"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// ========================================
// SKILLS DATA ARRAY
// This array contains all the skills displayed on the page
// Edit your skills here - add, remove, or modify skills
// ========================================
const skills = [
  "React",
  "TypeScript",
  "Node.js",
  "Python",
  "PostgreSQL",
  "Tailwind CSS",
  "Next.js",
  "Git",
  "Claude Cowork",
  "Notion",
  "Slack",
];

// Export the About component as default for use in other parts of the application
export default About;
