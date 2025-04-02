import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import prisma from "@/lib/prisma";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) {
            console.log("Credenciales faltantes");
            return null;
          }

          console.log("Buscando usuario con email:", credentials.email);
          
          const user = await prisma.user.findUnique({
            where: { email: credentials.email }
          });

          console.log("Resultado de búsqueda:", user);

          if (!user) {
            console.log("Usuario no existe");
            return null;
          }

          try {
            const isPasswordValid = await bcrypt.compare(credentials.password, user.password);
            console.log("Contraseña válida:", isPasswordValid);

            if (!isPasswordValid) {
              console.log("Contraseña inválida");
              return null;
            }
          } catch (bcryptError) {
            console.error("Error en bcrypt.compare:", bcryptError);
            return null;
          }

          return {
            id: user.id,
            email: user.email,
          };
        } catch (error) {
          console.error("Error completo en authorize:", error);
          return null;
        }
      }
    }),
  ],
  pages: {
    signIn: '/auth/signin',
  },
  session: {
    strategy: "jwt",
  },
  debug: true, // Temporarily set to true to see more details
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
