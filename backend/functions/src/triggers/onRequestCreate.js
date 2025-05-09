
const functions = require('firebase-functions');
const admin = require('firebase-admin');

exports.onRequestCreate = functions.firestore
  .document('requests/{requestId}')
  .onCreate(async (snap, context) => {
    const request = snap.data();
    const recipientId = request.recipientId;

    const recipientDoc = await admin.firestore().collection('users').doc(recipientId).get();
    const email = recipientDoc.data().email;

    await admin.firestore().collection('reports').add({
      title: 'New Blood Request',
      value: `Request for ${request.bloodType} by ${email}`,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });
  });