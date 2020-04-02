import dotenv from 'dotenv';

dotenv.config();

const appName = 'GATEWAY_SERVICE';

const config = {
  appName,
  server: {
    port: process.env.APP_PORT
  },
  mongoDb: {
    url: process.env.MONGO_DB_URL
  }
}

export default config;
