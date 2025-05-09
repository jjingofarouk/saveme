
import { db } from './firebaseConfig';
import { doc, setDoc } from 'firebase/firestore';
import { GeoFirestore } from 'geofirestore';
import { GeoPoint } from 'firebase/firestore';

const geoFirestore = new GeoFirestore(db);

export const updateDonorProfile = async (uid, data) => {
  try {
    const donorRef = doc(db, 'donors', uid);
    await setDoc(donorRef, data, { merge: true });
  } catch (err) {
    throw new Error(`Failed to update donor profile: ${err.message}`);
  }
};

export const getNearbyRequests = async (location) => {
  try {
    if (!location) throw new Error('Location is required');
    const geoCollection = geoFirestore.collection('requests');
    const query = geoCollection.near({
      center: new GeoPoint(location.lat, location.lng),
      radius: 50, // 50 km radius
    });
    const snapshot = await query.get();
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (err) {
    throw new Error(`Failed to get nearby requests: ${err.message}`);
  }
};