"use server";

import { revalidatePath } from "next/cache";

export async function forceRevalidateAll() {
  revalidatePath("/");
  revalidatePath("/projects");
  revalidatePath("/netart");
  return { success: true };
}
