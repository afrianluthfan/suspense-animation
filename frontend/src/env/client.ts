import { z } from "zod";

const clientEnvSchema = z.object({
  NEXT_PUBLIC_STRAPI_URL: z.string().min(1),
});

export const env = clientEnvSchema.parse({
  NEXT_PUBLIC_STRAPI_URL: process.env.NEXT_PUBLIC_STRAPI_URL,
});
