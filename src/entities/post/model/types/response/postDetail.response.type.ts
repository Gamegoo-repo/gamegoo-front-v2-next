import { paths } from "@/shared/api/schema";

export type PostDetail =
  paths["/api/v2/posts/list/{boardId}"]["get"]["responses"]["200"]["content"]["*/*"]["data"];
