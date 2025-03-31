
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
            className="grid grid-cols-[150px_1fr]"
          >
            {/* Left column - Date */}
            <div className="text-sm mt-1">
              <p style={{ color: '#b9acac' }}>
                {new Date(project.startDate).toLocaleDateString('en-US', {
                  month: 'short',
                  year: 'numeric'
                })} - {" "}
                {project.endDate ? new Date(project.endDate).toLocaleDateString('en-US', {
                  month: 'short',
                  year: 'numeric'
                }) : "Present"}
              </p>
            </div>

            {/* Right column - Project details */}
            <div>
              <h4 className="text-lg font-medium text-gray-900 dark:text-gray-100">{project.title}</h4>
              <p className="text-gray-600 dark:text-gray-300 mt-3 mb-3">{project.description}</p>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                <div className="flex flex-wrap gap-2">
                  {project.stack.map((tech, index) => (
                    <span 
                      key={index} 
                      className="px-2 py-1 bg-[rgb(75,85,99)] text-white rounded"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                {project.link && (
                  <a 
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-8 inline-flex items-center text-sky-500 hover:text-sky-700 transition-colors group"
                  >
                    View Project <span className="ml-1 text-[10px] -translate-y-1.5 transition-transform duration-1000 group-hover:-translate-y-2.5 group-hover:translate-x-1">↗</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

