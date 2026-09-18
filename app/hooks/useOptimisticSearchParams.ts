import { useNavigation, useSearchParams } from "react-router";

export const useOptimisticSearchParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigation = useNavigation();

  const pendingSearchParams = navigation.location
    ? new URLSearchParams(navigation.location.search)
    : null;

  return [pendingSearchParams ?? searchParams, setSearchParams] as const;
};
