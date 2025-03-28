'use server';

import { getServerSession } from "next-auth";
import prisma from "@/lib/prisma";

export async function getCurrentUser() {
  const session = await getServerSession();
  if (!session?.user?.email) return null;

  const user = await prisma.user.findUnique({
    where: { 
      email: session.user.email
    },
    select: {
      id: true,
      name: true,
      email: true,
      occupation: true,
      profile: true
    }
  });

  return user;
}

export async function getUserById(id: string) {
  const user = await prisma.user.findUnique({
    where: { 
      id: id
    },
    select: {
      id: true,
      name: true,
      email: true,
      occupation: true,
      profile: true
    }
  });

  return user;
}
