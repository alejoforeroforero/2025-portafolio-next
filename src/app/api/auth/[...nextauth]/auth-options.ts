import { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { Adapter } from "next-auth/adapters";
import prisma from "@/lib/prisma";
import GoogleProvider from "next-auth/providers/google";

const ALLOWED_EMAIL = process.env.ALLOWED_EMAIL ?? "";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as Adapter,

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  
  session: {
    strategy: "jwt",
  },
  
  callbacks: {
    async signIn({ user }) {
      // Only allow specific email
      return user.email === ALLOWED_EMAIL;
    },
    
    async jwt({ token }): Promise<import("next-auth/jwt").JWT> {
      const dbUser = await prisma.user.findUnique({
        where: { email: token.email ?? "no-email" },
      });

      if (!dbUser) {
        // If it's the allowed email but no user exists, create one
        if (token.email === ALLOWED_EMAIL) {
          const newUser = await prisma.user.create({
            data: {
              email: token.email,
              name: token.name,
              roles: ["admin"],
              isActive: true,
            },
          });
          token.roles = newUser.roles;
          token.id = newUser.id;
          return token;
        }
        throw new Error("Unauthorized access");
      }

      if (dbUser.email !== ALLOWED_EMAIL || dbUser.isActive === false) {
        throw new Error("Unauthorized access");
      }

      token.roles = dbUser.roles;
      token.id = dbUser.id;

      return token;
    },

    async session({ session, token }) {
      if (session && session.user) {
        session.user.roles = token.roles;
        session.user.id = token.id;
      }

      return session;
    },
  },
};
