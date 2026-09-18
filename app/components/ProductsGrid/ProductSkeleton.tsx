export const ProductSkeleton = () => {
  return (
    <li className="flex flex-col gap-3">
      <div className="bg-primary/10 aspect-square w-full shrink-0 animate-pulse" />
      <div className="flex flex-col gap-2">
        <div className="bg-primary/10 h-5 w-3/4 animate-pulse" />
        <div className="bg-primary/10 h-5 w-1/4 animate-pulse" />
      </div>
    </li>
  );
};
