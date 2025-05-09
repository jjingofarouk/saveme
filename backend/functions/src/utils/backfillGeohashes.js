
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const { geohashForLocation } = require('geofire-common');

const db = admin.firestore();

exports.backfillGeohashes = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'User must be authenticated.');
  }

  // Backfill requests
  const requests = await db.collection('requests').get();
  let batch = db.batch();
  let count = 0;

  requests.forEach((doc) => {
    const { coordinates } = doc.data();
    if (coordinates) {
      const geohash = geohashForLocation([coordinates.latitude, coordinates.longitude]);
      batch.update(doc.ref, { geohash });
      count++;
      if (count === 500) { // Firestore batch limit
        batch.commit();
        batch = db.batch();
        count = 0;
      }
    }
  });
  if (count > 0) await batch.commit();

  // Backfill donors
  const donors = await db.collection('donors').get();
  batch = db.batch();
  count = 0;

  donors.forEach((doc) => {
    const { coordinates } = doc.data();
    if (coordinates) {
      const geohash = geohashForLocation([coordinates.latitude, coordinates.longitude]);
      batch.update(doc.ref, { geohash });
      count++;
      if (count === 500) {
        batch.commit();
        batch = db.batch();
        count = 0;
      }
    }
  });
  if (count > 0) await batch.commit();

  return { success: true, updated: requests.size + donors.size };
});