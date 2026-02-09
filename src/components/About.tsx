const About = () => {
  return (
    <section id="about" className="section-container">
      <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
        About <span className="gradient-text">Me</span>
      </h2>
      
      <div className="max-w-2xl mx-auto">
        <p className="text-muted-foreground mb-6 text-center text-lg">
          I'm a passionate investor who loves converting research into investment performance through codified processes. 
          Combining 15 years experience in fundamental equity research across all major sectors with software project management skills, 
          I create seamless digital experiences that boutique investment teams love.
        </p>

        {/* Skills */}
        <div className="mt-12">
          <h3 className="text-xl font-semibold mb-6 text-center">Technologies I Work With</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {skills.map((skill) => (
              <span 
                key={skill}
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
// EDIT YOUR SKILLS HERE
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

export default About;
