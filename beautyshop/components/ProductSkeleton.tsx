export default function ProductSkeleton({ count = 8 }: { count?: number }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="bg-white dark:bg-[#1e0d16] rounded-3xl overflow-hidden border border-pink-100 dark:border-rose-900/30"
        >
          <div className="skeleton aspect-square" />
          <div className="p-4 space-y-3">
            <div className="skeleton h-3 w-16 rounded-full" />
            <div className="skeleton h-4 w-full rounded-full" />
            <div className="skeleton h-4 w-3/4 rounded-full" />
            <div className="skeleton h-5 w-24 rounded-full" />
          </div>
        </div>
      ))}
    </>
  );
}
