import { cn } from "~/lib/utils";
import { useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { Button } from "~/components/Button";

interface ProductImageSliderProps {
  images: string[];
  alt: string;
}

export const ProductImageSlider = ({
  images,
  alt,
}: ProductImageSliderProps) => {
  const slides =
    images.length > 1
      ? [images[images.length - 1], ...images, images[0]]
      : images;
  const [currentIndex, setCurrentIndex] = useState(images.length > 1 ? 1 : 0);
  const [withTransition, setWithTransition] = useState(true);

  // This is used to prevent the user from clicking on the slider while it is transitioning
  const [isTransitioning, setIsTransitioning] = useState(false);

  const goTo = (index: number) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setWithTransition(true);
    setCurrentIndex(index);
  };

  const handlePrevious = () => goTo(currentIndex - 1);
  const handleNext = () => goTo(currentIndex + 1);
  const handleBubbleClick = (index: number) => () => {
    goTo(index);
  };

  const handleTransitionEnd = () => {
    if (currentIndex === 0 && images) {
      // If goes back to the first image, go to the last image (without animation) to reset the slider
      setWithTransition(false);
      setCurrentIndex(images.length);
    } else if (currentIndex === slides.length - 1) {
      // If is the end of the slides, go to the first image (without animation) to reset the slider
      setWithTransition(false);
      setCurrentIndex(1);
    }
    setIsTransitioning(false);
  };

  const activeDotIndex = (currentIndex - 1 + images.length) % images.length;

  if (!images || images.length === 0) return null;

  return (
    <div className="bg-primary/10 relative w-full overflow-hidden">
      <div
        className={cn(
          "flex",
          withTransition && "transition-transform duration-400 ease-in-out",
        )}
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        onTransitionEnd={handleTransitionEnd}
      >
        {slides.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={alt}
            className="h-full max-h-135.5 w-full shrink-0 object-contain p-10 md:px-0 md:py-10"
          />
        ))}
      </div>
      {images.length > 1 && (
        <>
          <div className="absolute top-1/2 right-0 left-0 mx-1 flex -translate-y-1/2 items-center justify-between md:mx-6">
            <Button
              variant="unstyled"
              onClick={handlePrevious}
              className="text-primary hover:text-primary/50 cursor-pointer transition-all duration-300"
            >
              <ChevronLeftIcon className="size-6" />
            </Button>
            <Button
              variant="unstyled"
              onClick={handleNext}
              className="text-primary hover:text-primary/50 cursor-pointer transition-all duration-300"
            >
              <ChevronRightIcon className="size-6" />
            </Button>
          </div>
          <div className="absolute right-0 bottom-6 left-0 flex items-center justify-center gap-2">
            {images.map((_, index) => (
              <Button
                key={index}
                variant="unstyled"
                onClick={handleBubbleClick(index + 1)}
                className={cn(
                  "h-2 rounded-full transition-all duration-500",
                  index === activeDotIndex
                    ? "bg-primary w-4"
                    : "bg-primary/20 w-2",
                )}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};
