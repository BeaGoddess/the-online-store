import { useEffect, useRef, useState } from "react";
import { useLastAddedProduct } from "~/hooks/useLastAddedProduct";
import type { CartItem } from "~/types/cart";
import { cn } from "~/lib/utils";
import { Link } from "react-router";
import { CART_TOAST_DURATION_MS } from "~/constants/cart";

interface AddedToCartToastProps {
  cartItem: CartItem;
}

export const AddedToCartToast = ({ cartItem }: AddedToCartToastProps) => {
  const [isClosing, setIsClosing] = useState(false);
  const { hideLastAddedProduct } = useLastAddedProduct();
  const containerRef = useRef<HTMLAnchorElement>(null);

  const handleClose = () => {
    setIsClosing(true);
  };

  const handleAnimationEnd = () => {
    if (isClosing) hideLastAddedProduct();
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      handleClose();
    }, CART_TOAST_DURATION_MS);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        handleClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (!cartItem) return null;

  return (
    <Link
      ref={containerRef}
      to="/cart"
      className={cn(
        "border-primary fixed top-15.5 right-0 z-20 flex w-full items-start gap-3 rounded border bg-white p-2 shadow-2xl md:absolute md:top-8 md:min-w-100",
        isClosing ? "animate-fade-out" : "animate-fade-in",
      )}
      onClick={handleClose}
      onAnimationEnd={handleAnimationEnd}
    >
      <img
        src={cartItem.image}
        alt={cartItem.title}
        className="bg-primary/10 size-10 rounded object-cover"
      />
      <div>
        <p>
          <span className="font-bold">{cartItem.title}</span> added to your cart
        </p>
        <p className="font-ubuntu">${cartItem.price.toFixed(2)}</p>
      </div>
    </Link>
  );
};
