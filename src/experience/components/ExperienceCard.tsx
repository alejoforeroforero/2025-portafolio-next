import { Experience } from "@prisma/client";

interface ExperienceCardProps {
  experience: Experience;
  onEdit: (experience: Experience) => void;
  onDelete: (id: string) => void;
}

export const ExperienceCard = ({ experience, onEdit, onDelete }: ExperienceCardProps) => {
  return (
    <div className="flex justify-between items-start">
      <div className="space-y-4 w-full">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xl font-semibold text-gray-100">{experience.title}</h3>
            <p className="text-gray-400 mt-1">
              {new Date(experience.startDate).toLocaleDateString()} - {' '}
              {experience.endDate ? new Date(experience.endDate).toLocaleDateString() : 'Present'}
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => onEdit(experience)}
              className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(experience.id)}
              className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
            >
              Delete
            </button>
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-gray-400">{experience.description}</p>
          
          <div className="flex items-center gap-2 text-sm">
            <span className="text-gray-300">Position:</span>
            <span className="text-gray-400">{experience.position}</span>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <span className="text-gray-300">Link:</span>
            <a 
              href={experience.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 transition-colors"
            >
              {experience.link}
            </a>
          </div>

          {experience.img && (
            <div className="flex items-center gap-2 text-sm">
              <span className="text-gray-300">Image URL:</span>
              <span className="text-gray-400">{experience.img}</span>
            </div>
          )}

          <div className="flex flex-wrap gap-2 mt-3">
            {experience.stack.map((tech, index) => (
              <span 
                key={index} 
                className="px-2 py-1 bg-gray-700 text-gray-300 rounded-full text-sm"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};