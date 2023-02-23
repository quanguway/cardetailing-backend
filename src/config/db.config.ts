export const DATA_SOURCES = {
  sqlDataSource: {
    host: process.env.DB_HOST || '127.0.0.1',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '123',
    port: process.env.DB_PORT || '3306',
    database: process.env.DB_DATABASE || 'car_detailing'
  }
};