import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const useHandleLoginCanceled = (errorParameter: string | null) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (errorParameter === 'login_cancelled') {
      navigate('/');
    }
  }, [errorParameter, navigate]);
};
