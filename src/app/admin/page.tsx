import { AdminDashboard } from '@/components/admin/AdminDashboard';

export const metadata = {
  title: 'Admin Recap | Console Pengirim',
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminPage() {
  return (
    <div className="w-full min-h-[100dvh] flex items-center justify-center bg-[#eeedf7]">
      <AdminDashboard />
    </div>
  );
}
