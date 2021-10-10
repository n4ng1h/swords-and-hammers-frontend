export const ACTION_TYPE = {
  BUILD_VILLAGE: 'BUILD_VILLAGE',
  BUILD_CASTLE: 'BUILD_CASTLE',
  BUILD_ARMY: 'BUILD_ARMY',
  ATTACK: 'ATTACK',
  SKIP: 'SKIP',
};
export const SERVICES_ENDPOINT = 'https://api.kingdom.higglerslab.com';
export const SOCKET_EVENT_ROLE_TYPE = {
  USER: 'USER',
};
export const SOCKET_EVENT_TYPE = {
  START_GAME: 'START_GAME',
  GAME_COMPLETED: 'GAME_COMPLETED',
  NEXT_ROUND: 'NEXT_ROUND',
};
export const SOCKET_EVENT = 'trigger';

export const END_TURN_RESOURCES_TEMPLATE = {
  lumber: 0,
  iron: 0,
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
  iron: 0,
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
