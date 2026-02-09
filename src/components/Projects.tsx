import { ExternalLink, Github } from "lucide-react";

const Projects = () => {
  return (
    <section id="projects" className="section-container bg-card/50">
      <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
        My <span className="gradient-text">Projects</span>
      </h2>
      <p className="text-muted-foreground text-center mb-12 max-w-lg mx-auto">
        Here are some of my recent projects. Each one taught me something new!
      </p>

      <div className="grid md:grid-cols-2 gap-6">
        {projects.map((project) => (
          <ProjectCard key={project.title} {...project} />
        ))}
      </div>
    </section>
  );
};

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  liveUrl: string;
  githubUrl: string;
}

const ProjectCard = ({ title, description, tags, liveUrl, githubUrl }: ProjectCardProps) => (
  <div className="bg-background rounded-xl border border-border p-6 card-hover">
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-muted-foreground mb-4">{description}</p>
    
    {/* Tags */}
    <div className="flex flex-wrap gap-2 mb-4">
      {tags.map((tag) => (
        <span 
          key={tag} 
          className="px-2 py-1 bg-secondary text-secondary-foreground rounded-md text-xs font-medium"
        >
          {tag}
        </span>
      ))}
    </div>

    {/* Links */}
    <div className="flex gap-4">
      <a 
        href={liveUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 text-sm text-primary hover:underline"
      >
        <ExternalLink size={16} /> Live Demo
      </a>
      <a 
        href={githubUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <Github size={16} /> Code
      </a>
    </div>
  </div>
);

// ========================================
// EDIT YOUR PROJECTS HERE
// Add your project details below
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

export default Projects;
