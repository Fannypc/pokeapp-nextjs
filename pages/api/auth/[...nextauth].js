import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";

// automatically set cookies to preserve session
// option #1 jwt
// option #2 database sessions

const prisma = new PrismaClient();

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  database: {
    type: "postgres",
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
  },
  callbacks: {
    signIn: async (profile) => {
      const res = await fetch("https://api.github.com/user/emails", {
        headers: {
          Authorization: `Bearer ${profile.account.access_token}`,
        },
      });
      const emails = await res.json();
      if (!emails || emails.length === 0) {
        return;
      }
      if (Array.isArray(emails)) {
        const sortedEmails = emails.sort((a, b) => b.primary - a.primary);
        profile.profile.email = sortedEmails[0].email;
        return true;
      }
      return;
    },
  },
};

export default NextAuth(authOptions);
