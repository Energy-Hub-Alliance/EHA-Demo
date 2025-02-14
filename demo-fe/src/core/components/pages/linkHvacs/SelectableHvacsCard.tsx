import { Box, ButtonBase, Card, Typography, useTheme } from '@mui/material';
import SelectedMark from '../../shared/assets/selectedMark.svg';
import { usePersistedVendorInfo } from '../../../hooks/usePersistedVendorInfo';
import { HvacType } from '../../../../store/hvac/enums/hvacTypeEnum';
import { useTranslation } from 'react-i18next';

interface SelectableHvacsCardProps {
  hvacId: string;
  hvacName?: string;
  hvacType?: HvacType;
  manufacturer: string;
  selected: boolean;
  disabled: boolean;
  onClick: (T: string) => void;
  testId?: string;
}

export const SelectableHvacsCard = ({
  hvacId,
  hvacName,
  hvacType,
  manufacturer,
  onClick,
  selected,
  disabled,
  testId,
}: SelectableHvacsCardProps) => {
  const vendorInfo = usePersistedVendorInfo(manufacturer);
  const [t] = useTranslation();
  const { ui_vars } = useTheme();
  return (
    <ButtonBase
      disabled={disabled}
      key={hvacId}
      onClick={() => onClick(hvacId)}
      sx={{
        opacity: disabled ? 0.4 : 1,
      }}
    >
      <Card
        data-testid={`${hvacId}HvacCard${testId}`}
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
          {/* <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              gap: 2,
              px: 6,
              alignItems: 'center',
            }}
          > */}
          {vendorInfo.Icon}
          {/* </Box> */}

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
        {hvacName ? <Typography>{hvacName}</Typography> : null}
        {hvacType ? (
          <Typography
            sx={{ pt: 3, fontWeight: 400, fontSize: ui_vars.font_size.s }}
          >
            {t(`hvacType.${hvacType}`)}
          </Typography>
        ) : null}
      </Card>
    </ButtonBase>
  );
};
