
import { GetProjects } from "@/projects/actions/project-actions";

export default async function Projects() {
  const projects = await GetProjects();
  const rootProjects = projects.filter(project => project.type === 'root');

  return (
    <div className="max-w-4xl p-[60px]">
      <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-gray-100">
        Projects
      </h1>
      <div className="space-y-8">
        {rootProjects.map((project) => (
          <div key={project.id} className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-100 mb-2">
              {project.title}
            </h2>
            <p className="text-gray-400 mb-4">{project.description}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {project.stack.map((tech, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-gray-700 rounded text-sm text-gray-300"
                >
                  {tech}
                </span>
              ))}
            </div>
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
            >
              View Project
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

