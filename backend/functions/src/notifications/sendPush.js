
const functions = require('firebase-functions');
const admin = require('firebase-admin');

exports.sendPush = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'User must be authenticated.');
  }

  const { userId, title, body } = data;
  const userDoc = await admin.firestore().collection('users').doc(userId).get();
  if (!userDoc.exists) {
    throw new functions.https.HttpsError('not-found', 'User not found.');
  }

  const token = userDoc.data().fcmToken;
  if (!token) {
    throw new functions.https.HttpsError('not-found', 'FCM token not found.');
  }

  const message = {
    notification: { title, body },
    token,
  };

  await admin.messaging().send(message);
  return { success: true };
});