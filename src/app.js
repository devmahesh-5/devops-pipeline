import express from 'express';
import logger from '#config/logger.js';
import helmet from 'helmet';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import authRoutes from '#routes/auth.routes.js';
import securityMiddleware from '#middleware/security.middlewares.js';

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  morgan('combined', {
    stream: { write: message => logger.info(message.trim()) },
  })
);

app.use(securityMiddleware);

app.use(cookieParser());

app.get('/', (request, response) => {
  response.status(200).send('Hello this is Acquisitions');
});

app.get('/health', (request, response) => {
  response
    .status(200)
    .json({
      status: 'OK',
      timestamp: new Date(),
      uptime: process.uptime(),
      message: 'Api is healthy',
    });
});

app.get('/healthz', (request, response) => {
  response.status(200).send('OK');
});

app.get('/readyz', (request, response) => {
  response.status(200).send('OK');
});

app.use('/api/auth', authRoutes);

app.use((request, response) => {
  response.status(404).json({ message: 'Not found' });
});

export default app;
