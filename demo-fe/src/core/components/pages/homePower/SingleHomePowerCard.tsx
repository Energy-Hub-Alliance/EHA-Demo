import { Box, Card, Typography, useTheme } from '@mui/material';
import EastIcon from '@mui/icons-material/East';
import { useNavigate } from 'react-router-dom';
import { usePersistedVendorInfo } from '../../../hooks/usePersistedVendorInfo';
import { HomePowerType } from '../../../../store/home-power/enums/homePowerTypeEnum';
import { homePowerTypesToIcons } from '../../shared/mappers/homePowerTypesToIcons';

interface SingleHomePowerCardProps {
  homePowerId: string;
  homePowerModel: string;
  manufacturer: string;
  type: HomePowerType;
}

export const SingleHomePowerCard = ({
  homePowerId,
  homePowerModel,
  manufacturer,
  type,
}: SingleHomePowerCardProps) => {
  const navigate = useNavigate();
  const { palette } = useTheme();
  const vendorInfo = usePersistedVendorInfo(manufacturer);
  const HomePowerTypeIcon = homePowerTypesToIcons[type];

  return (
    <Card
      key={homePowerId}
      onClick={() => {
        if (type === HomePowerType.BATTERY) {
          navigate(`/home-power/battery/${homePowerId}`);
        }
        if (type === HomePowerType.PV_INVERTER) {
          navigate(`/home-power/pv-inverter/${homePowerId}`);
        }
        if (type === HomePowerType.METER) {
          navigate(`/home-power/meter/${homePowerId}`);
        }
      }}
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
        <Box display={'flex'} flexDirection="row" alignItems="center" gap={3}>
          {vendorInfo.Icon}
          <Typography>{homePowerModel}</Typography>
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
          <HomePowerTypeIcon />
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
