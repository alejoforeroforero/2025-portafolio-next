"use client";

import { useState } from "react";
import { ProfileAdmin } from "@/components/admin/profile";
import { ExperienceAdmin } from "@/components/admin/experience";
import { ProjectAdmin } from "@/components/admin/projects";
import { Tabs } from "@/components/ui/Tabs";
import { forceRevalidateAll } from "@/components/actions/revalidate-actions";

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("profile");
  const [isRevalidating, setIsRevalidating] = useState(false);

  const tabs = [
    { id: "profile", label: "Profile" },
    { id: "experience", label: "Experience" },
    { id: "projects", label: "Projects" },
  ];

  const handleRevalidate = async () => {
    setIsRevalidating(true);
    await forceRevalidateAll();
    setIsRevalidating(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-100">
          Admin Dashboard
        </h1>
      </div>

      <div className="flex items-center justify-between border-b border-gray-700">
        <Tabs
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={(tabId) => setActiveTab(tabId)}
        />
        <button
          onClick={handleRevalidate}
          disabled={isRevalidating}
          className="px-4 py-2 text-sm font-medium text-white bg-sky-600 rounded-md hover:bg-sky-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isRevalidating ? "Validando..." : "Forzar validación"}
        </button>
      </div>

      <div className="mt-6">
        {activeTab === "profile" && <ProfileAdmin />}
        {activeTab === "experience" && <ExperienceAdmin />}
        {activeTab === "projects" && <ProjectAdmin />}
      </div>
    </div>
  );
}
