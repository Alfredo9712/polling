import AuthProvider from "@/compononents/AuthedProvider";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-6">
      <AuthProvider>
        <main>{children}</main>
      </AuthProvider>
    </div>
  );
}
