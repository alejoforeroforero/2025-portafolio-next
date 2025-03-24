"use client";

import { useState } from "react";
import { User } from "@prisma/client";
import { ProfileAdmin } from "@/profile";
import { ExperienceAdmin } from "@/experience";
import { Tabs } from "@/components/Tabs";

interface AdminPageProps {
  initialUser: User;
}

export default function AdminPage({ initialUser }: AdminPageProps) {
  const [activeTab, setActiveTab] = useState("profile");

  const tabs = [
    { id: "profile", label: "Profile" },
    { id: "experience", label: "Experience" },
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
        {activeTab === "profile" && <ProfileAdmin initialUser={initialUser} />}
        {activeTab === "experience" && <ExperienceAdmin />}
      </div>
    </div>
  );
}