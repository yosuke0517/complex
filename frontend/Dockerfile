FROM node:alpine
WORKDIR '/app'
COPY package*.json ./
RUN yarn install
COPY . .
RUN yarn build

FROM nginx
EXPOSE 3000
# buildした成果物（/app/build）をbuilderフェーズからコンテナにコピーする
COPY ../nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=0 /app/build /usr/share/nginx/html