# Сборка backend'а

# №1 Сборка
# Родительский образ
FROM node:20-alpine as builder

# Рабочая дирректория
WORKDIR /app

# Всё, что накоплено непосильным трудом, перенести в контейнер
COPY . .

# Установить модули
RUN npm ci

# Собрать
RUN npm run build

# №2 Исполнить
# Родительский образ
FROM node:20-alpine as production

# Рабочая дирректория
WORKDIR /app

# Перенести для установки модулей
COPY --from=builder /app/package*.json ./

# Всё, что накоплено непосильным трудом, перенести в контейнер
COPY --from=builder /app/dist ./dist/
COPY --from=builder /app/public ./public

# Установить модули
RUN npm ci --omit=dev

# Назначить порт
EXPOSE 3000

# Запуск!!!
CMD ["node", "dist/main.js"]
