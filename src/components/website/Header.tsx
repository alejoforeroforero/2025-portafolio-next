

"use client";

import { useState, useEffect } from "react";
import { getWebsiteUser } from "@/components/website/actions/website-actions";
import toast from "react-hot-toast";

export default function Header() {
  const [profile, setProfile] = useState<{ name: string; title: string; tagline: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProfile = async () => {
      const loadingToast = toast.loading('Loading profile...');
      try {
        const data = await getWebsiteUser();
        setProfile(data);
        toast.success('Profile loaded successfully', { id: loadingToast });
      } catch (error) {
        toast.error('Failed to load profile', { id: loadingToast });
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    loadProfile();
  }, []);

  if (loading) {
    return (
      <div className="max-w-4xl">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-700 rounded w-3/4 mb-4"></div>
          <div className="h-6 bg-gray-700 rounded w-1/2 mb-4"></div>
          <div className="h-4 bg-gray-700 rounded w-2/3"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl">
      <h1 className="text-5xl font-bold mb-4 text-gray-900 dark:text-gray-100">
        {profile?.name}
      </h1>
      <h2 className="text-2xl font-semibold mb-2 text-gray-700 dark:text-gray-300">
        {profile?.title}
      </h2>
      <p className="text-lg text-gray-600 dark:text-gray-400">
        {profile?.tagline}
      </p>
    </div>
  );
}
