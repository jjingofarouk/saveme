import firebase from 'firebase/app';
import { db } from './firebaseConfig';
import { doc, setDoc } from 'firebase/firestore';
import { GeoFirestore } from 'geofirestore';

const geoFirestore = new GeoFirestore(db);

export const updateDonorProfile = async (uid, data) => {
  const donorRef = doc(db, 'donors', uid);
  await setDoc(donorRef, data, { merge: true });
};

export const getNearbyRequests = async (location) => {
  const geoCollection = geoFirestore.collection('requests');
  const query = geoCollection.near({
    center: new firebase.firestore.GeoPoint(location.lat, location.lng),
    radius: 50, // 50 km radius
  });
  const snapshot = await query.get();
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};