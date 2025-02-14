import React, { createRef, useEffect } from 'react';
import { SnackbarProvider } from 'notistack';
import { DemoSnackbar } from './DemoSnackbar';
import { setSnackbarRef } from './snackbarUtils';

interface DemoSnackbarProviderProps {
  children: React.ReactNode;
}

export const DemoSnackbarProvider: React.FC<DemoSnackbarProviderProps> = ({
  children,
}) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const notistackRef = createRef<any>();

  useEffect(() => {
    setSnackbarRef(notistackRef);
  }, [notistackRef]);

  return (
    <SnackbarProvider
      ref={notistackRef}
      anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      maxSnack={1}
      autoHideDuration={6000}
      Components={{
        success: DemoSnackbar,
        error: DemoSnackbar,
        default: DemoSnackbar,
      }}
    >
      {children}
    </SnackbarProvider>
  );
};
