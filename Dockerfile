ARG NODE_VERSION=13

# develop stage
FROM node:${NODE_VERSION}-alpine as develop-stage
WORKDIR /app

COPY package.json yarn.lock ./
RUN set -eux; \
	yarn install

COPY . ./

VOLUME /app/node_modules
CMD ["yarn", "watch"]

# build stage
FROM develop-stage as build-stage
RUN set -eux; \
	yarn build

# production stage
FROM build-stage as production-stage
CMD ["yarn", "start"]
