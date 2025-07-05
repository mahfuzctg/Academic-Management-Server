import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import globalErrorHandler from './app/middlewares/globalErrorhandler';
import notFound from './app/middlewares/notFound';
import router from './app/routes';

const app: Application = express();

// CORS setup - must come before routes
app.use(
  cors({
    origin: [
      'http://localhost:5173',
      'https://academic-management-client-ten.vercel.app',
    ],
    // origin: 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }),
);

// Preflight support
app.options('*', cors());

// Body parsers
app.use(express.json());
app.use(cookieParser());

// Main routes
app.use('/api/v1', router);

// Default route
app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to Academic Managements!');
});

// Error handling
app.use(globalErrorHandler);
app.use(notFound);

export default app;
