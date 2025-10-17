// src/app/api/auth/[...nextauth]/route.js

import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google"; // New Import

const handler = NextAuth({
  providers: [
    // --- Google Provider Implementation ---
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    // The CredentialsProvider is now removed/commented out
  ],
  pages: {
    signIn: '/?mode=login', // Redirect unauthenticated users to the root with login mode
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    // You don't need custom JWT/Session callbacks for basic Google auth, 
    // but they are left here for future customization (e.g., database lookup).
    // The default NextAuth behavior handles passing basic user info (name, email)
    // from the Google profile.
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id; // User.id will be the Google ID
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      return session;
    }
  }
});

export { handler as GET, handler as POST };