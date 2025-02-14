import { Box } from '@mui/material';

const dotStyle = {
  width: '8px',
  height: '8px',
  margin: '0 2px',
  borderRadius: '50%',
};

interface ThreeDotsLoaderProps {
  color: string;
}
export const ThreeDotsLoader = ({ color }: ThreeDotsLoaderProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          ...dotStyle,
          backgroundColor: color,
          '@keyframes fade': {
            '0%, 20%': {
              opacity: 0.1,
            },
            ' 30%, 50%': {
              opacity: 1,
            },
            '60%, 80%': {
              opacity: 0.1,
            },
            '100%': {
              opacity: 0.1,
            },
          },
          animation: 'fade 1.5s infinite',
        }}
      />
      <Box
        sx={{
          ...dotStyle,
          backgroundColor: color,
          animation: 'fade 1.5s infinite',
          animationDelay: '0.2s' /* Delay for the second dot */,
        }}
      />
      <Box
        sx={{
          ...dotStyle,
          backgroundColor: color,
          animation: 'fade 1.5s infinite',
          animationDelay: '0.4s' /* Delay for the third dot */,
        }}
      />
    </Box>
  );
};
