FROM node:16-alpine as builder
WORKDIR /app
COPY ../frontend/package*.json ./
RUN npm install --production

COPY ../frontend/ ./
RUN npm run build

FROM nginx:1.21-alpine

RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d

COPY --from=builder /app/build /usr/share/nginx/html