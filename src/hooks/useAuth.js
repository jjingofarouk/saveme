import { useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { getCurrentUser } from '../services/authService';

const useAuth = () => {
  const { user, setUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      if (token && !user) {
        try {
          const data = await getCurrentUser();
            setUser(data);
          } catch (err) {
            localStorage.removeItem('token');
            setUser(null);
          }
        }
      };
      fetchUser();
    }, [user, setUser]);

  return { user, setUser };
};

export default useAuth;