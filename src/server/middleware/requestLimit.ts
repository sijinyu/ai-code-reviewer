import { NextFunction, Request, Response } from 'express';
import { getFirestore } from 'firebase-admin/firestore';

const db = getFirestore();

export const requestLimit = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const userId = req.headers['user-id'];  // 사용자 식별을 위한 ID
  if (!userId) {
    res.status(400).json({ success: false, error: 'User ID is required' });
    return;
  }

  const userRef = db.collection('users').doc(userId as string);
  const userDoc = await userRef.get();
  const today = new Date().toISOString().split('T')[0];  // 날짜를 YYYY-MM-DD 형식으로 저장

  if (!userDoc.exists) {
    await userRef.set({ requests: { [today]: 1 } });
    next();
    return;
  }

  const userData = userDoc.data();
  const requests = userData?.requests || {};
  const requestCount = requests[today] || 0;

  if (requestCount >= 2) {
    res.status(429).json({ success: false, error: 'Daily request limit reached' });
    return;
  }

  requests[today] = requestCount + 1;
  await userRef.update({ requests });
  next();
};