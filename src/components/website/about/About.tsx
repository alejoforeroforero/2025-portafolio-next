"use client";

import { useState, useEffect } from "react";
import { getWebsiteUser } from "@/components/website/actions/website-actions";
import { convertToHTMLDynamic } from "@/components/admin/profile/components/text-editor/utils/convertToHTMLDynamic";
import toast from "react-hot-toast";

export default function About() {
  const [profile, setProfile] = useState<{ bio: string } | null>(null);
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
      <div className="max-w-4xl p-[60px]">
        <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-gray-100">
          About
        </h1>
        <div className="animate-pulse">
          <div className="h-4 bg-gray-700 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-700 rounded w-1/2 mb-4"></div>
          <div className="h-4 bg-gray-700 rounded w-2/3"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl p-[60px]">
      <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-gray-100">
        About
      </h1>
      <div className="prose dark:prose-invert">
        {profile?.bio && convertToHTMLDynamic(profile.bio)}
      </div>
    </div>
  );
}
