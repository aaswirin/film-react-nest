# Сборка fronend'а

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

# Всё, что накоплено непосильным трудом, перенести в контейнер
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist/

# Установить модули
RUN npm ci

# Запуск!!!
CMD ["npm", "run", "dev"]
