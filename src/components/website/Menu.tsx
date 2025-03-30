"use client";

import { useState } from "react";

export const Menu = () => {
  const [selected, setSelected] = useState("about");

  const menuItems = [
    { id: "about", label: "About" },
    { id: "experience", label: "Experience" },
    { id: "projects", label: "Projects" },
  ];

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
              className={`h-[1px] transition-all duration-900 ease-in-out bg-gray-600 dark:bg-gray-300 ${
                selected === item.id ? "w-[50px]" : "w-[20px]"
              }`}
            />
            <div
              onClick={() => handleClick(item.id)}
              className="cursor-pointer relative"
            >
              <span
                className={`absolute text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-all duration-500 ease-in-out font-bold ${
                  selected === item.id ? "opacity-100" : "opacity-0"
                }`}
              >
                {item.label}
              </span>
              <span
                className={`text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-all duration-500 ease-in-out ${
                  selected === item.id ? "opacity-0" : "opacity-100"
                }`}
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
