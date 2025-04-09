"use client";

import { useState } from "react";
import { ProfileAdmin } from "@/components/admin/profile";
import { ExperienceAdmin } from "@/components/admin/experience";
import { ProjectAdmin } from "@/components/admin/projects";
import { Tabs } from "@/components/ui/Tabs";

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("profile");

  const tabs = [
    { id: "profile", label: "Profile" },
    { id: "experience", label: "Experience" },
    { id: "projects", label: "Projects" },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Admin Dashboard
        </h1>
      </div>

      <Tabs
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={(tabId) => setActiveTab(tabId)}
      />

      <div className="mt-6">
        {activeTab === "profile" && <ProfileAdmin />}
        {activeTab === "experience" && <ExperienceAdmin />}
        {activeTab === "projects" && <ProjectAdmin />}
      </div>
    </div>
  );
}
