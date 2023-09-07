import AuthProvider from "@/compononents/AuthedProvider";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AuthProvider>
        <main>{children}</main>
      </AuthProvider>
    </>
  );
}
