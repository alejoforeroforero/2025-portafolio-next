"use client";

import { useState, useEffect } from "react";
import { CreateProfile, GetProfile, UpdateProfile } from "../../../actions/profile-actions";
import { Profile } from "@prisma/client";
import toast from 'react-hot-toast';
// import { BioEditor } from '@/components/admin/profile/components/text-editor/BioEditor';
import { TextEditor } from '@/components/admin/profile/components/text-editor/TextEditor';

interface ProfileFormData {
  id?: string;
  name: string;
  title: string;
  tagline: string;
  bio: string;
}

export const ProfileAdmin = () => {
  const [formData, setFormData] = useState<ProfileFormData>({
    name: "",
    title: "",
    tagline: "",
    bio: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const profile = await GetProfile();
        if (profile) {
          setFormData(profile);
        }
      } catch (error) {
        console.log(error)
      }
    };
    loadProfile();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    
    const saveToast = toast.loading('Saving changes...');
    
    try {
      if (formData.id) {
        await UpdateProfile(formData as Profile);
        toast.success('Profile updated successfully', {
          id: saveToast,
          duration: 3000,
          icon: '👍',
        });
      } else {
        await CreateProfile(formData);
        toast.success('Profile created successfully', {
          id: saveToast,
          duration: 3000,
          icon: '✨',
        });
      }
    } catch (error) {
      toast.error('Error saving profile', {
        id: saveToast,
        duration: 4000,
      });
      console.error('Error saving profile:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full mt-8 max-w-[1100px] mx-auto p-6">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Profile Management
        </h2>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
          Update your profile information
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label 
            htmlFor="name" 
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 dark:text-gray-100 dark:border-gray-700 dark:bg-gray-800 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            required
          />
        </div>

        <div>
          <label 
            htmlFor="title" 
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 dark:text-gray-100 dark:border-gray-700 dark:bg-gray-800 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            required
          />
        </div>

        <div>
          <label 
            htmlFor="tagline" 
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Tagline
          </label>
          <input
            type="text"
            id="tagline"
            name="tagline"
            value={formData.tagline}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 dark:text-gray-100 dark:border-gray-700 dark:bg-gray-800 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            required
          />
        </div>

        <div>
          <label 
            htmlFor="bio" 
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Bio
          </label>
          {/* <BioEditor
            onChange={(html) => setFormData(prev => ({ ...prev, bio: html }))}
            initialContent={formData.bio}
          /> */}
          <TextEditor />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Saving...' : 'Save Profile'}
          </button>
        </div>
      </form>
    </div>
  );
};
