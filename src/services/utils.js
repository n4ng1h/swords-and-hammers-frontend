import axios from 'axios';
import { SERVICES_ENDPOINT } from 'constant';
import Content from 'content';

export const transformEventLogData = (_logs) => {
  if (_logs !== null) {
    let formattedLogs = '';
    _logs.forEach((entry) => {
      formattedLogs += `> ${entry.msg}\n\n`;
    });
    return formattedLogs;
  }
  return _logs;
};

export const transformRoundData = (data) => {
  try {
    const roundInfo = {
      currRound: 0,
      totalRounds: 0,
      currKingdomName: Content.kingdomNameLoading,
      gameStatus: null,
    };

    if (data !== null && typeof data !== 'undefined') {
      roundInfo.currRound = data.currentRound;
      roundInfo.totalRounds = data.totalRound;
      roundInfo.gameStatus = data.status;

      const deviceId = localStorage.getItem('deviceId');
      if (data.participants && deviceId) {
        const thisPtcp = data.participants.filter(
          (ptcp) => ptcp.uuid === deviceId
        );
        if (thisPtcp.length !== 0) {
          roundInfo.currKingdomName = thisPtcp[0].gameName;
        }
      }
    }
    return roundInfo;
  } catch (error) {
    return null;
  }
};

export const setTimerStart = () => {
  localStorage.removeItem('timerStart');
  localStorage.setItem('timerStart', Date.now());
};

export const getTimerLeft = (totalDuration) => {
  const TOTAL_DURATION_IN_MS = totalDuration * 1000;
  const timerStartAt = localStorage.getItem('timerStart');
  if (typeof timerStartAt === 'undefined' || timerStartAt === null) {
    return 0;
  }
  const timeElapsedInMs = Date.now() - parseInt(timerStartAt, 10);
  const isTimerOver = timeElapsedInMs > TOTAL_DURATION_IN_MS;
  if (isTimerOver) {
    return 0;
  }
  return Math.round((TOTAL_DURATION_IN_MS - timeElapsedInMs) / 1000);
};

export const getFirstUrlSection = (url) => {
  return url.replace(/^\/([^/]*).*$/, '$1');
};

export const axiosInstance = axios.create({
  baseURL: SERVICES_ENDPOINT,
  timeout: 1000 * 10,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intercept every request to check if the access token is expired
axiosInstance.interceptors.request.use(
  async (config) => {
    // eslint-disable-next-line no-param-reassign
    config.headers.Authorization = `Bearer ${localStorage.getItem(
      'accessToken'
    )}`;

    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    return Promise.reject(error.response.data.message.toString());
  }
);

export const fetcher = (...args) =>
  axiosInstance.get(...args).then((res) => res.data);
