
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const { geohashQueryBounds, distanceBetween } = require('geofire-common');

const db = admin.firestore();

exports.matchDonors = functions.firestore
  .document('requests/{requestId}')
  .onCreate(async (snap, context) => {
    const request = snap.data();
    const { recipientId, bloodType, coordinates } = request;
    const center = [coordinates.latitude, coordinates.longitude];
    const radiusInM = 50 * 1000; // 50 km

    const bounds = geohashQueryBounds(center, radiusInM);
    const matches = [];

    for (const b of bounds) {
      const q = db
        .collection('donors')
        .where('geohash', '>=', b[0])
        .where('geohash', '<=', b[1])
        .where('bloodType', '==', bloodType)
        .where('availability', '==', true);
      const snapshot = await q.get();
      snapshot.forEach((doc) => {
        const data = doc.data();
        const lat = data.coordinates.latitude;
        const lng = data.coordinates.longitude;
        const distanceInKm = distanceBetween([lat, lng], center) / 1000;
        if (distanceInKm <= 50) {
          matches.push({
            donor: { ...data, id: doc.id },
            distance: distanceInKm,
          });
        }
      });
    }

    const recipientRef = db.collection('recipients').doc(recipientId);
    const batch = db.batch();
    matches.forEach((match) => {
      const matchRef = recipientRef.collection('matches').doc();
      batch.set(matchRef, match);
    });
    await batch.commit();

    await db.collection('stats').doc('global').set(
      { requests: admin.firestore.FieldValue.increment(1) },
      { merge: true }
    );

    return null;
  });