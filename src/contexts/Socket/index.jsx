/* eslint-disable no-unused-vars */
import { createContext } from 'react';

const SocketContext = createContext({
  gameId: '',
  setGameId: (_gameId) => {},
  hasGameStarted: false,
  hasGameEnded: false,
  isRoundActive: false,
  setEndTurn: () => {},
});

export default SocketContext;
