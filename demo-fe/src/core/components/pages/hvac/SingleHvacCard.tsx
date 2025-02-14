import { Box, Card, Typography, useTheme } from '@mui/material';
import EastIcon from '@mui/icons-material/East';
import { useNavigate } from 'react-router-dom';
import { hvacTypesToIcons } from '../../shared/mappers/hvacTypesToIcons';
import { useTranslation } from 'react-i18next';
import { HvacType } from '../../../../store/hvac/enums/hvacTypeEnum';
import { usePersistedVendorInfo } from '../../../hooks/usePersistedVendorInfo';

interface SingleHvacCardProps {
  hvacId: string;
  hvacModel: string;
  manufacturer: string;
  type: HvacType;
}

export const SingleHvacCard = ({
  hvacId,
  hvacModel,
  manufacturer,
  type,
}: SingleHvacCardProps) => {
  const navigate = useNavigate();
  const [t] = useTranslation();
  const { palette } = useTheme();

  const vendorInfo = usePersistedVendorInfo(manufacturer);
  const HvacTypeIcon = hvacTypesToIcons[type];

  return (
    <Card
      key={hvacId}
      onClick={() => navigate(`/hvacs/${hvacId}`)}
      sx={{
        width: '100%',
        p: 0,
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
        <Box
          display={'flex'}
          flexDirection="column"
          alignItems="center"
          gap={2}
        >
          {vendorInfo.Icon}
          <Typography>{hvacModel}</Typography>
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            width: 'calc(100% - 16px)',
            height: '150px',
            borderRadius: 2,
          }}
        >
          <HvacTypeIcon />
          <Typography>{t(`hvacType.${type}`)}</Typography>
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
