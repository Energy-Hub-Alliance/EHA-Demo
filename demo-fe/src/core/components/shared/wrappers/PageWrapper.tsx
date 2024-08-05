import { Box } from '@mui/material';
interface PageWrapperProps {
  children: React.ReactNode;
}

export const PageWrapper = ({ children }: PageWrapperProps) => {
  return (
    <Box
      sx={{
        height: '100dvh',
      }}
    >
      {children}
    </Box>
  );
};
