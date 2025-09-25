import AppLayout from "@/components/common/AppLayout";
import { listIssues, getUser } from "@/lib/localDB";
import { useState } from "react";

export default function Admin() {
  const [issues] = useState(() => listIssues());

  return (
    <AppLayout>
      <div className="space-y-4">
        <h1 className="text-lg font-semibold">Admin Dashboard</h1>
        <p className="text-sm text-neutral-600">Assign and update issue statuses. This is a minimal tablet/web admin view.</p>

        <div className="space-y-2">
          {issues.map((it) => (
            <div key={it.id} className="rounded-md border bg-white p-3">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold">{it.title}</div>
                  <div className="text-xs text-neutral-500">Reporter: {it.reporterId ? getUser(it.reporterId)?.name : 'Anonymous'}</div>
                </div>
                <div className="flex items-center gap-2">
                  <select defaultValue={it.status} className="rounded-md border p-1 text-sm">
                    <option value="pending">Pending</option>
                    <option value="inprogress">In-progress</option>
                    <option value="resolved">Resolved</option>
                  </select>
                  <button className="rounded-md bg-primary px-3 py-1 text-primary-foreground">Save</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
