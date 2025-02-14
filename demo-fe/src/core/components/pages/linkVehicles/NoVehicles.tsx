import { useTranslation } from 'react-i18next';
import VehicleHighlightedImage from '../../shared/assets/vehicle/vehicleHighlighted.png';
import { NoItemsPage } from '../../shared/components/NoItemsPage';

export const NoVehicles = () => {
  const [t] = useTranslation();

  return (
    <NoItemsPage
      Icon={VehicleHighlightedImage}
      title={t('noVehicles')}
      testId="vehicles"
    />
  );
};
