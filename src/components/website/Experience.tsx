

import { GetExperiences } from "@/experience/actions/experience-actions";

export default async function Experience() {
  const experiences = await GetExperiences();

  return (
    <div className="max-w-4xl p-[60px]">
      <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-gray-100">
        Experience
      </h1>

      <div className="space-y-12">
        {experiences.map((experience) => (
          <div key={experience.id} className="border-l-2 border-gray-700 pl-8 relative">
            {/* Timeline dot */}
            <div className="absolute w-4 h-4 bg-gray-700 rounded-full -left-[9px] top-0" />
            
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
                <h3 className="text-xl font-bold text-gray-200">{experience.title}</h3>
                <div className="text-sm text-gray-400">
                  {new Date(experience.startDate).toLocaleDateString()} - 
                  {experience.endDate 
                    ? new Date(experience.endDate).toLocaleDateString()
                    : 'Present'}
                </div>
              </div>
              
              <p className="text-gray-400">{experience.description}</p>
              
              {experience.stack && (
                <div className="flex flex-wrap gap-2">
                  {experience.stack.map((tech, index) => (
                    <span 
                      key={index}
                      className="px-3 py-1 text-sm bg-gray-800 text-gray-300 rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}
              
              {experience.link && (
                <a 
                  href={experience.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-blue-400 hover:text-blue-300 transition-colors"
                >
                  View Project →
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

