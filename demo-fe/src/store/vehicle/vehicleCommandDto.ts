const commandTypes = ['CHARGING_START', 'CHARGING_STOP'] as const;
export type CommandType = (typeof commandTypes)[number];

const commandStates = ['PENDING', 'FAILED', 'EXECUTED'] as const;
export type CommandState = (typeof commandStates)[number];

export interface VehicleCommandDto {
  id: string;
  userId: string;
  deviceId: string;
  type: CommandType;
  state: CommandState;
  createdAt: string;
}
