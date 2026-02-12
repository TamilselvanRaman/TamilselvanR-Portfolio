import AdminRoute from '@/components/AdminRoute';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminRoute>
      <div className="min-h-screen bg-brutalist-black text-white">
        <header className="border-b-2 border-brutalist-border p-6">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <h1 className="text-2xl font-bold">ADMIN DASHBOARD</h1>
            <a
              href="/"
              className="border-2 border-white px-4 py-2 text-sm hover:bg-white hover:text-black transition-all"
            >
              BACK TO SITE
            </a>
          </div>
        </header>
        <main className="max-w-7xl mx-auto p-6">{children}</main>
      </div>
    </AdminRoute>
  );
}
