import AppLayout from "@/components/common/AppLayout";

export default function Profile() {
  return (
    <AppLayout>
      <div className="space-y-3">
        <h1 className="text-lg font-semibold">Profile</h1>
        <p className="text-sm text-neutral-600 dark:text-neutral-300">
          This screen will show coins, trust score, language preference, and
          settings. Ask to generate this page next.
        </p>
      </div>
    </AppLayout>
  );
}
