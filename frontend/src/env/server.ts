import { z } from "zod";

const serverEnvSchema = z.object({
  NEXT_PUBLIC_STRAPI_URL: z.string().min(1),
});

export const env = serverEnvSchema.parse(process.env);
