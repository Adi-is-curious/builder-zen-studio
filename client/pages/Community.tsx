import AppLayout from "@/components/common/AppLayout";

export default function Community() {
  return (
    <AppLayout>
      <div className="space-y-3">
        <h1 className="text-lg font-semibold">Community</h1>
        <p className="text-sm text-neutral-600 dark:text-neutral-300">
          This screen will show active cases for upvote and comments, plus
          transparency stats. Ask to generate this page next.
        </p>
      </div>
    </AppLayout>
  );
}
