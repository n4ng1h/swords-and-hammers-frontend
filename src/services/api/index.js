import { v4 as uuidv4 } from 'uuid';
import { axiosInstance } from 'services/utils';
import { ACTION_TYPE } from 'constant';

export const takeTurn = async (gameId, actionType, addInfo) => {
  const bodyPayload = {
    gameId,
  };

  switch (actionType) {
    case ACTION_TYPE.BUILD_VILLAGE: {
      bodyPayload.type = 'BUILD_VILLAGE';
      break;
    }

    case ACTION_TYPE.BUILD_CASTLE: {
      bodyPayload.type = 'BUILD_CASTLE';
      break;
    }

    case ACTION_TYPE.BUILD_ARMY: {
      bodyPayload.type = 'TRAIN_ARMY';
      break;
    }

    case ACTION_TYPE.ATTACK: {
      bodyPayload.type = 'ATTACK_OPPONENT';
      bodyPayload.opponentId = addInfo;
      break;
    }

    case ACTION_TYPE.SKIP: {
      bodyPayload.type = 'SKIPPED';
      break;
    }

    default:
      break;
  }

  if (Object.keys(bodyPayload).length === 1) {
    return false;
  }

  try {
    await axiosInstance.post(`/api/v1/gameTurn`, bodyPayload);
    return true;
  } catch (error) {
    return false;
  }
};

export const joinGame = async (gameId, kingdomName) => {
  let uniqueDeviceId = localStorage.getItem('deviceId');
  if (!uniqueDeviceId) {
    uniqueDeviceId = uuidv4();
    localStorage.setItem('deviceId', uniqueDeviceId);
  }
  const bodyPayload = {
    uuid: uniqueDeviceId,
    gameName: kingdomName,
  };

  try {
    const { data } = await axiosInstance.patch(
      `/api/v1/games/${gameId}/join`,
      bodyPayload
    );
    localStorage.setItem('accessToken', data.accessToken);
    return data.scoreCard;
  } catch (error) {
    return null;
  }
};

export const getEventFeed = () => {};
