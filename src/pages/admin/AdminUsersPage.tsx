import { Plus, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { BOLayout } from "../../components/bo/BOLayout";
import { SimpleDialog } from "../../components/ui/SimpleDialog";
import { StatusPill, type StatusTone } from "../../components/ui/StatusPill";
import { mppsDataset } from "../../data/mpps";
import { formatInt } from "../../lib/format";

function roleTone(role: string): StatusTone {
  if (role === "Admin") return "admin";
  return "subAdmin";
}

function statusTone(status: string): StatusTone {
  return status === "Active" ? "active" : "inactive";
}

type UserRow = (typeof mppsDataset.admin.users)[number];

export function AdminUsersPage() {
  const seed = useMemo(() => [...mppsDataset.admin.users], []);
  const [users, setUsers] = useState<UserRow[]>(seed);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState<"Admin" | "Sub-Admin">("Sub-Admin");
  const [status, setStatus] = useState<"Active" | "Inactive">("Active");

  const submit = () => {
    if (!name.trim() || !email.trim() || !phone.trim()) return;
    setUsers((u) => [
      ...u,
      {
        id: `U-NEW-${Date.now()}`,
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        role,
        status,
      },
    ]);
    setName("");
    setEmail("");
    setPhone("");
    setOpen(false);
  };

  return (
    <BOLayout role="admin" title="User Management" badge={`${formatInt(users.length)} users total`}>
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-end">
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="inline-flex items-center justify-center gap-2 rounded-btn bg-primary px-4 py-2.5 text-sm font-semibold text-secondary shadow-sm hover:opacity-95"
          >
            <Plus className="h-4 w-4" />
            Add User
          </button>
        </div>

        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-navy" />
          <input
            placeholder="Search users..."
            className="w-full rounded-btn border border-black/10 bg-white py-2.5 pl-10 pr-3 text-sm outline-none ring-primary focus:ring-2"
          />
        </div>

        <div className="overflow-hidden rounded-card border border-black/5 bg-white shadow-card">
          <div className="overflow-x-auto">
            <table className="min-w-[720px] w-full text-sm">
              <thead className="bg-surface text-left text-xs font-semibold uppercase tracking-wide text-muted-navy">
                <tr>
                  <th className="px-4 py-3">User</th>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">Phone</th>
                  <th className="px-4 py-3">Role</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u.id} className="border-t border-black/5">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/15 text-xs font-bold text-secondary">
                          {u.name
                            .split(" ")
                            .map((p) => p[0])
                            .join("")
                            .slice(0, 2)}
                        </div>
                        <span className="font-medium text-black">{u.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-muted-navy">{u.email}</td>
                    <td className="px-4 py-3 text-muted-navy">{u.phone}</td>
                    <td className="px-4 py-3">
                      <StatusPill label={u.role} tone={roleTone(u.role)} />
                    </td>
                    <td className="px-4 py-3">
                      <StatusPill label={u.status} tone={statusTone(u.status)} />
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button type="button" className="mr-2 rounded-btn border border-secondary px-3 py-1.5 text-xs font-semibold text-secondary hover:bg-primary/10">
                        Edit
                      </button>
                      <button type="button" className="rounded-lg border border-rose-300 px-3 py-1.5 text-xs font-semibold text-rose-600 hover:bg-rose-50">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <SimpleDialog
        open={open}
        onClose={() => setOpen(false)}
        title="Add user"
        footer={
          <>
            <button type="button" className="rounded-btn border border-black/15 px-4 py-2 text-sm font-medium hover:bg-surface" onClick={() => setOpen(false)}>
              Cancel
            </button>
            <button type="button" className="rounded-btn bg-primary px-4 py-2 text-sm font-semibold text-secondary hover:opacity-95" onClick={submit}>
              Save user
            </button>
          </>
        }
      >
        <div className="space-y-3">
          <div>
            <label className="text-xs font-semibold text-muted-navy" htmlFor="au-name">
              Full name
            </label>
            <input id="au-name" value={name} onChange={(e) => setName(e.target.value)} className="mt-1 w-full rounded-btn border border-black/10 px-3 py-2 text-sm outline-none ring-primary focus:ring-2" />
          </div>
          <div>
            <label className="text-xs font-semibold text-muted-navy" htmlFor="au-email">
              Email
            </label>
            <input id="au-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 w-full rounded-btn border border-black/10 px-3 py-2 text-sm outline-none ring-primary focus:ring-2" />
          </div>
          <div>
            <label className="text-xs font-semibold text-muted-navy" htmlFor="au-phone">
              Phone
            </label>
            <input id="au-phone" value={phone} onChange={(e) => setPhone(e.target.value)} className="mt-1 w-full rounded-btn border border-black/10 px-3 py-2 text-sm outline-none ring-primary focus:ring-2" />
          </div>
          <div>
            <label className="text-xs font-semibold text-muted-navy" htmlFor="au-role">
              Role
            </label>
            <select id="au-role" value={role} onChange={(e) => setRole(e.target.value as "Admin" | "Sub-Admin")} className="mt-1 w-full rounded-btn border border-black/10 px-3 py-2 text-sm outline-none ring-primary focus:ring-2">
              <option value="Sub-Admin">Sub-Admin</option>
              <option value="Admin">Admin</option>
            </select>
          </div>
          <div>
            <label className="text-xs font-semibold text-muted-navy" htmlFor="au-status">
              Status
            </label>
            <select id="au-status" value={status} onChange={(e) => setStatus(e.target.value as "Active" | "Inactive")} className="mt-1 w-full rounded-btn border border-black/10 px-3 py-2 text-sm outline-none ring-primary focus:ring-2">
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>
      </SimpleDialog>
    </BOLayout>
  );
}
