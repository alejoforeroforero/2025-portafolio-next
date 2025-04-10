'use client';

import { useEffect, useState } from "react";
import type { Project } from "@prisma/client";
import { GetProjectsNetArt } from "@/components/actions/project-actions";
import toast from "react-hot-toast";
import Link from "next/link";

export default function NetArtPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    const loadingToast = toast.loading("Loading projects...");
    try {
      const data = await GetProjectsNetArt();
      setProjects(data);
      toast.success("Projects loaded successfully", { id: loadingToast });
    } catch (error) {
      toast.error("Failed to load projects", { id: loadingToast });
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl p-2 text-black-200-100">
        
      </div>
    );
  }

  return (
    <div className="max-w-4xl p-4 mx-auto">
      <Link 
        href="/" 
        className="text-blue-400 hover:text-[#00DC82] inline-flex items-center transition-colors duration-[900ms]"
      >
        ← Back to Portfolio
      </Link>
      <h1 className="text-4xl font-bold mt-6 mb-8">NetArt Projects</h1>

      <div className="space-y-12">
        {projects.map((project) => (
          <div
            key={project.id}
            className="group text-white p-6 rounded-xl shadow-md mx-auto flex relative"
          >
            <div 
              className="absolute inset-0 rounded-xl bg-[linear-gradient(15deg,rgb(41,41,41),rgb(35,43,43))] 
              opacity-0 transition-all duration-[2000ms] ease-in-out shadow-[inset_0_0_15px_rgba(127,123,123,0.2)]
              group-hover:opacity-100"
            />
            <div className="w-1/4 flex flex-col mr-6 relative z-10">
              {project.img && (
                <img 
                  src={project.img} 
                  alt={project.title}
                  className="w-[90%] h-12 object-cover rounded-lg mt-2"
                />
              )}
            </div>
            <div className="relative z-10 flex-1">
              <h2 className="text-xl font-semibold text-white">
                <span className="font-bold">{project.title}</span>{" "}
              </h2>
              <p className="text-gray-300 mt-3">{project.description}</p>
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
              <div className="flex flex-wrap gap-2 mt-4">
                {project.stack.map((tech, index) => (
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
