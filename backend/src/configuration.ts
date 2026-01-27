/**
 * Настройки приложения
 */

export const appConfig = process.env;

export default () => ({
  database: {
    // Тип базы данных
    driver: appConfig.DATABASE_DRIVER,
    // URL к базе данных
    url: appConfig.DATABASE_URL,
    // Имя базы данных
    databaseName: appConfig.DATABASE_NAME,
    // порт базы данных
    port: appConfig.DATABASE_PORT || '',
    // Имя пользователя
    username: appConfig.DATABASE_USERNAME || '',
    // Пароль пользователя
    password: appConfig.DATABASE_PASSWORD || '',
    // Количество дней до зачистки заказов
    daysToDeleteOrders: appConfig.DATABASE_DAYS_TO_DELETE_ORDER || 365,
  },
  debug: appConfig.DEBUG,
});
