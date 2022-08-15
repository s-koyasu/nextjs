FROM node:16-alpine

WORKDIR /app

# 依存パッケージインストール
COPY ./blog/package.json ./
RUN npm install
# アプリケーションコード全体をコピー
COPY . .
# 3000ポートを公開
EXPOSE 3000