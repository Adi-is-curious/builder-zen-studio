import AppLayout from "@/components/common/AppLayout";
import { listIssues, toggleUpvote, addComment, getCurrentUserId } from "@/lib/localDB";
import { useEffect, useState } from "react";

export default function Community() {
  const [issues, setIssues] = useState(() => listIssues());
  useEffect(() => {
    const handler = () => setIssues(listIssues());
    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  }, []);

  const refresh = () => setIssues(listIssues());

  const handleUpvote = (id: string) => {
    toggleUpvote(id);
    refresh();
  };

  const handleComment = (id: string) => {
    const text = prompt("Add comment");
    if (!text) return;
    addComment(id, text);
    refresh();
  };

  const uid = getCurrentUserId();

  return (
    <AppLayout>
      <div className="space-y-3">
        <header className="flex items-center justify-between">
          <h1 className="text-lg font-semibold">Community</h1>
          <div className="text-xs text-neutral-500">Active cases, upvotes and comments</div>
        </header>

        <div className="space-y-2">
          {issues.map((it) => (
            <div key={it.id} className="rounded-lg border bg-white p-3 shadow-sm">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div className="font-semibold text-sm">{it.title}</div>
                    <div className="text-[11px] text-neutral-500">{new Date(it.createdAt).toLocaleDateString()}</div>
                  </div>
                  <div className="mt-1 text-xs text-neutral-600">{it.description}</div>
                  <div className="mt-2 flex items-center gap-2 text-xs text-neutral-500">{it.category} • {it.area}</div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <button onClick={() => handleUpvote(it.id)} className={`rounded-md px-3 py-1 text-xs ${it.upvotes.includes(uid || "") ? "bg-primary text-primary-foreground" : "border"}`}>
                    ↑ {it.upvotes.length}
                  </button>
                  <button onClick={() => handleComment(it.id)} className="rounded-md border px-3 py-1 text-xs">💬 {it.comments.length}</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
