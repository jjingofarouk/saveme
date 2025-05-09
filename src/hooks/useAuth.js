
import { useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../services/firebaseConfig';
import { getUserProfile } from '../services/authService';

const useAuth = () => {
  const { user, setUser } = useContext(AuthContext);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const profile = await getUserProfile(firebaseUser.uid);
          setUser({ ...profile, uid: firebaseUser.uid });
        } catch (err) {
          setUser(null);
        }
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, [setUser]);

  return { user, setUser };
};

export default useAuth;