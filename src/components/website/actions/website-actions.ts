
"use server";

import prisma from "@/lib/prisma";

export async function getWebsiteUser() {
  const user = await prisma.user.findFirst({
    select: {
      name: true,
      occupation: true,
      profile: true,
      text: true
    }
  });

  return user;
}

export async function getWebsiteExperiences() {
  const experiences = await prisma.experience.findMany({
    orderBy: {
      position: 'desc',
    },
  });

  return experiences;
}

export async function getWebsiteProjects() {
  const projects = await prisma.project.findMany({
    orderBy: {
      position: 'desc',
    },
  });

  return projects;
}

