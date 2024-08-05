// ---------------------------------------- IMPORTS ---------------------------------------- //
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { Dialog, Box, IconButton } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import UserIcon from '../assets/user.svg?react';
import { useKeycloak } from '@react-keycloak/web';
import { useAppSelector } from '../../../../store/store';

// ---------------------------------------- TYPES & INTERFACES ---------------------------------------- //
interface LinkModel {
  label: string;
  action: () => void;
}

// ---------------------------------------- COMPONENT ---------------------------------------- //
export const BurgerMenu = () => {
  const { palette, ui_vars } = useTheme();
  const [isMenuOpened, setIsMenuOpened] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { keycloak } = useKeycloak();
  const UserInfo = useAppSelector((state) => state.user.userState);

  const links: LinkModel[] = [
    {
      label: 'HOME',
      action: () => {
        navigate('/');
        setIsMenuOpened(false);
      },
    },
    {
      label: 'VEHICLES',
      action: () => {
        navigate('/vehicles');
        setIsMenuOpened(false);
      },
    },
    {
      label: 'SMART_TARIFFS',
      action: () => {
        navigate('/smart-tariffs');
        setIsMenuOpened(false);
      },
    },
    {
      label: 'LOG_OUT',
      action: () => {
        keycloak.logout();
        setIsMenuOpened(false);
      },
    },
  ];

  return (
    <>
      <IconButton onClick={() => setIsMenuOpened(true)} size="small">
        <MenuIcon />
      </IconButton>

      <Dialog
        open={isMenuOpened}
        fullScreen
        sx={{
          '& .MuiPaper-root': {
            background: palette.background?.default,
            p: ui_vars.other.page_spacing,
          },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            mb: ui_vars.other.page_spacing,
          }}
        >
          <Box display={'flex'} gap={3} maxWidth={'calc(100% - 6rem)'}>
            <UserIcon />
            <Box sx={{ overflow: 'hidden', whiteSpace: 'nowrap' }}>
              <p
                style={{
                  fontWeight: 600,
                  textOverflow: 'ellipsis',
                  overflow: 'hidden',
                }}
              >
                {`${UserInfo.firstName} ${UserInfo.lastName}`}
              </p>
              <p
                style={{
                  fontSize: ui_vars.font_size.s,
                  textOverflow: 'ellipsis',
                  overflow: 'hidden',
                }}
              >
                {UserInfo.email}
              </p>
            </Box>
          </Box>
          <IconButton
            data-testid="termsAndConditionModalButton"
            onClick={() => {
              setIsMenuOpened(false);
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>

        <Box
          display={'flex'}
          flexDirection={'column'}
          gap={5}
          mt={15}
          textAlign={'center'}
        >
          {links.map((link) => {
            return (
              <Box
                key={link.label}
                onClick={link.action}
                sx={{ fontSize: ui_vars.font_size.l, p: 1, cursor: 'pointer' }}
              >
                {t(`links.${link.label}`)}
              </Box>
            );
          })}
        </Box>
      </Dialog>
    </>
  );
};
