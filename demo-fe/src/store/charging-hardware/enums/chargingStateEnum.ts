const chargingStates = [
  'UNPLUGGED',
  'CHARGING',
  'PREPARING',
  'FINISHED',
  'STOPPED',
  'FAULT',
] as const;
export type ChargingStateEnum = (typeof chargingStates)[number];
