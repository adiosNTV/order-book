FROM node:20-alpine as builder
WORKDIR /app
COPY package.json ./
RUN yarn install --frozen-lockfile
COPY . .
RUN yarn build
FROM node:20-alpine as runner
WORKDIR /app
COPY --from=builder /app/package.json .
COPY --from=builder /app/next.config.mjs ./
COPY --from=builder /app/public ./
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
EXPOSE 4000
ENV PORT 4000
ENTRYPOINT [ "node","server.js" ]
