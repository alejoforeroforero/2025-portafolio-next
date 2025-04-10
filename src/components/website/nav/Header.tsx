"use client";

import { useState, useEffect } from "react";
import { getWebsiteUser } from "@/components/website/actions/website-actions";
import toast from "react-hot-toast";

export default function Header() {
  const [profile, setProfile] = useState<{
    name: string;
    title: string;
    tagline: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProfile = async () => {
      const loadingToast = toast.loading("Loading profile...");
      try {
        const data = await getWebsiteUser();
        setProfile(data);
        toast.success("Profile loaded successfully", { id: loadingToast });
      } catch (error) {
        toast.error("Failed to load profile", { id: loadingToast });
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    loadProfile();
  }, []);

  if (loading) {
    return <div className="max-w-4xl"></div>;
  }

  return (
    <>
      <style jsx>{`
        .responsive-heading {
          text-align: center;
        }

        @media (min-width: 900px) {
          .responsive-heading {
            text-align: left;
          }
        }
      `}</style>
      <div className="max-w-4xl">
        <h1 className="text-5xl font-bold mb-4 text-gray-900 dark:text-gray-100 responsive-heading">
          {profile?.name}
        </h1>
        <h2 className="text-2xl font-semibold mb-2 text-gray-700 dark:text-gray-300 responsive-heading">
          {profile?.title}
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 responsive-heading">
          {profile?.tagline}
        </p>
      </div>
    </>
  );
}
