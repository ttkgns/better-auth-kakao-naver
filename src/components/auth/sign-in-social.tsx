"use client";

import { authClient } from "@/lib/auth/auth-client";
import { Button } from "../ui/button";

export default function SignInSocial({
  provider,
  children,
}: {
  provider: "github" | "google" | "kakaotalk" | "naver";
  children: React.ReactNode;
}) {
  const handleSignIn = async () => {
    if (provider === "kakaotalk" || provider === "naver") {
      await authClient.signIn.oauth2({
        providerId: provider,
        callbackURL: "/dashboard",
      });
  } else {
    await authClient.signIn.social({
      provider,
      callbackURL: "/dashboard",
    });
}
  };

return (
  <Button onClick={handleSignIn} type="button" variant={"outline"}>
    {children}
  </Button>
);
}
