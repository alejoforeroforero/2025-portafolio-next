
import { getWebsiteProjects } from "./actions/website-actions";

export default async function Projects() {
  const projects = await getWebsiteProjects();

  return (
    <div className="max-w-4xl p-[60px]">
      <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-gray-100">Projects</h1>
      <div className="space-y-8">
        {projects.map((project) => (
          <div 
            key={project.id} 
            className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-6 transition-colors"
          >
            <h4 className="text-lg font-medium mb-2">{project.title}</h4>
            <p className="text-gray-600 dark:text-gray-300 mb-3">{project.description}</p>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              <p>
                {new Date(project.startDate).toLocaleDateString()} - {" "}
                {project.endDate ? new Date(project.endDate).toLocaleDateString() : "Present"}
              </p>
              <p className="mt-2">Type: {project.type}</p>
              <p className="mt-2">Stack: {project.stack.join(", ")}</p>
              {project.link && (
                <a 
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sky-500 hover:text-sky-700 mt-2 inline-block"
                >
                  View Project
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

