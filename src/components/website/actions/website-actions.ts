
"use server";

import prisma from "@/lib/prisma";

export async function getWebsiteUser() {
  return await prisma.profile.findFirst();
}

