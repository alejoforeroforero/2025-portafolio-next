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
    <nav className="flex flex-row md:flex-col items-center md:items-start justify-center md:justify-start space-x-4 md:space-x-0 md:space-y-6">
      {menuItems.map((item) => (
        <span
          key={item.id}
          onClick={() => handleClick(item.id)}
          className={`cursor-pointer text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors ${
            selected === item.id ? "font-bold" : ""
          }`}
        >
          {item.label}
        </span>
      ))}
    </nav>
  );
};
