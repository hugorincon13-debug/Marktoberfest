import { event } from "@/lib/config";
import { AdminDashboard } from "@/components/AdminDashboard";

export const metadata = { title: `Hosts · ${event.title}`, robots: { index: false } };

export default function AdminPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-14">
      <h1 className="section-title">Host dashboard</h1>
      <p className="mt-2 text-pine-700">
        Private view of every response, including contact details. Enter the host password.
      </p>
      <div className="mt-8">
        <AdminDashboard />
      </div>
    </div>
  );
}
