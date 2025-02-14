import { Box, ButtonBase, Card, Typography, useTheme } from '@mui/material';
import SelectedMark from '../../shared/assets/selectedMark.svg';
import { usePersistedVendorInfo } from '../../../hooks/usePersistedVendorInfo';
import { HomePowerType } from '../../../../store/home-power/enums/homePowerTypeEnum';

interface SelectableHomePowerCardProps {
  homePowerId: string;
  type: HomePowerType;
  siteName: string;
  homePowerName?: string;
  manufacturer: string;
  selected: boolean;
  disabled: boolean;
  onClick: (T: string) => void;
  testId?: string;
}

export const SelectableHomePowerCard = ({
  homePowerId,
  siteName,
  homePowerName,
  manufacturer,
  onClick,
  selected,
  disabled,
  testId,
}: SelectableHomePowerCardProps) => {
  const vendorInfo = usePersistedVendorInfo(manufacturer);
  const { ui_vars } = useTheme();
  return (
    <ButtonBase
      disabled={disabled}
      key={homePowerId}
      onClick={() => onClick(homePowerId)}
      sx={{
        opacity: disabled ? 0.4 : 1,
      }}
    >
      <Card
        data-testid={`${homePowerId}HomePowerCard${testId}`}
        sx={{ width: '100%', p: 4, position: 'relative', cursor: 'pointer' }}
      >
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          width="100%"
          gap={2}
          pb={4}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              gap: 2,
              px: 6,
              alignItems: 'center',
            }}
          >
            {vendorInfo.Icon}
          </Box>

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              alignSelf: 'flex-end',
              position: 'absolute',
              right: 14,
              top: 14,
            }}
          >
            {selected ? <img src={SelectedMark} alt="Selected Mark" /> : null}
          </Box>
        </Box>
        {homePowerName ? <Typography>{homePowerName}</Typography> : null}
        <Typography
          sx={{ pt: 3, fontWeight: 400, fontSize: ui_vars.font_size.s }}
        >
          {siteName}
        </Typography>
      </Card>
    </ButtonBase>
  );
};
