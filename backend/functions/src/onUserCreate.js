
const functions = require('firebase-functions');
const admin = require('firebase-admin');

exports.onUserCreate = functions.auth.user().onCreate(async (user) => {
  await admin.firestore().collection('users').doc(user.uid).set({
    email: user.email,
    phone: '',
    role: 'donor',
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
  });

  await admin.firestore().collection('stats').doc('global').set(
    { users: admin.firestore.FieldValue.increment(1) },
    { merge: true }
  );
});