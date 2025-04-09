import { Project } from "@prisma/client";

interface ProjectCardProps {
  project: Project;
  onEdit: (project: Project) => void;
  onDelete: (id: string) => void;
}

export const ProjectCard = ({ project, onEdit, onDelete }: ProjectCardProps) => {
  return (
    <div className="flex justify-between items-start">
      <div className="space-y-4 w-full">
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-semibold text-gray-100">{project.title}</h3>
              <span className="px-2 py-0.5 bg-gray-700 rounded-full text-sm text-gray-300">
                {project.type || 'No type'}
              </span>
            </div>
            <p className="text-gray-400 mt-1">
              {new Date(project.startDate).toLocaleDateString()} - {' '}
              {project.endDate ? new Date(project.endDate).toLocaleDateString() : 'Present'}
            </p>
            <p className="text-gray-400 mt-1">Position: {project.position}</p>
            {project.link && (
              <div className="mt-1">
                <a 
                  href={project.link} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-blue-400 hover:text-blue-300"
                >
                  {project.link}
                </a>
              </div>
            )}
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => onEdit(project)}
              className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(project.id)}
              className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
            >
              Delete
            </button>
          </div>
        </div>
        <p className="text-gray-300">{project.description}</p>
        {project.img && (
          <img 
            src={project.img} 
            alt={project.title} 
            className="w-full max-w-md rounded-lg shadow-lg"
          />
        )}
        <div className="flex flex-wrap gap-2">
          {project.stack.map((tech, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-gray-700 rounded text-sm text-gray-300"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
