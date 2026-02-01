"use client";

import { useState, useEffect, useCallback, useRef } from "react";

const menuItems = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
];

export const Menu = () => {
  const [selected, setSelected] = useState("about");
  const rafRef = useRef<number | null>(null);
  const lastUpdateRef = useRef<number>(0);

  const handleScroll = useCallback(() => {
    const now = Date.now();
    if (now - lastUpdateRef.current < 100) return;
    lastUpdateRef.current = now;

    const sections = menuItems.map((item) => {
      const element = document.getElementById(item.id);
      if (!element) return { id: item.id, position: Infinity };
      const rect = element.getBoundingClientRect();
      return {
        id: item.id,
        position: Math.abs(rect.top),
      };
    });

    const closest = sections.reduce((prev, curr) =>
      prev.position < curr.position ? prev : curr
    );

    setSelected((current) => (current !== closest.id ? closest.id : current));
  }, []);

  useEffect(() => {
    const onScroll = () => {
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        handleScroll();
        rafRef.current = null;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [handleScroll]);

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
        <div key={item.id} className="flex items-center gap-2">
          <div
            className={`h-[1px] transition-all duration-2000 ease-in-out ${
              selected === item.id
                ? "w-[35px] bg-gray-300"
                : "w-[20px] bg-[rgb(75,85,99)]"
            }`}
          />
          <button
            onClick={() => handleClick(item.id)}
            className="cursor-pointer relative group bg-transparent border-none"
            type="button"
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
          </button>
        </div>
      ))}
    </nav>
  );
};
