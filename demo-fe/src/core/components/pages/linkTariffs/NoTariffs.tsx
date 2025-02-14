import { useTranslation } from 'react-i18next';
import TariffIcon from '../../shared/assets/smartTariff/smart-tariff.svg';
import { NoItemsPage } from '../../shared/components/NoItemsPage';

export const NoTariffs = () => {
  const [t] = useTranslation();

  return (
    <NoItemsPage Icon={TariffIcon} title={t('noTariffs')} testId="tariffs" />
  );
};
