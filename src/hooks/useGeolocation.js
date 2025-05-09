import { useState, useEffect } from 'react';

const useGeolocation = () => {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!navigator.geolocation) {
      setError('Geolocation not supported');
      return;
    }

    const handleSuccess = (position) => {
      setLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    };

    const handleError = () => {
      setError('Unable to retrieve location');
    };

    navigator.geolocation.getCurrentPosition(handleSuccess, handleError);

    const watchId = navigator.geolocation.watchPosition(handleSuccess, handleError);

    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  return { location, error };
};

export default useGeolocation;