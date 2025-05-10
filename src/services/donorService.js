import { db } from './firebaseConfig';
   import { doc, setDoc, query, collection, where, getDocs } from 'firebase/firestore';
   //import { GeoPoint } from 'firebase/firestore';
   import { geohashQueryBounds, distanceBetween } from 'geofire-common';

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
       const center = [location.lat, location.lng];
       const radiusInM = 50 * 1000; // 50 km in meters

       const bounds = geohashQueryBounds(center, radiusInM);
       const requests = [];

       for (const b of bounds) {
         const q = query(
           collection(db, 'requests'),
           where('geohash', '>=', b[0]),
           where('geohash', '<=', b[1])
         );
         const snapshot = await getDocs(q);
         snapshot.forEach((doc) => {
           const data = doc.data();
           const lat = data.coordinates.latitude;
           const lng = data.coordinates.longitude;
           const distanceInKm = distanceBetween([lat, lng], center) / 1000;
           if (distanceInKm <= 50) {
             requests.push({ id: doc.id, ...data, distance: distanceInKm });
           }
         });
       }

       return requests;
     } catch (err) {
       throw new Error(`Failed to get nearby requests: ${err.message}`);
     }
   };