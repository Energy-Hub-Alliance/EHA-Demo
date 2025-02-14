import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useDeleteChargerMutation } from '../../../../store/charging-hardware/chargingHardwareApi';
import { showSnackbar } from '../../shared/snackbar/snackbarUtils';
import { useNavigate } from 'react-router-dom';
import { DemoDialog } from '../../shared/components/DemoDialog';
import { getApiErrorMessage } from '../../../../store/util/getApiErrorMessage';

interface DeleteChargingHardwareDialogProps {
  open: boolean;
  onClose: () => void;
  chargerId: string;
}

export const DeleteChargingHardwareDialog = ({
  open,
  onClose,
  chargerId,
}: DeleteChargingHardwareDialogProps) => {
  const { t } = useTranslation();
  const [deleteCharger, { isLoading }] = useDeleteChargerMutation();
  const navigate = useNavigate();

  const handleConfirm = useCallback(() => {
    if (!chargerId) {
      return;
    }
    return deleteCharger({ chargerId: chargerId })
      .unwrap()
      .then(() => {
        showSnackbar('success', t('deleteDeviceSuccessMessage'));
        onClose();
        navigate('/charging-hardware');
      })
      .catch((error) => {
        const errorName = getApiErrorMessage(error);
        showSnackbar('error', t(`errorCodes.${errorName}`));
      });
  }, [chargerId, deleteCharger, navigate, onClose, t]);

  return (
    <DemoDialog
      open={open}
      onClose={onClose}
      onConfirm={handleConfirm}
      confirmButton={t('deleteButton')}
      cancelButton={t('cancelButton')}
      title={t('deleteTitle.charger')}
      content={t('deleteContent.charger')}
      isLoading={isLoading}
      testId={`${chargerId}Charger`}
    />
  );
};
