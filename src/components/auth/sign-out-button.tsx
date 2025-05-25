import { useRouter } from "next/navigation";
import { Icons } from "../icons";
import { authClient } from "@/lib/auth/auth-client";

export default function SignOutButton() {
  const router = useRouter()
  const handleClick = async()=> {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/login")
        },
      },
    });
  }
  return (
    <div onClick={handleClick}>
      <Icons.logOut />
      Log Out
    </div>
  )
}