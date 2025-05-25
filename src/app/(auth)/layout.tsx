import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Button className="absolute left-5 top-5" variant={"outline"} asChild>
        <Link href={"/"}>
          <Icons.arrowLeft className="h-2 w-2" />
          Back
        </Link>
      </Button>
      {children}
    </div>
  );
}