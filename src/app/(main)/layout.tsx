import AuthProvider from "@/compononents/AuthedProvider";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="py-6">
      <AuthProvider>
        <main className="px-2">{children}</main>
      </AuthProvider>
    </div>
  );
}
