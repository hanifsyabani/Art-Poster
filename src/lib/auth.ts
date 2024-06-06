import { NextAuthOptions } from "next-auth";
import { prisma } from "./prisma";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

async function login(credentials: { email: string; password: string }) {
  const { email, password } = credentials;

  try {
    const user = await prisma.user.findFirst({
      where: { email },
    });

    if (!user) {
      console.log("User not found");
      return null;
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      console.log("Invalid password");
      return null;
    }

    return user;
  } catch (error) {
    console.error("Error during login:", error);
    return null;
  }
}

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 60 * 60,
  },
  providers: [
    Credentials({
      credentials: {},
      async authorize(credentials: Record<string, string> | undefined) {
        if (!credentials) {
          console.log("No credentials provided");
          return null;
        }

        const user = await login(
          credentials as { email: string; password: string }
        );

        if (!user) {
          console.log("Authorization failed");
          return null;
        }

        return {
          id: user.id.toString(),
          name: user.userName,
          email: user.email,
        };
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (!user) return token;
      return { ...token, id: user.id };
    },
    session({ session, token }) {
      return { ...session, id: token.id };
    },
  },
  // cookies:{
  //   sessionToken:{
  //     name: `__Secure-next-auth.session-token`,
  //     options:{
  //       httpOnly: true,
  //       sameSite: 'lax',
  //       secure: process.env.NODE_ENV === 'production',
  //       maxAge: 60 * 60,
  //     }
  //   }
  // }
};
