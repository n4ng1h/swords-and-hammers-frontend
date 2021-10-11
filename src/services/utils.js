import axios from 'axios';
import { SERVICES_ENDPOINT } from 'constant';

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

async function refreshAccessToken() {
  try {
    const body = {
      accessToken: localStorage.getItem('accessToken'),
      refreshToken: localStorage.getItem('refreshToken'),
    };
    const result = await axios.post(
      `${SERVICES_ENDPOINT}/api/v1/users/auth/refreshToken`,
      body
    );

    if (result.status === 201) {
      localStorage.setItem('accessToken', result.data.accessToken);
      localStorage.setItem('refreshToken', result.data.refreshToken);
      localStorage.setItem(
        'expiresAt',
        (Date.now() + 1000 * 60 * 15).toString()
      );
    }
  } catch (e) {
    console.log(e);
    console.log('Navigate to login and clear everything');
    localStorage.clearItem('accessToken');
    localStorage.clearItem('refreshToken');
    localStorage.clearItem('expiresAt');
  }
}

// Intercept every request to check if the access token is expired
axiosInstance.interceptors.request.use(
  async (config) => {
    const expiresAt = localStorage.getItem('expiresAt');
    // eslint-disable-next-line radix
    const isExpired = Date.now() > parseInt(expiresAt ?? '');
    if (isExpired) {
      console.log('Refreshing');
      await refreshAccessToken();
    }
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
    console.log('ERROR RESPONSE:', error.response);
    return Promise.reject(error.response.data.message.toString());
  }
);
