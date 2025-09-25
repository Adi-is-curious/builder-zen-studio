export type User = {
  id: string;
  name?: string;
  phone?: string;
  email?: string;
  coins: number;
  trust: number;
  isAdmin?: boolean;
};

export type Issue = {
  id: string;
  title?: string;
  description?: string;
  category: string;
  area?: string;
  location?: { lat: number; lng: number } | null;
  photo?: string | null;
  urgent?: boolean;
  anonymous?: boolean;
  status: "pending" | "inprogress" | "resolved";
  reporterId?: string | null;
  upvotes: string[]; // user ids
  comments: {
    id: string;
    userId: string | null;
    text: string;
    createdAt: number;
  }[];
  createdAt: number;
};

export type Survey = {
  id: string;
  userId: string | null;
  category: string;
  rating: number; // 1-5
  feedback?: string;
  createdAt: number;
};

export type Achievement = {
  id: string;
  title: string;
  desc?: string;
  impact?: string;
  createdAt: number;
};

const STORAGE_KEY = "civicconnect:db";

type DB = {
  users: User[];
  issues: Issue[];
  redemptions: { id: string; userId: string; rewardId: string; date: number }[];
  rewards: { id: string; title: string; coins: number; description?: string }[];
  surveys: Survey[];
  achievements: Achievement[];
};

function readDB(): DB {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return seed();
    return JSON.parse(raw) as DB;
  } catch (e) {
    console.error("localDB read error", e);
    return seed();
  }
}

function writeDB(db: DB) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(db));
    // notify other windows
    window.dispatchEvent(new Event("storage"));
  } catch (e) {
    console.error("localDB write error", e);
  }
}

function seed(): DB {
  const db: DB = {
    users: [
      { id: "user:1", name: "Guest User", phone: "", coins: 10, trust: 1 },
      {
        id: "admin:1",
        name: "Admin",
        email: "admin@gov.jh",
        coins: 0,
        trust: 10,
        isAdmin: true,
      },
    ],
    issues: [
      {
        id: "issue:1",
        title: "Pothole near market",
        description: "Large pothole causing trouble",
        category: "pothole",
        area: "Ranchi",
        location: { lat: 23.35, lng: 85.33 },
        photo: null,
        urgent: false,
        anonymous: false,
        status: "pending",
        reporterId: "user:1",
        upvotes: [],
        comments: [],
        createdAt: Date.now() - 1000 * 60 * 60 * 24,
      },
    ],
    redemptions: [],
    rewards: [
      {
        id: "reward:1",
        title: "Museum Pass",
        coins: 50,
        description: "One-time museum entry",
      },
      {
        id: "reward:2",
        title: "E-Certificate",
        coins: 20,
        description: "Aware Citizen Certificate",
      },
      {
        id: "reward:3",
        title: "Bus Pass (1 day)",
        coins: 100,
        description: "Local public transport pass",
      },
    ],
    surveys: [
      {
        id: "s:1",
        userId: "user:1",
        category: "general",
        rating: 4,
        feedback: "Good response time",
        createdAt: Date.now() - 1000 * 60 * 60 * 24,
      },
    ],
    achievements: [
      {
        id: "a:1",
        title: "Road Fixed in Kanke",
        desc: "Local community validated a repair near Kanke market.",
        impact: "Reduced travel time by 20%",
        createdAt: Date.now() - 1000 * 60 * 60 * 24 * 7,
      },
      {
        id: "a:2",
        title: "Streetlights Restored",
        desc: "Citizens reported multiple faulty lights; repairs completed.",
        impact: "Improved safety at night",
        createdAt: Date.now() - 1000 * 60 * 60 * 24 * 5,
      },
    ],
  };
  writeDB(db);
  return db;
}

export function getCurrentUserId(): string | null {
  return localStorage.getItem("civicconnect:currentUser") || null;
}

export function setCurrentUserId(id: string | null) {
  if (id) localStorage.setItem("civicconnect:currentUser", id);
  else localStorage.removeItem("civicconnect:currentUser");
}

export function listIssues(): Issue[] {
  return readDB().issues.sort((a, b) => b.createdAt - a.createdAt);
}

export function addIssue(issue: Partial<Issue> & { category: string }) {
  const db = readDB();
  const id = `issue:${Date.now()}`;
  const reporterId = getCurrentUserId();
  const newIssue: Issue = {
    id,
    title: issue.title ?? issue.category,
    description: issue.description ?? "",
    category: issue.category,
    area: issue.area ?? "",
    location: issue.location ?? null,
    photo: issue.photo ?? null,
    urgent: issue.urgent ?? false,
    anonymous: issue.anonymous ?? false,
    status: "pending",
    reporterId: issue.anonymous ? null : reporterId,
    upvotes: [],
    comments: [],
    createdAt: Date.now(),
  };
  db.issues.push(newIssue);
  writeDB(db);
  return newIssue;
}

