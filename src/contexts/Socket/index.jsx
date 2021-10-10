/* eslint-disable no-unused-vars */
import { createContext } from 'react';

const SocketContext = createContext({
  gameId: '',
  setGameId: (_gameId) => {},
});

export default SocketContext;
