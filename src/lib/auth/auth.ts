import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { db } from "../prisma";
import { nextCookies } from "better-auth/next-js";
import { sendEmail } from "../email";
import { genericOAuth } from "better-auth/plugins"
// If your Prisma file is located elsewhere, you can change the path

export const auth = betterAuth({
  database: prismaAdapter(db, {
    provider: "postgresql", // or "mysql", "postgresql", ...etc
  }),
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 8,
    maxPasswordLength: 128,
    autoSignIn: true,
    sendResetPassword: async ({ user, url }) => {
      await sendEmail({
        to: user.email,
        subject: "Reset your password",
        text: url,
      })
    },
    resetPasswordTokenExpiresIn: 3600, // 1 hour
  },
  account: {
    accountLinking: { // if the same user sign in with both their google account and email --> links
      enabled: true,
    }
  },
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  plugins: [
    genericOAuth({
      config: [
        {
          providerId: "kakaotalk",
          clientId: process.env.KAKAO_CLIENT_ID!,
          clientSecret: process.env.KAKAO_CLIENT_SECRET!,
          authorizationUrl: "https://kauth.kakao.com/oauth/authorize",
          tokenUrl: "https://kauth.kakao.com/oauth/token",
          scopes: ["profile_nickname", "profile_image"],
          getUserInfo: async (tokens) => {
            const res = await fetch("https://kapi.kakao.com/v2/user/me", {
              headers: {
                Authorization: `Bearer ${tokens.accessToken}`,
              },
            });

            if (!res.ok) throw new Error("Failed to fetch user info from Kakao");

            const profile = await res.json();
            console.log(profile)

            return {
              id: profile.id.toString(),
              name: profile.kakao_account?.profile?.nickname ?? "Kakao User",
              email: profile.kakao_account?.email ?? "test",
              emailVerified: false,
              createdAt: new Date(),
              updatedAt: new Date(),
              image: profile.kakao_account?.profile?.profile_image_url ?? null,
            };
          },
        },
        {
          providerId: "naver",
          clientId: process.env.NAVER_CLIENT_ID!,
          clientSecret: process.env.NAVER_CLIENT_SECRET!,
          authorizationUrl: "https://nid.naver.com/oauth2.0/authorize",
          tokenUrl: "https://nid.naver.com/oauth2.0/token",
          scopes: ["profile", "email"],
          getUserInfo: async (tokens) => {
            const res = await fetch("https://openapi.naver.com/v1/nid/me", {
              headers: {
                Authorization: `Bearer ${tokens.accessToken}`,
              },
            });

            if (!res.ok) throw new Error("Failed to fetch user info from Naver");

            const data = await res.json();
            const profile = data.response;
            console.log(profile)

            return {
              id: profile.id,
              name: profile.name ?? "Naver User",
              email: profile.email ?? "test",
              emailVerified: false,
              createdAt: new Date(),
              updatedAt: new Date(),
              image: profile.profile_image ?? null,
            };
          },
        },
      ],
    }),
    nextCookies(),
  ]
});