import createClient from "openapi-fetch";
import type { paths } from "./schema";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
if (!API_BASE_URL) throw new Error("NEXT_PUBLIC_API_BASE_URL is missing");

export const serverSideOpenapiClient = createClient<paths>({
  baseUrl: API_BASE_URL,
});