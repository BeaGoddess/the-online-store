export const SearchProductSkeleton = () => {
  return (
    <div className="flex w-30 shrink-0 flex-col gap-1">
      <div className="bg-primary/10 aspect-square shrink-0 animate-pulse" />
      <div className="bg-primary/10 h-4 w-full animate-pulse" />
      <div className="bg-primary/10 h-4 w-full animate-pulse" />
    </div>
  );
};
