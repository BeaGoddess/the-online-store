import { X } from "lucide-react";
import { useSearchParams } from "react-router";
import { Button } from "~/components/Button";

export const ActiveSearch = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get("q") || "";

  const handleRemoveSearch = () => {
    searchParams.delete("q");
    searchParams.delete("page");
    setSearchParams(searchParams);
  };

  if (!searchQuery) return null;

  return (
    <div className="flex flex-row items-center gap-2">
      <span className="text-sm text-gray-400">Results for</span>
      <span className="bg-primary/5 text-primary flex items-center gap-1.5 rounded-full px-3 py-1 text-sm">
        &quot;{searchQuery}&quot;
        <Button
          variant="unstyled"
          onClick={handleRemoveSearch}
          className="hover:text-primary/50 cursor-pointer"
        >
          <X className="size-3.5" />
        </Button>
      </span>
    </div>
  );
};