export function toggleUpvote(issueId: string) {
  const db = readDB();
  const userId = getCurrentUserId();
  const issue = db.issues.find((i) => i.id === issueId);
  if (!issue || !userId) return issue;
  const ix = issue.upvotes.indexOf(userId);
  if (ix === -1) issue.upvotes.push(userId);
  else issue.upvotes.splice(ix, 1);
  writeDB(db);
  return issue;
}

export function addComment(issueId: string, text: string) {
  const db = readDB();
  const userId = getCurrentUserId();
  const issue = db.issues.find((i) => i.id === issueId);
  if (!issue) return null;
  const comment = {
    id: `c:${Date.now()}`,
    userId: userId ?? null,
    text,
    createdAt: Date.now(),
  };
  issue.comments.push(comment);
  writeDB(db);
  return comment;
}

export function listUsers(): User[] {
  return readDB()
    .users.slice()
    .sort((a, b) => b.coins - a.coins);
}

export function getUser(id: string): User | undefined {
  return readDB().users.find((u) => u.id === id);
}

export function loginWithPhone(phone: string, name?: string) {
  const db = readDB();
  let user = db.users.find((u) => u.phone === phone);
  if (!user) {
    user = {
      id: `user:${Date.now()}`,
      name: name ?? `User ${phone}`,
      phone,
      coins: 0,
      trust: 1,
    };
    db.users.push(user);
    writeDB(db);
  }
  setCurrentUserId(user.id);
  return user;
}

export function logout() {
  setCurrentUserId(null);
}

export function listRewards() {
  return readDB().rewards.slice();
}

export function redeemReward(rewardId: string) {
  const db = readDB();
  const userId = getCurrentUserId();
  if (!userId) throw new Error("Not logged in");
  const reward = db.rewards.find((r) => r.id === rewardId);
  const user = db.users.find((u) => u.id === userId);
  if (!reward || !user) throw new Error("Invalid reward or user");
  if (user.coins < reward.coins) throw new Error("Insufficient coins");
  user.coins -= reward.coins;
  const redemption = {
    id: `red:${Date.now()}`,
    userId,
    rewardId,
    date: Date.now(),
  };
  db.redemptions.push(redemption);
  writeDB(db);
  // notify coins change
  window.dispatchEvent(
    new CustomEvent("coins-earned", {
      detail: { userId, amount: -reward.coins },
    }),
  );
  return redemption;
}

export function addSurvey(category: string, rating: number, feedback?: string) {
  const db = readDB();
  const id = `s:${Date.now()}`;
  const userId = getCurrentUserId();
  const s: Survey = {
    id,
    userId,
    category,
    rating,
    feedback,
    createdAt: Date.now(),
  };
  db.surveys.push(s);

  // Simple rule: high-rated surveys create a small achievement entry
  if (rating >= 5) {
    const ach: Achievement = {
      id: `ach:${Date.now()}`,
      title: `Community feedback: ${category}`,
      desc: feedback ?? "",
      impact: `Positive feedback received` as any,
      createdAt: Date.now(),
    };
    db.achievements.push(ach);
  }

  writeDB(db);
  return s;
}

export function listSurveys(): Survey[] {
  return readDB()
    .surveys.slice()
    .sort((a, b) => b.createdAt - a.createdAt);
}

export function listAchievements(): Achievement[] {
  return readDB()
    .achievements.slice()
    .sort((a, b) => b.createdAt - a.createdAt);
}

export function listRewardsAndInventory() {
  return readDB().rewards.slice();
}

export function redeemHistoryFor(userId: string) {
  const db = readDB();
  return db.redemptions.filter((r) => r.userId === userId);
}

export function redeemableRewards() {
  return readDB().rewards.slice();
}

export function redeemForUser(userId: string, rewardId: string) {
  // wrapper
  setCurrentUserId(userId);
  return redeemReward(rewardId);
}

export function awardCoins(userId: string, amount: number) {
  const db = readDB();
  const user = db.users.find((u) => u.id === userId);
  if (!user) return null;
  user.coins += amount;
  writeDB(db);
  // dispatch event for UI gamification
  window.dispatchEvent(
    new CustomEvent("coins-earned", { detail: { userId, amount } }),
  );
  return user;
}
