import AWS from 'aws-sdk';
import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import hpp from 'hpp';
import cors from 'cors';

import errorHandler from './middleware/error';

import { BASE_ROUTE } from './routes';
//dotenv.config({ path: './config/config.env' });
dotenv.config({ path: path.join(__dirname, 'config', 'config.env') });

// configure AWS
AWS.config.loadFromPath(path.join(__dirname, 'config', 'config.json'));

import image from './routes/image';

export const s3bucket = new AWS.S3();
// app
const app = express();

// Cookie parser
app.use(cookieParser());

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(function (req, res, next) {
  console.log('Requested path: %s', req.path);
  next();
});

// Set security headers
app.use(helmet());

// Body parser
app.use(express.json());

// Express body parser
app.use(express.urlencoded({ extended: true }));
// Rate limiting
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 mins
  max: 100,
});

//app.use(limiter);
// Prevent http param pollution
app.use(hpp());

// Enable CORS
app.use(cors());
// Set static folder
//app.use(express.static(path.join(__dirname, "public")));

//routes
app.use(`${BASE_ROUTE}/image`, image);
app.use(errorHandler);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('dist/build'));
  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'dist', 'build', 'index.html'))
  );
}

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err: Error, promise) => {
  console.log(`Error: ${err.message}`);
  // Close server & exit process
  // server.close(() => process.exit(1));
});
