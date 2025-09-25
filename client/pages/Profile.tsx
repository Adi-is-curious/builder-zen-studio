import AppLayout from "@/components/common/AppLayout";
import {
  getCurrentUserId,
  getUser,
  listUsers,
  listRewards,
} from "@/lib/localDB";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Profile() {
  const [currentUserId, setCurrentUserId] = useState<string | null>(
    getCurrentUserId(),
  );
  const [user, setUser] = useState(() =>
    currentUserId ? getUser(currentUserId) : undefined,
  );
  const [leaderboard, setLeaderboard] = useState(() => listUsers().slice(0, 5));
  const navigate = useNavigate();

  useEffect(() => {
    setLeaderboard(listUsers().slice(0, 5));
  }, []);

  useEffect(() => {
    setUser(currentUserId ? getUser(currentUserId) : undefined);
  }, [currentUserId]);

  if (!user) {
    return (
      <AppLayout>
        <div className="space-y-4">
          <h1 className="text-lg font-semibold">Profile</h1>
          <p className="text-sm text-neutral-600">You are not signed in.</p>
          <button
            onClick={() => navigate("/login")}
            className="rounded-md bg-primary px-4 py-2 text-primary-foreground"
          >
            Sign in
          </button>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="space-y-4">
        <div className="rounded-lg border bg-white p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-semibold">{user.name}</div>
              <div className="text-xs text-neutral-500">
                Coins: <span className="font-semibold">{user.coins}</span>
              </div>
              <div className="text-xs text-neutral-500">
                Trust: <span className="font-semibold">{user.trust}</span>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <Link
                to="/redeem"
                className="rounded-md bg-primary px-3 py-1 text-primary-foreground text-sm"
              >
                Redeem
              </Link>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-sm font-semibold mb-2">Leaderboard</h2>
          <div className="space-y-2">
            {leaderboard.map((u, idx) => (
              <div
                key={u.id}
                className="flex items-center justify-between rounded-md border bg-white p-3"
              >
                <div>
                  <div className="text-sm font-medium">
                    {idx + 1}. {u.name}
                  </div>
                  <div className="text-xs text-neutral-500">
                    Trust: {u.trust}
                  </div>
                </div>
                <div className="text-sm font-semibold">{u.coins} coins</div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-sm font-semibold mb-2">Badges & Activity</h2>
          <div className="rounded-md border bg-white p-3 text-sm text-neutral-600">
            Badges, recent validations, and redeem history will appear here.
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
