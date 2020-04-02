/* eslint-disable no-shadow */
import mongoose from 'mongoose';
import bluebird from 'bluebird';
import config from './config';
import serviceLocator from '../lib/service_location';
import GatewayController from '../controllers/gateway';
import GatewayService from '../services/gatewayService';

const winston = require('winston');
require('winston-daily-rotate-file');

/**
 * Returns an instance of logger
 */
serviceLocator.register('logger', () => {

  const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.json(),
    ),

    defaultMeta: { service: 'gateway-service' },
    transports: [
      new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
      new winston.transports.File({ filename: 'logs/info.log', level: 'info' })

    ]
  })

  if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
      format: winston.format.simple(),

    }));
  }
  return logger;
});

/**
 * Returns a Mongo connection instance.
 */

serviceLocator.register('mongo', () => {
  const connectionString = config.mongoDb.url;
  mongoose.Promise = bluebird;
  const mongo = mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });
  mongo.then(() => {
    console.log('Mongo Connection Established', connectionString);
  }).catch((err) => {
    console.log('Mongo Connection disconnected');
    process.exit(1);
  });

  return mongo;
});

/**
 * Creates an instance of the gateway Service
 */
serviceLocator.register('GatewayService', (servicelocator) => {
  const logger = servicelocator.get('logger');
  const mongoclient = servicelocator.get('mongo');
  return new GatewayService(logger, mongoclient);
});


/**
 * Creates an instance of the gateway Controller
 */
serviceLocator.register('GatewayController', (servicelocator) => {
  const logger = servicelocator.get('logger');
  const GatewayService = servicelocator.get('GatewayService');
  return new GatewayController(
    logger, GatewayService
  );
});

const serviceLocate = serviceLocator;

export default serviceLocate;
