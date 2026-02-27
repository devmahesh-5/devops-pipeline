FROM node:18-alpine AS BASE

WORKDIR /app

RUN addgroup app && adduser -S -G app app


USER app

COPY package*.json ./

USER root

RUN chown -R app:app /app

USER app

RUN npm ci --only=production && npm cache clean --force

COPY . .

EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000/health', (res) => { process.exit(res.statusCode === 200 ? 0 : 1) }).on('error', () => { process.exit(1) })"

# Development stage:skip in production
FROM base AS development
USER root
RUN npm ci && npm cache clean --force
USER app
CMD ["npm", "run", "dev"]

# Production stage:skip in production
FROM base AS production
CMD ["npm", "start"]