import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./drizzle/schema.ts",
  out: "./drizzle/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.NODE_ENV,
  },
  // prints all statements that will be executed: https://orm.drizzle.team/kit-docs/config-reference#verbose
  // verbose: true,
  // always ask for your confirmation to execute statements: https://orm.drizzle.team/kit-docs/config-reference#strict
  // strict: true,
});
