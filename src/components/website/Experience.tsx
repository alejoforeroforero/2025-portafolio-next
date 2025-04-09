
'use client';

import type { Experience } from "@prisma/client";
import { useEffect, useState } from "react";
import { GetExperiences } from "@/experience/actions/experience-actions";
import toast from 'react-hot-toast';

export default function Experience() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadExperiences();
  }, []);

  const loadExperiences = async () => {
    const loadingToast = toast.loading('Loading experiences...');
    try {
      const data = await GetExperiences();
      setExperiences(data);
      toast.success('Experiences loaded successfully', { id: loadingToast });
    } catch (error) {
      toast.error('Failed to load experiences', { id: loadingToast });
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
          <div key={experience.id} className="border-l-2 border-gray-700 pl-8 relative">
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

