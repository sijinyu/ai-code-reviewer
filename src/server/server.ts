import express from 'express';
import next from 'next';
import { requestLimit } from './middleware/requestLimit';
import aiReviewRouter from './routes/aiReview';


const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const PORT = process.env.PORT || 5000;

app.prepare().then(() => {
  const server = express();

  server.get('/api/test', (req, res) => {
    res.json({ message: 'Hello from Express API!' });
  });


  server.all('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(PORT, (err?: unknown) => {
    if (err) throw err;
    console.log(`Server is running on http://localhost:${PORT}`);
  });


  // server.use(authenticateJWT);
  server.use(express.json());  
  server.use('/api/review/lint', aiReviewRouter);
  server.use('/api/review/ai-review', requestLimit, aiReviewRouter);
});
