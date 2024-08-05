import { Box, Typography, useTheme } from '@mui/material';

interface HeighlightedSubtitleProps {
  subtitleText: string;
}

export const HeighlightedSubtitle = ({
  subtitleText,
}: HeighlightedSubtitleProps) => {
  const { palette } = useTheme();

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent={'center'}
      my={6}
      gap={2}
    >
      <Box
        sx={{
          height: '1px',
          width: '5rem',
          background: palette.common.horizontal_separator,
        }}
      />
      <Typography sx={{ textAlign: 'center' }}>{subtitleText}</Typography>
      <Box
        sx={{
          height: '1px',
          width: '5rem',
          background: palette.common.horizontal_separator,
        }}
      />
    </Box>
  );
};
