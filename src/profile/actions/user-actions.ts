"use server";

import prisma from "@/lib/prisma";
import { User } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const UpdateUser = async (data: User) => {
  const user = await prisma.user.update({
    where: { id: data.id },
    data: {
      name: data.name,
      profile: data.profile,
      occupation: data.occupation,
      text: data.text,
    },
  });

  revalidatePath("/admin");
  return user;
};
