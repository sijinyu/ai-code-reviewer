import { ESLint } from 'eslint';
import express, { Request, Response } from 'express';
import { OpenAI } from 'openai';
import logger from '../../utils/logger';


const router = express.Router();

type TLintRequestBody = {
  code: string;
}

const openai = new OpenAI({
  apiKey:process.env.NEXT_PUBLIC_OPENAI_API_KEY
});


router.post('/ai-review', async (req: Request<object, object, TLintRequestBody>, res: Response) => {
  try {
    const { code } = req.body;
    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'user', content: `Analyze the following code and provide a review:\n\n${code}` }],
      max_tokens: 500,
    });

    res.json({
      success: true,
      review: response.choices[0].message.content,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      logger.error(`AI Review Error: ${error.message}`);
      res.status(500).json({ success: false, error: error.message });
    } else {
      logger.error('AI Review Error: Unknown error occurred');
      res.status(500).json({ success: false, error: 'Unknown error occurred' });
    }
  }
});
      

router.post('/review', async (req: Request<object, object, TLintRequestBody>, res: Response) => {
  try {
    const { code } = req.body;
    const eslint = new ESLint();
    const results = await eslint.lintText(code);

    res.json({
      success: true,
      review: results[0].messages,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ success: false, error: error.message });
    } else {
      res.status(500).json({ success: false, error: 'Unknown error occurred' });
    }
  }
});

export default router;
