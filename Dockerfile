FROM node:18-alpine AS base

FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
RUN yarn --frozen-lockfile

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ARG NODE_ENV
ARG NEXT_PUBLIC_APP_API_SERVER_URL
ARG NEXT_PUBLIC_APP_CALLBACK_URL
ARG NEXT_PUBLIC_APP_WS_SERVER_URL
ARG NEXT_PUBLIC_APP_WS_SERVER_URL
ARG NEXT_PUBLIC_INTERCOM_ID

ENV NEXT_TELEMETRY_DISABLED 1
ENV NODE_ENV=$NODE_ENV
ENV NEXT_PUBLIC_APP_API_SERVER_URL=$NEXT_PUBLIC_APP_API_SERVER_URL
ENV NEXT_PUBLIC_APP_CALLBACK_URL=$NEXT_PUBLIC_APP_CALLBACK_URL
ENV NEXT_PUBLIC_APP_WS_SERVER_URL=$NEXT_PUBLIC_APP_WS_SERVER_URL
ENV NEXT_PUBLIC_INTERCOM_ID=$NEXT_PUBLIC_INTERCOM_ID

RUN echo "NODE_ENV=$NODE_ENV"; \
  echo "NEXT_PUBLIC_APP_API_SERVER_URL=$NEXT_PUBLIC_APP_API_SERVER_URL"; \
  echo "NEXT_PUBLIC_APP_CALLBACK_URL=$NEXT_PUBLIC_APP_CALLBACK_URL"; \
  echo "NEXT_PUBLIC_APP_WS_SERVER_URL=$NEXT_PUBLIC_APP_WS_SERVER_URL"; \
  echo "NEXT_PUBLIC_INTERCOM_ID=$NEXT_PUBLIC_INTERCOM_ID"; \
  sleep 10;

RUN yarn install
RUN NODE_ENV=production yarn build

FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

COPY --from=builder /app/public ./public

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]
