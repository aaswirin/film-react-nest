/**
 * Настройки приложения
 */

export const appConfig = process.env;

// Тип базы данных
const driver: string = appConfig.DATABASE_DRIVER;

// URL к базе данных
let url: string;

switch (driver) {
  case 'mongodb':
    url = appConfig.DATABASE_MONGO_URL;
    break;
  case 'postgres':
    url = appConfig.DATABASE_POSRGRES_URL;
    break;
  default:
    url = '';
}

export default () => ({
  database: {
    // Тип базы данных
    driver: driver,
    // URL к базе данных
    url: url,
    // Имя пользователя
    username: appConfig.DATABASE_USERNAME,
    // Пароль пользователя
    password: appConfig.DATABASE_PASSWORD,
    // Имя базы данных
    databaseName: appConfig.DATABASE_NAME,
    // Количество дней до зачистки заказов
    daysToDeleteOrders: appConfig.DATABASE_DAYS_TO_DELETE_ORDER,
  },
  debug: appConfig.DEBUG,
});
