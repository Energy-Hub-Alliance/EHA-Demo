import { useTheme, Box } from '@mui/material';
import { useGetAvailableVendorsQuery } from '../../../../store/connect/connectApi';
import { useAppDispatch } from '../../../../store/store';
import { useEffect } from 'react';
import { clearVendors, setVendor } from '../../../../store/vendors.slice';
import { ErrorPage } from '../../pages/errorPage/ErrorPage';
import { Loader } from '../loader/Loader';
interface MainContentProps {
  children: React.ReactNode;
}

export const MainContent = ({ children }: MainContentProps) => {
  const theme = useTheme();

  const {
    data: availableVendors,
    isLoading,
    isError,
  } = useGetAvailableVendorsQuery();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (availableVendors) {
      dispatch(clearVendors());
      availableVendors?.vendors.map((vendor) => dispatch(setVendor(vendor)));
    }
  }, [availableVendors, dispatch]);

  if (isLoading) return <Loader />;
  if (isError) return <ErrorPage />;

  return (
    <Box sx={{ height: `calc(100% - ${theme.ui_vars.other.header_height})` }}>
      {children}
    </Box>
  );
};
