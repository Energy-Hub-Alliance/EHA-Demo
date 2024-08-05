import { Box, Card, useTheme } from '@mui/material';
import EastIcon from '@mui/icons-material/East';
import { useNavigate } from 'react-router-dom';
import SmartTariffImage from '../../shared/assets/smartTariff/smart-tariff.svg?react';
import {
  SmartTarrifManufacturer,
  smartTariffManufacturersToIcons,
} from '../../shared/mappers/smartTariffManufacturersToIcons';

interface SingleSmartTariffCardProps {
  smartTariffId: string;
  smartTariffVendor: string;
}

export const SingleSmartTariffCard = ({
  smartTariffId,
  smartTariffVendor,
}: SingleSmartTariffCardProps) => {
  const navigate = useNavigate();
  const { palette } = useTheme();

  const SmartTariffVendorIcon =
    smartTariffManufacturersToIcons[
      smartTariffVendor as SmartTarrifManufacturer
    ];

  return (
    <Card
      key={smartTariffId}
      onClick={() => navigate(`/smart-tariffs/${smartTariffId}`)}
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
        <Box display={'flex'} flexDirection="row" alignItems="center" gap={2}>
          <SmartTariffVendorIcon key={smartTariffVendor} />
        </Box>

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
          <SmartTariffImage />
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
