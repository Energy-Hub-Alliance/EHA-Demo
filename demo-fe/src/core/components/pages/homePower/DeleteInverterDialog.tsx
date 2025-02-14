import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { showSnackbar } from '../../shared/snackbar/snackbarUtils';
import { useNavigate } from 'react-router-dom';
import { DemoDialog } from '../../shared/components/DemoDialog';
import { useDeletePvInverterMutation } from '../../../../store/home-power/pv-inverter/pvInverterApi';
import { getApiErrorMessage } from '../../../../store/util/getApiErrorMessage';

interface DeleteInverterDialogProps {
  open: boolean;
  onClose: () => void;
  pvInverterId: string;
}

export const DeleteInverterDialog = ({
  open,
  onClose,
  pvInverterId,
}: DeleteInverterDialogProps) => {
  const { t } = useTranslation();
  const [deletePvInverter, { isLoading }] = useDeletePvInverterMutation();
  const navigate = useNavigate();

  const handleConfirm = useCallback(() => {
    if (!pvInverterId) {
      return;
    }
    return deletePvInverter({ inverterId: pvInverterId })
      .unwrap()
      .then(() => {
        showSnackbar('success', t('deleteDeviceSuccessMessage'));
        onClose();
        navigate('/home-power');
      })
      .catch((error) => {
        const errorName = getApiErrorMessage(error);
        showSnackbar('error', t(`errorCodes.${errorName}`));
      });
  }, [pvInverterId, deletePvInverter, navigate, onClose, t]);

  return (
    <DemoDialog
      open={open}
      onClose={onClose}
      onConfirm={handleConfirm}
      confirmButton={t('deleteButton')}
      cancelButton={t('cancelButton')}
      title={t('deleteTitle.pvInverter')}
      content={t('deleteContent.pvInverter')}
      isLoading={isLoading}
      testId={`${pvInverterId}PvInverter`}
    />
  );
};
