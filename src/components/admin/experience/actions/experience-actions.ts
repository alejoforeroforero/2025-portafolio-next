
"use server";

import prisma from "@/lib/prisma";
import { Experience } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const CreateExperience = async (data: Omit<Experience, "id" | "createdAt" | "updatedAt">) => {
  const experience = await prisma.experience.create({
    data: {
      title: data.title,
      description: data.description,
      link: data.link,
      startDate: data.startDate,
      endDate: data.endDate,
      position: data.position,
      stack: data.stack,
      img: data.img,
    },
  });

  revalidatePath("/admin");
  return experience;
};

export const GetExperiences = async () => {
  const experiences = await prisma.experience.findMany({
    orderBy: {
      position: 'desc',
    },
  });

  return experiences;
};

export const UpdateExperience = async (data: Experience) => {
  const experience = await prisma.experience.update({
    where: { id: data.id },
    data: {
      title: data.title,
      description: data.description,
      link: data.link,
      startDate: data.startDate,
      endDate: data.endDate,
      position: data.position,
      stack: data.stack,
      img: data.img,
    },
  });

  revalidatePath("/admin");
  return experience;
};

export const DeleteExperience = async (id: string) => {
  await prisma.experience.delete({
    where: { id },
  });

  revalidatePath("/admin");
};

