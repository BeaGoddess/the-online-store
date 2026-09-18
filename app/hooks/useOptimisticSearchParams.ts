import { useLocation, useNavigation, useSearchParams } from "react-router";

export const useOptimisticSearchParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigation = useNavigation();

  const location = useLocation();
  const pendingSearchParams = navigation.location
    ? new URLSearchParams(navigation.location.search)
    : null;

  const currentSearchParams =
    location.pathname !== navigation.location?.pathname
      ? searchParams
      : (pendingSearchParams ?? searchParams);

  return [currentSearchParams, setSearchParams] as const;
};
