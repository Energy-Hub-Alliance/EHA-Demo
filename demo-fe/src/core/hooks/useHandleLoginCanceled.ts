import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const useHandleLoginCanceled = (errorParameter: string | null) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (
      // login_cancelled - when user cancels on Vendors login page
      // UserTerminatedFlow - when user cancels on Server Side Rendered HTML page
      errorParameter === 'login_cancelled' ||
      errorParameter === 'UserTerminatedFlow'
    ) {
      navigate('/');
    }
  }, [errorParameter, navigate]);
};
