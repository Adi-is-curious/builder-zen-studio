import AppLayout from "@/components/common/AppLayout";
import { addSurvey, listSurveys } from "@/lib/localDB";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Survey() {
  const [category, setCategory] = useState("general");
  const [rating, setRating] = useState(5);
  const [feedback, setFeedback] = useState("");
  const navigate = useNavigate();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      addSurvey(category, rating, feedback || undefined);
      alert("Survey submitted. Thank you.");
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Failed to submit survey");
    }
  };

  const surveys = listSurveys();

  return (
    <AppLayout>
      <div className="space-y-4">
        <h1 className="text-lg font-semibold">Community Survey</h1>
        <form onSubmit={submit} className="space-y-3">
          <div>
            <label className="text-xs font-medium">Category</label>
            <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full rounded-md border p-2">
              <option value="general">General</option>
              <option value="sanitation">Sanitation</option>
              <option value="roads">Roads</option>
              <option value="lighting">Lighting</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-medium">Rating</label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((r) => (
                <button key={r} type="button" onClick={() => setRating(r)} className={`rounded-md px-3 py-1 ${rating === r ? 'bg-primary text-primary-foreground' : 'border'}`}>
                  {r}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs font-medium">Feedback (optional)</label>
            <textarea value={feedback} onChange={(e) => setFeedback(e.target.value)} className="w-full rounded-md border p-2" rows={3} />
          </div>

          <div className="flex items-center gap-2">
            <button className="rounded-md bg-primary px-4 py-2 text-primary-foreground">Submit</button>
            <button type="button" className="rounded-md border px-4 py-2" onClick={() => navigate(-1)}>Cancel</button>
          </div>
        </form>

        <div>
          <h2 className="text-sm font-semibold">Recent submissions</h2>
          <div className="space-y-2 mt-2">
            {surveys.slice(0,5).map(s => (
              <div key={s.id} className="rounded-md border bg-white p-3">
                <div className="text-sm font-medium">{s.category} — {s.rating} ⭐</div>
                {s.feedback ? <div className="text-xs text-neutral-500 mt-1">{s.feedback}</div> : null}
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
