# Build
FROM node:22-alpine as build

ENV NODE_ENV=development

WORKDIR /app

COPY ./package.json ./package-lock.json ./
RUN npm ci
COPY ./tsconfig.json ./tsconfig.build.json ./
COPY ./src ./src

RUN npm run tsc

# Runtime
FROM node:22-alpine

ENV NODE_ENV=production

WORKDIR /app
RUN chown -R node:node /app
USER node

COPY --chown=node:node --from=build /app/dist ./
COPY --chown=node:node ./package.json ./package-lock.json ./

RUN npm ci --omit=dev

CMD ["node", "/app/index.js"]
