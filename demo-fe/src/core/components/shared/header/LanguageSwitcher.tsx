import { Language } from '../../../../i18n';
import { useTranslation } from 'react-i18next';
import LanguageIcon from '@mui/icons-material/Language';
import { IconButton, Menu, MenuItem } from '@mui/material';
import { usePopover } from '../../../hooks/usePopover';
import { useAppDispatch } from '../../../../store/store';
import { setLocale } from '../../../../store/locale.slice';
import { useTheme } from '@mui/material/styles';

export const LanguageSwitcher = () => {
  const { t, i18n } = useTranslation();
  const { anchorEl, openPopover, closePopover, popoverOpen } = usePopover();

  const dispatch = useAppDispatch();
  const theme = useTheme();

  return (
    <>
      <IconButton
        onClick={openPopover}
        size="small"
        sx={{ color: 'inherit', mr: 2 }}
      >
        <LanguageIcon />
      </IconButton>

      <Menu
        id="menu-lang"
        anchorEl={anchorEl}
        disableAutoFocusItem
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        open={popoverOpen}
        onClose={closePopover}
        sx={{
          '& .MuiPaper-root': {
            backgroundColor: theme.palette.background?.default,
          },
        }}
      >
        {Object.values(Language).map((lng) => {
          return (
            <MenuItem
              key={lng}
              onClick={() => {
                dispatch(setLocale(lng));
                closePopover();
              }}
              sx={
                lng === i18n.resolvedLanguage
                  ? {
                      textDecoration: 'underline',
                      textUnderlineOffset: 3,
                      color: theme.palette.secondary.main,
                      pointerEvents: 'none',
                    }
                  : {}
              }
              data-testid={`${lng}LanguageSwitcherOption`}
            >
              {t(lng)}
            </MenuItem>
          );
        })}
      </Menu>
    </>
  );
};
