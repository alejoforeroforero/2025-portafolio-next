'use server';

import { getServerSession } from "next-auth";
import prisma from "@/lib/prisma";

export async function getCurrentUser() {
  const session = await getServerSession();
  if (!session?.user?.email) return null;

  const user = await prisma.user.findUnique({
    where: { 
      email: session.user.email
    }
  });

  return user;
}