import AdminRoute from '@/components/AdminRoute';
import Link from 'next/link';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminRoute>
      <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
        <header className="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-sm">
          <div className="max-w-7xl mx-auto px-6 h-16 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">A</div>
              <h1 className="text-xl font-bold tracking-tight text-gray-900">Admin Dashboard</h1>
            </div>
            <Link
              href="/"
              className="text-sm font-medium text-gray-600 hover:text-gray-900 px-4 py-2 rounded-md hover:bg-gray-100 transition-all"
            >
              Back to Portfolio
            </Link>
          </div>
        </header>
        <main className="max-w-7xl mx-auto p-6 md:p-8">{children}</main>
      </div>
    </AdminRoute>
  );
}
