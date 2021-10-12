/* eslint-disable no-unused-vars */
import { createContext } from 'react';

const SocketContext = createContext({
  gameId: '',
  hasGameStarted: false,
  hasGameEnded: false,
  isRoundActive: false,
  isRoundCompleted: false,
  setEndTurn: () => {},
  shouldNotifyJoinGame: false,
  notifyJoinGame: () => {},
});

export default SocketContext;
