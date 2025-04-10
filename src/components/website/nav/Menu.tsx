"use client";

import { useState, useEffect, useMemo } from "react";

export const Menu = () => {
  const [selected, setSelected] = useState("about");

  const menuItems = useMemo(() => [
    { id: "about", label: "About" },
    { id: "experience", label: "Experience" },
    { id: "projects", label: "Projects" },
  ], []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = menuItems.map(item => {
        const element = document.getElementById(item.id);
        if (!element) return { id: item.id, position: 0 };
        const rect = element.getBoundingClientRect();
        return {
          id: item.id,
          position: Math.abs(rect.top)
        };
      });

      const closest = sections.reduce((prev, curr) => 
        prev.position < curr.position ? prev : curr
      );

      setSelected(closest.id);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [menuItems]);

  const handleClick = (id: string) => {
    setSelected(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      <nav className="flex flex-row md:flex-col items-center md:items-start justify-center md:justify-start space-x-4 md:space-x-0 md:space-y-6">
        {menuItems.map((item) => (
          <div key={item.id} className="flex items-center gap-2">
            <div
              className={`h-[1px] transition-all duration-2000 ease-in-out ${
                selected === item.id ? "w-[35px] bg-gray-300" : "w-[20px] bg-[rgb(75,85,99)]"
              }`}
            />
            <div
              onClick={() => handleClick(item.id)}
              className="cursor-pointer relative group"
            >
              <span
                className={`absolute text-white transition-all duration-2000 ease-in-out font-bold ${
                  selected === item.id ? "opacity-100" : "opacity-0"
                } group-hover:text-white`}
              >
                {item.label}
              </span>
              <span
                className={`text-[rgb(75,85,99)] transition-all duration-500 ease-in-out ${
                  selected === item.id ? "opacity-0" : "opacity-100"
                } group-hover:text-white`}
              >
                {item.label}
              </span>
            </div>
          </div>
        ))}
      </nav>
    </>
  );
};
