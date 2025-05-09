
import { db } from './firebaseConfig';
import { doc, setDoc, addDoc, collection } from 'firebase/firestore';
import { GeoFirestore } from 'geofirestore';
import { GeoPoint } from 'firebase/firestore';

const geoFirestore = new GeoFirestore(db);

export const updateRecipientProfile = async (uid, data) => {
  const recipientRef = doc(db, 'recipients', uid);
  await setDoc(recipientRef, data, { merge: true });
};

export const createBloodRequest = async (data) => {
  const { location, ...rest } = data;
  const geoCollection = geoFirestore.collection('requests');
  await geoCollection.add({
    ...rest,
    coordinates: new GeoPoint(location.lat, location.lng),
    createdAt: new Date().toISOString(),
  });
};