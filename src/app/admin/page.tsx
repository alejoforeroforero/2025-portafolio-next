import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import AdminPage from "./AdminPage";

export default async function AdminPageLayout() {
  const session = await getServerSession();
  
  if (!session) {
    redirect("/auth/signin");
  }

  const user = await prisma.user.findUnique({
    where: { 
      email: session.user?.email || redirect('/auth/signin')
    }
  });

  if (!user) {
    redirect("/auth/signin");
  }

  return <AdminPage initialUser={user} />;
}
