# acquisitions

npm install @neondatabase/serverless drizzle-orm

# drizzle

npm install -D drizzle-kit

## Neon + Drizzle

**Neon:**It’s "Serverless Postgres." Traditional Postgres keeps a connection open 24/7, which is expensive and slow for serverless functions (like Vercel or Netlify). Neon allows you to connect via HTTP, which is much faster for cold starts.

**Drizzle:** Unlike heavier ORMs (like Prisma), Drizzle is just a thin wrapper around SQL. It gives you full type safety without the performance overhead.

## steps

1. npm run db:generate -> this generates drizzle schema / sql file with the help of config file
2. npm run db:migrate -> this creates the tables in the database
# devops-pipeline
