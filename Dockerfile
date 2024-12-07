FROM node:latest AS builder
WORKDIR /app
COPY package.json yarn.lock .yarnrc.yaml ./
RUN corepack enable && corepack prepare yarn@4.4.0 --activate
RUN yarn config set nodeLinker node-modules
RUN yarn install
COPY . .
RUN yarn build

FROM nginx:latest
RUN rm /usr/share/nginx/html/*
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 8081
CMD ["nginx", "-g", "daemon off;"]