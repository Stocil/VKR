import { apiRouter } from 'api/routes';
import cookieParser from 'cookie-parser';
import cors, { CorsOptions } from 'cors';
import express from 'express';

import { FRONTEND_URL, PORT } from 'constants/index';

const app = express();
const corsOptions: CorsOptions = {
  origin: [FRONTEND_URL],
  credentials: true,
};

app.use(cors(corsOptions), express.json(), cookieParser());

// Роуты
app.use('/api', apiRouter);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
