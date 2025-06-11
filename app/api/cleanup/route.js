import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

// Initialize Firebase Admin SDK only once
if (!getApps().length) {
  initializeApp({
    credential: cert(JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY)),
  });
}

const db = getFirestore();

export async function POST() {
  const now = Date.now();
  const dayAgo = new Date(now - 24 * 60 * 60 * 1000);

  const snapshot = await db
    .collection('chats')
    .where('createdAt', '<=', dayAgo)
    .get();

  const deletes = [];
  snapshot.forEach((doc) => {
    deletes.push(db.collection('chats').doc(doc.id).delete());
  });

  await Promise.all(deletes);

  return Response.json({ deleted: deletes.length });
}
