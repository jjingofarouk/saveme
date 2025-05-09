
import { auth, db } from './firebaseConfig';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail, signOut } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';

export const login = async (email, password) => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;
  const profile = await getUserProfile(user.uid);
  return { ...profile, uid: user.uid };
};

export const register = async ({ email, password, phone, role }) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;
  await setDoc(doc(db, 'users', user.uid), {
    email,
    phone,
    role,
    createdAt: new Date().toISOString(),
  });
  return { uid: user.uid, email, phone, role };
};

export const forgotPassword = async (email) => {
  await sendPasswordResetEmail(auth, email);
};

export const logout = async () => {
  await signOut(auth);
};

export const getUserProfile = async (uid) => {
  const userDoc = await getDoc(doc(db, 'users', uid));
  if (!userDoc.exists()) throw new Error('User not found');
  return { id: userDoc.id, ...userDoc.data() };
};

export const updateUserRole = async (uid, role) => {
  await setDoc(doc(db, 'users', uid), { role }, { merge: true });
};

export const deleteUser = async (uid) => {
  // Note: Firebase Auth user deletion requires admin SDK in Cloud Functions
  await setDoc(doc(db, 'users', uid), { deleted: true }, { merge: true });
};