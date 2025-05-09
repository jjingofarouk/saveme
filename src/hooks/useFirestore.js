
import { useState, useEffect } from 'react';
import { db } from '../services/firebaseConfig';
import { doc, collection, onSnapshot } from 'firebase/firestore';

const useFirestore = (path, isCollection = false) => {
  const [data, setData] = useState(isCollection ? [] : null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    const ref = isCollection ? collection(db, path) : doc(db, path);

    const unsubscribe = onSnapshot(
      ref,
      (snapshot) => {
        if (isCollection) {
          const docs = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
          setData(docs);
        } else {
          setData(snapshot.exists() ? { id: snapshot.id, ...snapshot.data() } : null);
        }
        setLoading(false);
      },
      (err) => {
        setError(err.message);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [path, isCollection]);

  return { data, loading, error };
};

export default useFirestore;