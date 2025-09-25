import AppLayout from "@/components/common/AppLayout";
import { listRewards, redeemReward, getCurrentUserId } from "@/lib/localDB";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Redeem() {
  const [rewards] = useState(() => listRewards());
  const navigate = useNavigate();

  const handleRedeem = (id: string) => {
    try {
      const r = redeemReward(id);
      alert("Redeemed. ID: " + r.id);
      navigate("/profile");
    } catch (e: any) {
      alert(e.message || "Redeem failed");
    }
  };

  const user = getCurrentUserId();
  if (!user) {
    return (
      <AppLayout>
        <div className="space-y-4">
          <h1 className="text-lg font-semibold">Redeem</h1>
          <p className="text-sm text-neutral-600">
            Please sign in to redeem rewards.
          </p>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="space-y-4">
        <h1 className="text-lg font-semibold">Redeem Rewards</h1>
        <div className="space-y-3">
          {rewards.map((r) => (
            <div
              key={r.id}
              className="flex items-center justify-between rounded-md border bg-white p-3"
            >
              <div>
                <div className="font-medium">{r.title}</div>
                <div className="text-xs text-neutral-500">{r.description}</div>
              </div>
              <div className="flex items-center gap-2">
                <div className="text-sm font-semibold">{r.coins} coins</div>
                <button
                  onClick={() => handleRedeem(r.id)}
                  className="rounded-md bg-primary px-3 py-1 text-primary-foreground text-sm"
                >
                  Redeem
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
