"use server";

import prisma from "@/lib/prisma";
import { Project } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const CreateProject = async (data: Omit<Project, "id" | "createdAt" | "updatedAt">) => {
  const project = await prisma.project.create({
    data: {
      title: data.title,
      description: data.description,
      link: data.link,
      startDate: data.startDate,
      endDate: data.endDate,
      position: data.position,
      stack: data.stack,
      img: data.img,
      type: data.type, // Ensure type is included
    },
  });

  revalidatePath("/admin");
  return project;
};

export const GetProjects = async () => {
  const projects = await prisma.project.findMany({
    orderBy: {
      position: 'desc',
    },
  });

  return projects;
};

export const GetProjectsRoot = async () => {
  const projects = await prisma.project.findMany({
    where: {
      type: 'root'
    },
    orderBy: {
      position: 'desc',
    },
  });

  return projects;
};

export const GetProjectsNetArt = async () => {
  const projects = await prisma.project.findMany({
    where: {
      type: 'art'
    },
    orderBy: {
      position: 'desc',
    },
  });

  return projects;
};

export const UpdateProject = async (data: Project) => {
  const project = await prisma.project.update({
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
      type: data.type, // Add type field here
    },
  });

  revalidatePath("/admin");
  return project;
};

export const DeleteProject = async (id: string) => {
  await prisma.project.delete({
    where: { id },
  });

  revalidatePath("/admin");
};
