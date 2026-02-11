// Import external link and GitHub icons from lucide-react library
import { ExternalLink, Github } from "lucide-react";

// Main Projects component - renders a section displaying portfolio projects
const Projects = () => {
  return (
    // Section element with ID "projects" for navigation and styling
    <section id="projects" className="section-container bg-card/50">
      {/* Title for the projects section */}
      <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
        My <span className="gradient-text">Projects</span>
      </h2>
      {/* Subtitle explaining the purpose of this section */}
      <p className="text-muted-foreground text-center mb-12 max-w-lg mx-auto">
        Here are some of my recent projects. Each one taught me something new!
      </p>

      {/* Grid layout for project cards - displays 2 columns on medium screens and above */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Map through the projects array and render a ProjectCard for each project */}
        {projects.map((project) => (
          <ProjectCard key={project.title} {...project} />
        ))}
      </div>
    </section>
  );
};

// Define the interface for ProjectCard props - specifies the expected data structure
interface ProjectCardProps {
  title: string;      // Project title
  description: string; // Project description
  tags: string[];     // Array of technology tags associated with the project
  liveUrl: string;    // URL to the live demo of the project
  githubUrl: string;  // URL to the GitHub repository of the project
}

// Individual project card component - displays project details in a card format
const ProjectCard = ({ title, description, tags, liveUrl, githubUrl }: ProjectCardProps) => (
  <div className="bg-background rounded-xl border border-border p-6 card-hover">
    {/* Project title */}
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    {/* Project description */}
    <p className="text-muted-foreground mb-4">{description}</p>

    {/* Tags section - displays technology tags associated with the project */}
    <div className="flex flex-wrap gap-2 mb-4">
      {/* Map through the tags array and render each tag as a badge */}
      {tags.map((tag) => (
        <span
          key={tag}
          className="px-2 py-1 bg-secondary text-secondary-foreground rounded-md text-xs font-medium"
        >
          {tag}
        </span>
      ))}
    </div>

    {/* Links section - contains links to live demo and GitHub repository */}
    <div className="flex gap-4">
      {/* Link to live demo of the project */}
      <a
        href={liveUrl}
        target="_blank"           // Opens link in a new tab
        rel="noopener noreferrer" // Security measure for external links
        className="flex items-center gap-2 text-sm text-primary hover:underline"
      >
        <ExternalLink size={16} /> Live Demo
      </a>
      {/* Link to GitHub repository of the project */}
      <a
        href={githubUrl}
        target="_blank"           // Opens link in a new tab
        rel="noopener noreferrer" // Security measure for external links
        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <Github size={16} /> Code
      </a>
    </div>
  </div>
);

// ========================================
// PROJECT DATA ARRAY
// This array contains all the project information displayed on the page
// Edit your projects here - add, remove, or modify project details
// ========================================
const projects: ProjectCardProps[] = [
  {
    title: "Project One",
    description: "A brief description of your first project. Explain what it does and why it's interesting.",
    tags: ["React", "TypeScript", "Tailwind"],
    liveUrl: "https://your-project-url.com",
    githubUrl: "https://github.com/yourusername/project-one",
  },
  {
    title: "Project Two",
    description: "Describe your second project here. What problem does it solve?",
    tags: ["Node.js", "Express", "MongoDB"],
    liveUrl: "https://your-project-url.com",
    githubUrl: "https://github.com/yourusername/project-two",
  },
  {
    title: "Project Three",
    description: "Another cool project you've built. Share what makes it special.",
    tags: ["Python", "FastAPI", "PostgreSQL"],
    liveUrl: "https://your-project-url.com",
    githubUrl: "https://github.com/yourusername/project-three",
  },
  {
    title: "Project Four",
    description: "Your fourth project description goes here. What did you learn?",
    tags: ["Next.js", "Prisma", "Vercel"],
    liveUrl: "https://your-project-url.com",
    githubUrl: "https://github.com/yourusername/project-four",
  },
];

// Export the Projects component as default for use in other parts of the application
export default Projects;
