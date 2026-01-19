import { paths } from "@/shared/api/schema";

export type Post = paths["/api/v2/posts/list"]["get"]["responses"]["200"]["content"]["*/*"]["data"];
