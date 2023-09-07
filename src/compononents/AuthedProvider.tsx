import Link from "next/link";
import { BarChartBigIcon } from "lucide-react";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { RedirectType } from "next/dist/client/components/redirect";

export default async function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/", RedirectType.replace);

  return <>{children}</>;
}
