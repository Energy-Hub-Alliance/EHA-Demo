import { useTranslation } from 'react-i18next';
import HvacIcon from '../../shared/assets/hvac/hvac.svg';
import { NoItemsPage } from '../../shared/components/NoItemsPage';

export const NoHvacs = () => {
  const [t] = useTranslation();

  return <NoItemsPage Icon={HvacIcon} title={t('noHvacs')} testId="hvacs" />;
};
