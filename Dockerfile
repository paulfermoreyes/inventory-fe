ARG NODE_VERSION=20.11.1
ARG PNPM_VERSION=10.3.0

FROM node:${NODE_VERSION}-alpine AS base

# Install pnpm.
RUN --mount=type=cache,target=/root/.npm \
    npm install -g pnpm@${PNPM_VERSION}

WORKDIR /usr/src/app

RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=pnpm-lock.yaml,target=pnpm-lock.yaml \
    --mount=type=cache,target=/root/.local/share/pnpm/store \
    pnpm install --prod --frozen-lockfile

USER node

COPY . .

RUN pnpm build

FROM nginx:alpine

COPY --from=base /usr/src/app/dist /usr/share/nginx/html
COPY --from=base /usr/src/app/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=base /usr/src/app/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]