"use client";

interface Tab {
  id: string;
  label: string;
}

interface TabsProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export const Tabs = ({ tabs, activeTab, onTabChange }: TabsProps) => {
  return (
    <div className="border-b border-gray-200 dark:border-gray-700">
      <nav className="flex space-x-8" aria-label="Tabs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`
              py-4 px-1 border-b-2 font-medium text-sm
              ${
                activeTab === tab.id
                  ? "border-sky-500 text-sky-600 dark:text-sky-500"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300"
              }
            `}
          >
            {tab.label}
          </button>
        ))}
      </nav>
    </div>
  );
};