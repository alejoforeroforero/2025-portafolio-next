import type { Project } from "@prisma/client";
import Image from "next/image";

interface ProjectsProps {
  projects: Project[];
}

export default function Projects({ projects }: ProjectsProps) {
  if (projects.length === 0) {
    return (
      <div className="max-w-4xl p-8">
        <p className="text-gray-400">No projects available</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl">
      <div className="space-y-12">
        {projects.map((project) => (
          <div
            key={project.id}
            className="group text-white p-6 rounded-xl shadow-md mx-auto flex relative flex-col sm:flex-row"
          >
            <div
              className="absolute inset-0 rounded-xl bg-[linear-gradient(15deg,rgb(41,41,41),rgb(35,43,43))]
              opacity-0 transition-all duration-[2000ms] ease-in-out shadow-[inset_0_0_15px_rgba(127,123,123,0.2)]
              group-hover:opacity-100"
            />
            <div className="mb-4 sm:w-1/4 sm:mr-6 relative z-10">
              {project.img && (
                <Image
                  src={project.img}
                  alt={project.title}
                  width={150}
                  height={48}
                  className="w-[90%] h-12 object-cover rounded-lg"
                />
              )}
            </div>
            <div className="relative z-10 flex-1">
              <h2 className="text-xl font-semibold text-white">
                <span className="font-bold">{project.title}</span>{" "}
              </h2>
              <p className="text-gray-300 mt-3">{project.description}</p>
              {project.link && (
                <div>
                  <a
                    href={project.link}
                    className="text-blue-400 hover:text-[#00DC82] inline-flex items-center transition-colors duration-[900ms]"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {new URL(project.link).hostname}
                    <span className="text-[10px] ml-1 transform translate-y-[-4px] text-blue-800 group-hover:text-[#00DC82] transition-all duration-[900ms] ease-in-out group-hover:translate-x-[4px] group-hover:-translate-y-[6px]">
                      ↗
                    </span>
                  </a>
                </div>
              )}
              <div className="flex flex-wrap gap-2 mt-4">
                {project.stack.map((tech, index) => (
                  <span
                    key={index}
                    className="tech-badge"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
