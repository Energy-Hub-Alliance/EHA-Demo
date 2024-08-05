import { Box, IconButton, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import BackArrowIcon from '../../shared/assets/icons/back-arrow.svg?react';

export const NavigationHeader = ({
  action,
  logo,
  location,
}: {
  location: string;
  action?: {
    icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
    onClick: () => void;
  };
  logo?: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
}) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const ActionIcon = action?.icon;
  const LogoIcon = logo;

  return (
    <Box
      sx={{
        width: '100dvw',
        height: theme.ui_vars.other.header_height,
        backgroundColor: theme.palette.background?.default,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        p: theme.ui_vars.other.page_spacing,
      }}
    >
      <IconButton onClick={() => navigate(location)} size="small">
        <BackArrowIcon />
      </IconButton>

      {logo && LogoIcon && <LogoIcon />}

      {action && ActionIcon && (
        <IconButton onClick={action.onClick} size="small">
          <ActionIcon />
        </IconButton>
      )}
    </Box>
  );
};
