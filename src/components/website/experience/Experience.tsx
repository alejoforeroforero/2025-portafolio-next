"use client";

import type { Experience } from "@prisma/client";
import { useEffect, useState } from "react";
import { GetExperiences } from "@/components/actions/experience-actions";
import toast from "react-hot-toast";

export default function Experience() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadExperiences();
  }, []);

  const loadExperiences = async () => {
    const loadingToast = toast.loading("Loading experiences...");
    try {
      const data = await GetExperiences();
      setExperiences(data);
      toast.success("Experiences loaded successfully", { id: loadingToast });
    } catch (error) {
      toast.error("Failed to load experiences", { id: loadingToast });
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl p-[60px]">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-700 rounded w-1/4 mb-8"></div>
          <div className="space-y-12">
            {[1, 2, 3].map((i) => (
              <div key={i} className="border-l-2 border-gray-700 pl-8 relative">
                <div className="absolute w-4 h-4 bg-gray-700 rounded-full -left-[9px] top-0" />
                <div className="space-y-4">
                  <div className="h-6 bg-gray-700 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-700 rounded w-1/4"></div>
                  <div className="h-20 bg-gray-700 rounded w-full"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl p-[60px]">
      <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-gray-100">
        Experience
      </h1>
      <div className="space-y-12">
        {experiences.map((experience) => (
          <div
            key={experience.id}
            className="group text-white p-6 rounded-xl shadow-md max-w-3xl mx-auto flex relative"
          >
            <div 
              className="absolute inset-0 rounded-xl bg-[linear-gradient(15deg,rgb(41,41,41),rgb(35,43,43))] 
              opacity-0 transition-all duration-[2000ms] ease-in-out shadow-[inset_0_0_15px_rgba(127,123,123,0.2)]
              group-hover:opacity-100"
            />
            <div className="flex my-1 mr-4 text-[#4b5563] text-sm mb-2 relative z-10">
              <span>
                {new Date(experience.startDate).toLocaleDateString("en-US", {
                  month: "long",
                  year: "numeric",
                })}{" "}
                -
                {experience.endDate
                  ? " " +
                    new Date(experience.endDate).toLocaleDateString("en-US", {
                      month: "long",
                      year: "numeric",
                    })
                  : " Present"}
              </span>
            </div>
            <div className="relative z-10">
              <h2 className="text-xl font-semibold text-white">
                <span className="font-bold">{experience.title}</span>{" "}
              </h2>
              <p className="text-gray-300 mt-3">{experience.description}</p>
              <div>
                <a
                  href={experience.link}
                  className="text-blue-400 hover:text-[#00DC82] inline-flex items-center transition-colors duration-[900ms]"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {new URL(experience.link).hostname}
                  <span className="text-[10px] ml-1 transform translate-y-[-4px] text-blue-800 group-hover:text-[#00DC82] transition-all duration-[900ms] ease-in-out group-hover:translate-x-[4px] group-hover:-translate-y-[6px]">
                    ↗
                  </span>
                </a>
              </div>
              <div className="flex flex-wrap gap-2 mt-4">
                {experience.stack.map((tech, index) => (
                  <span
                    key={index}
                    className="bg-gray-700 text-white text-sm px-4 py-1 rounded-full"
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
