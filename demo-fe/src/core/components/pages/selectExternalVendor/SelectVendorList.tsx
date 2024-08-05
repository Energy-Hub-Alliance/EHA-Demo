import { Typography, useTheme, Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { HeighlightedSubtitle } from '../../shared/components/HeighlightedSubtitle';
import { VendorButton } from './VendorButton';

export type Vendor = {
  name: string;
  Icon: JSX.Element;
};

interface SelectVendorListProps {
  title: string;
  subtitle: string;
  availableVendors: Vendor[];
  unavailableVendors: Vendor[];
  onClick: (T: string) => void;
  displayName?: boolean;
}

export const SelectVendorList = ({
  title,
  subtitle,
  availableVendors,
  unavailableVendors,
  onClick,
  displayName,
}: SelectVendorListProps) => {
  const theme = useTheme();
  const [t] = useTranslation();

  return (
    <Box
      sx={{
        p: theme.ui_vars.other.page_spacing,
        display: 'flex',
        flexDirection: 'column',
        height: `calc(100dvh - ${theme.ui_vars.other.header_height})`,
        overflow: 'auto',
      }}
    >
      <Typography
        data-testid={`vendorTitle`}
        fontWeight={700}
        fontSize={theme.ui_vars.font_size.xl}
        sx={{
          textAlign: 'center',
        }}
      >
        {title}
      </Typography>
      <Typography
        data-testid={`vendorSubtitle`}
        fontWeight={400}
        fontSize={theme.ui_vars.font_size.m}
        sx={{
          py: 6,
          textAlign: 'center',
        }}
      >
        {subtitle}
      </Typography>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 6,
          mb: 6,
        }}
      >
        {availableVendors.map((availableVendor) => {
          return (
            <VendorButton
              key={availableVendor.name}
              vendorName={availableVendor.name}
              startingIcon={availableVendor.Icon}
              onClick={() => onClick(availableVendor.name)}
              disabled={false}
              displayName={displayName}
            />
          );
        })}
      </Box>

      <HeighlightedSubtitle subtitleText={t('comingSoon')} />

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          rowGap: 6,
        }}
      >
        {unavailableVendors.map((unavailableVendor) => {
          return (
            <VendorButton
              key={unavailableVendor.name}
              vendorName={unavailableVendor.name}
              startingIcon={unavailableVendor.Icon}
              onClick={() => {}}
              disabled={true}
              displayName={displayName}
            />
          );
        })}
      </Box>
    </Box>
  );
};
