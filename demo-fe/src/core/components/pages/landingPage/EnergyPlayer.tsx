import { Box, Card, Typography, useTheme } from '@mui/material';
import EastIcon from '@mui/icons-material/East';

interface EnergyPlayerProps {
  title: string;
  Icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>> | string;
  onClick: () => void;
  testId?: string;
}

export const EnergyPlayer = ({
  title,
  Icon,
  onClick,
  testId,
}: EnergyPlayerProps) => {
  const { palette } = useTheme();

  return (
    <Card
      data-testid={testId}
      key={testId}
      onClick={onClick}
      sx={{
        width: '100%',
        p: 0,
        mb: 6,
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer',
      }}
    >
      <Box
        sx={{
          minHeight: '18rem',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 3,
          p: 2,
        }}
      >
        <Typography>{title}</Typography>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            width: 'calc(100% - 16px)',
            height: '150px',
            borderRadius: 2,
          }}
        >
          {typeof Icon === 'string' ? (
            <img src={Icon} alt="energy-player" style={{ maxHeight: '100%' }} />
          ) : (
            <Icon />
          )}
        </Box>
      </Box>

      <Box
        sx={{
          backgroundColor: palette.primary.main,
          borderRadius: '12px 0 6px 0',
          width: 48,
          height: 30,
          display: 'flex',
          alignItems: 'center',
          alignSelf: 'flex-end',
        }}
      >
        <EastIcon
          fontSize="small"
          sx={{
            display: 'block',
            margin: '0 auto',
          }}
        />
      </Box>
    </Card>
  );
};
