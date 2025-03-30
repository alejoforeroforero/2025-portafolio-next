
import { getWebsiteExperiences } from "./actions/website-actions";

export default async function Experience() {
  const experiences = await getWebsiteExperiences();

  return (
    <div className="max-w-4xl my-[90px]">
      <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-gray-100">Experience</h1>
      <div className="space-y-8">
        {experiences.map((experience) => (
          <div key={experience.id} className="border-b border-gray-200 dark:border-gray-700 pb-8">
            <h4 className="text-lg font-medium mb-2">{experience.title}</h4>
            <p className="text-gray-600 dark:text-gray-300 mb-3">{experience.description}</p>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              <p>
                {new Date(experience.startDate).toLocaleDateString()} - {" "}
                {experience.endDate ? new Date(experience.endDate).toLocaleDateString() : "Present"}
              </p>
              <p className="mt-2">Stack: {experience.stack.join(", ")}</p>
              {experience.link && (
                <a 
                  href={experience.link}
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

