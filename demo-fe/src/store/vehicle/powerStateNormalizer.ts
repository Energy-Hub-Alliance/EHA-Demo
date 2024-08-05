import { PowerStateModel } from './vehicleModel';
import { PowerStateDto } from './vehicleDto';

export const powerStateDtoToModelMap: Record<PowerStateDto, PowerStateModel> = {
  CHARGING: PowerStateModel.CHARGING,
  FAULT: PowerStateModel.FAULT,
  FINISHED: PowerStateModel.FINISHED,
  PLUGGED: PowerStateModel.PLUGGED,
  PREPARING: PowerStateModel.PREPARING,
  UNKNOWN: PowerStateModel.UNKNOWN,
  UNPLUGGED: PowerStateModel.UNPLUGGED,
  STOPPED: PowerStateModel.STOPPED,
};
