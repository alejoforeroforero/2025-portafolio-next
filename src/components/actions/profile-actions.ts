"use server";

import prisma from "@/lib/prisma";
import { Profile } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const CreateProfile = async (data: Omit<Profile, "id" | "createdAt" | "updatedAt">) => {
  const profile = await prisma.profile.create({
    data: {
      name: data.name,
      title: data.title,
      tagline: data.tagline,
      bio: data.bio
    },
  });

  revalidatePath("/admin");
  return profile;
};

export const GetProfile = async () => {
  const profile = await prisma.profile.findFirst();
  return profile;
};

export const UpdateProfile = async (data: Profile) => {
  const profile = await prisma.profile.update({
    where: { id: data.id },
    data: {
      name: data.name,
      title: data.title,
      tagline: data.tagline,
      bio: data.bio
    },
  });

  revalidatePath("/admin");
  return profile;
};

export const updateBio = async (bio: string) => {
  const existingProfile = await prisma.profile.findFirst();
  if (!existingProfile) throw new Error("Profile not found");

  const profile = await prisma.profile.update({
    where: { id: existingProfile.id },
    data: { bio }
  });

  revalidatePath("/admin");
  return profile;
};
