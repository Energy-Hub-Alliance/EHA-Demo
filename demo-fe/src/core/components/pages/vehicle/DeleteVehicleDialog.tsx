import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { showSnackbar } from '../../shared/snackbar/snackbarUtils';
import { DemoDialog } from '../../shared/components/DemoDialog';
import { useDeleteVehicleMutation } from '../../../../store/vehicle/vehicleApi';
import { getApiErrorMessage } from '../../../../store/util/getApiErrorMessage';

interface DeleteVehicleDialogProps {
  open: boolean;
  onClose: () => void;
  vehicleId: string;
}

export const DeleteVehicleDialog = ({
  open,
  onClose,
  vehicleId,
}: DeleteVehicleDialogProps) => {
  const { t } = useTranslation();
  const [deleteVehicle, { isLoading }] = useDeleteVehicleMutation();
  const navigate = useNavigate();

  const handleConfirm = useCallback(() => {
    if (!vehicleId) {
      return;
    }
    return deleteVehicle({ vehicleId: vehicleId })
      .unwrap()
      .then(() => {
        showSnackbar('success', t('deleteVehicleSuccessMessage'));
        onClose();
        navigate('/vehicles');
      })
      .catch((error) => {
        const errorName = getApiErrorMessage(error);
        showSnackbar('error', t(`errorCodes.${errorName}`));
      });
  }, [vehicleId, deleteVehicle, navigate, onClose, t]);

  return (
    <DemoDialog
      open={open}
      onClose={onClose}
      onConfirm={handleConfirm}
      confirmButton={t('deleteButton')}
      cancelButton={t('cancelButton')}
      title={t('deleteTitle.vehicle')}
      content={t('deleteContent.vehicle')}
      isLoading={isLoading}
      testId={`${vehicleId}Vehicle`}
    />
  );
};
