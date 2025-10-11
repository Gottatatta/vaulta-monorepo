import 'dotenv/config';
import './configs/passportJwt.config';
import express, { Request, Response } from 'express';
import helmet from 'helmet';
import cors, { CorsOptions } from 'cors';
import passport from 'passport';

import { Env } from './configs/env.config';
import { HttpStatus } from './configs/http.config';
import { connectDatabase, disconnectDatabase } from './configs/db.config';
import { logTail } from './configs/logtail.config';

import { UnauthorizedException } from './utils/exceptions.utils';
import { asyncHandler } from './middlewares/asyncHandler.middleware';
import { errorHandler } from './middlewares/errorHandler.middleware';
import { logger } from './utils/logger.utils';
import internalRoutes from './routes/internal';
import publicRoutes from './routes/public';

const app = express();

const allowedOrigins = Env.ALLOWED_ORIGINS?.split(',');

const corsOptions: CorsOptions = {
  credentials: true,
  origin(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      const errorMsg = `CORS error: Origin ${origin} is not allowed`;
      callback(new UnauthorizedException(errorMsg), false);
    }
  },
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(helmet());
app.use(passport.initialize());

app.get(
  '/',
  asyncHandler(async (req: Request, res: Response) => {
    res.status(HttpStatus.OK).json({
      message: 'API is running...',
    });
  }),
);

app.use(`${Env.BASE_PATH}`, internalRoutes);
app.use(publicRoutes);

app.use(errorHandler);

async function startServer() {
  try {
    await connectDatabase();
    const server = app.listen(Env.PORT, () => {
      logger.info(`Server listening on port ${Env.PORT} in ${Env.NODE_ENV} mode`);
    });

    const shutdownSignals = ['SIGTERM', 'SIGINT'];

    shutdownSignals.forEach((signal) => {
      process.on(signal, async () => {
        logger.warn(`${signal} recieved: shutting down gracefully`);

        try {
          server.close(() => {
            logger.warn('HTTP server closed');
          });

          await disconnectDatabase();

          await logTail.flush();

          process.exit(0);
        } catch (error) {
          logger.error(`Error occured during shutting down`, error);
          process.exit(1);
        }
      });
    });
  } catch (error) {
    logger.error(`Failed to start server`, error);
    process.exit(1);
  }
}

startServer();
