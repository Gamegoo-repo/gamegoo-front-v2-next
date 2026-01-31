import { useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

import { normalizeSearchParam } from "@/shared/libs/normalizeSearchParam";

import { POST_QUERYKEYS } from "@/entities/post";

const Refetch = () => {
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();

  queryClient.invalidateQueries({
    queryKey: [POST_QUERYKEYS.PostList, { page: normalizeSearchParam(searchParams.get("page")) }]
  });
};
