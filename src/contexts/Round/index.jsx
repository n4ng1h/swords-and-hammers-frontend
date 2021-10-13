/* eslint-disable no-unused-vars */
import { createContext } from 'react';

const RoundContext = createContext({
  gameId: '',
  hasGameStarted: false,
  setGameStart: (_gameId) => {},
  hasGameEnded: false,
  setGameEnd: (_gameId) => {},
  isRoundActive: false,
  isRoundCompleted: false,
  setEndTurn: () => {},
  setNextRound: () => {},
  shouldNotifyJoinGame: false,
  notifyJoinGame: () => {},
});

export default RoundContext;
