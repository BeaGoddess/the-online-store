import { useEffect, useRef, useState } from "react";
import { Search, X } from "lucide-react";
import { cn } from "~/lib/utils";
import { Link, useFetcher, useNavigate } from "react-router";
import type { loader } from "~/routes/search-preview";
import { Overlay } from "~/components/Overlay";
import { Input } from "~/components/Input";
import {
  SearchProductSkeleton,
  SearchProduct,
} from "~/components/SearchOverlay";
import { Button } from "../Button";

export const SearchOverlay = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const fetcher = useFetcher<typeof loader>();
  const inputRef = useRef<HTMLInputElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const { query, error, productsData } = fetcher.data ?? {};
  const { products } = productsData ?? {};
  const isLoading = fetcher.state === "loading";
  const showNoResults = !isLoading && products?.length === 0;
  const showAllResults = products && products?.length > 0 && !isLoading;
  const showError = !isLoading && error;

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      inputRef.current?.focus();
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const toggleButton = () => {
    setIsOpen(!isOpen);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const resetSearchInput = () => {
    if (isOpen || !inputRef.current) return;
    inputRef.current.value = "";
    fetcher.reset();
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      fetcher.submit(e.target.form);
    }, 400);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    navigate(`/?q=${encodeURIComponent(inputRef.current?.value ?? "")}`);
    handleClose();
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <>
      {/* Trigger Button to open the search products */}
      <Button
        variant="unstyled"
        onClick={toggleButton}
        className="hover:text-primary/70 cursor-pointer transition-colors duration-300"
      >
        <Search className="size-6" strokeWidth={1.5} />
      </Button>
      {/* Search Products */}
      <div
        className={cn(
          "absolute top-0 right-0 z-20 w-full bg-white transition-all duration-400",
          !isOpen && "pointer-events-none -translate-y-full",
          isOpen && "translate-y-0",
        )}
        onTransitionEnd={resetSearchInput}
      >
        <div className="container mx-auto flex flex-col justify-center gap-5 p-6 md:px-12 md:py-10">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Search for products</h2>
            <X className="size-6 cursor-pointer" onClick={handleClose} />
          </div>
          <fetcher.Form
            className="relative inline-block w-full"
            method="GET"
            action="/search-preview"
            onSubmit={onSubmit}
          >
            <Input
              ref={inputRef}
              placeholder="Search..."
              name="q"
              className="pr-9"
              onChange={onChange}
            />
            <Search className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-gray-400" />
          </fetcher.Form>
          {query && query.length > 0 && (
            <>
              {showError ? (
                <p className="text-sm text-red-500">{error}</p>
              ) : isLoading || (products && products?.length > 0) ? (
                <div className="flex flex-row gap-4 overflow-x-auto">
                  {isLoading
                    ? new Array(5)
                        .fill(0)
                        .map((_, index) => (
                          <SearchProductSkeleton key={index} />
                        ))
                    : products?.map((product) => (
                        <SearchProduct
                          key={product.id}
                          product={product}
                          handleClose={handleClose}
                        />
                      ))}
                </div>
              ) : showNoResults ? (
                <p className="text-sm text-gray-400">No products found</p>
              ) : null}

              {showAllResults && (
                <div className="flex w-full flex-row justify-end">
                  <Link
                    to={`/?q=${encodeURIComponent(fetcher.data?.query ?? "")}`}
                    className="hover:text-primary/40 transition-colors duration-300"
                    onClick={handleClose}
                  >
                    See all results
                  </Link>
                </div>
              )}
            </>
          )}
        </div>
      </div>
      <Overlay
        isOpen={isOpen}
        onClose={handleClose}
        className="absolute top-0 right-0 w-full"
      />
    </>
  );
};
