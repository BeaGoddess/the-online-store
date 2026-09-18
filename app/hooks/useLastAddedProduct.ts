import { useContext } from "react";
import { LastAddedProductContext } from "~/context/LastAddedProductContext";

export const useLastAddedProduct = () => {
  const context = useContext(LastAddedProductContext);
  if (!context) {
    throw new Error(
      "useLastAddedProduct must be used within a LastAddedProductProvider",
    );
  }
  return context;
};
