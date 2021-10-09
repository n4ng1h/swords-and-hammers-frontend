export const END_TURN_RESOURCES_TEMPLATE = {
  lumber: 0,
  steel: 0,
  gold: 0,
};

export const INFO_DIALOG_TYPE = {
  ALR_ATTACKED: 'ALR_ATTACKED',
  ATTACKED: 'ATTACKED',
};

export const BUTTON_TYPE = {
  NEXT: 'NEXT',
  ENTER: 'ENTER',
  SMALL: 'SMALL',
};

export const DEFAULT_ROUND_DISPLAY = '0 / 999';

export const RAW_MATERIALS_TEMPLATE = {
  lumber: 0,
  steel: 0,
  gold: 0,
};
Object.freeze(RAW_MATERIALS_TEMPLATE);

export const BUILT_RESOURCES_TEMPLATE = {
  village: 2,
  castle: 0,
  army: 1,
};
Object.freeze(BUILT_RESOURCES_TEMPLATE);

export const ROUTE_PATH = {
  main: '/',
  warroom: '/warroom',
};

export const OPPONENT_STATS_TEMPLATE = {
  kingdomName: 'KINGDOM_NAME_HERE',
  village: -1,
  castle: -1,
  army: -1,
  winProb: 0,
};
Object.freeze(OPPONENT_STATS_TEMPLATE);
