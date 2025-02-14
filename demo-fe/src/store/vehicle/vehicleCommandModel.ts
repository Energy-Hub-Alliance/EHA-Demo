import { CommandState, CommandType } from './vehicleCommandDto';

export interface VehicleCommandModel {
  id: string;
  userId: string;
  deviceId: string;
  type: CommandType;
  state: CommandState;
  createdAt: string;
}
