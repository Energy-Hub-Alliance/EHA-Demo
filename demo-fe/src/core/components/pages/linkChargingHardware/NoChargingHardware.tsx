import { useTranslation } from 'react-i18next';
import ChargerIcon from '../../shared/assets/chargingHardware/chargingHardware.svg';
import { NoItemsPage } from '../../shared/components/NoItemsPage';

export const NoChargers = () => {
  const [t] = useTranslation();

  return (
    <NoItemsPage Icon={ChargerIcon} title={t('noChargers')} testId="chargers" />
  );
};
