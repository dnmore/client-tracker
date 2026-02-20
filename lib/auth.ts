import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/lib/prisma";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "database",
  },

  providers: [GitHub, Google],
  callbacks: {
    session({ session, user }) {
      session.user.id = user.id;
      session.user.role = user.role;
      session.user.plan = user.plan;
      return session;
    },
  },
  events: {
    async createUser({ user }) {
      const existingOwner = await prisma.user.findFirst({
        where: { role: "OWNER", NOT: { id: user.id } },
      });

      await prisma.user.update({
        where: { id: user.id },
        data: {
          role: existingOwner ? "VIEWER" : "OWNER",
        },
      });
    },
  },
});
