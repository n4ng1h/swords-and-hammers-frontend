/* eslint-disable no-unused-vars */
import { createContext } from 'react';

const SocketContext = createContext({
  gameId: '',
  setGameId: (_gameId) => {},
  hasGameStarted: false,
  hasGameEnded: false,
  isRoundActive: false,
  setEndTurn: () => {},
  currKingdomName: '',
  currRound: 0,
  totalRounds: 0,
  setRoundInfo: (_currRound, _totalRounds) => {},
});

export default SocketContext;
