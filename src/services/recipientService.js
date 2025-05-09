
   import { db } from './firebaseConfig';
   import { doc, setDoc, addDoc, collection } from 'firebase/firestore';
   import { GeoPoint } from 'firebase/firestore';
   import { geohashForLocation } from 'geofire-common';

   export const updateRecipientProfile = async (uid, data) => {
     try {
       const recipientRef = doc(db, 'recipients', uid);
       await setDoc(recipientRef, data, { merge: true });
     } catch (err) {
       throw new Error(`Failed to update recipient profile: ${err.message}`);
     }
   };

   export const createBloodRequest = async (data) => {
     try {
       const { location, ...rest } = data;
       if (!location) throw new Error('Location is required');
       const coordinates = new GeoPoint(location.lat, location.lng);
       const geohash = geohashForLocation([location.lat, location.lng]);
       await addDoc(collection(db, 'requests'), {
         ...rest,
         coordinates,
         geohash,
         createdAt: new Date().toISOString(),
       });
     } catch (err) {
       throw new Error(`Failed to create blood request: ${err.message}`);
     }
   };