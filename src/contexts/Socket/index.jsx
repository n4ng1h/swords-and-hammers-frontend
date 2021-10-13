/* eslint-disable no-unused-vars */
import { createContext } from 'react';
import SocketIOClient, { io } from 'socket.io-client';
import { SERVICES_ENDPOINT } from 'constant';

const socket = io(SERVICES_ENDPOINT);
// const socket = SocketIOClient.connect(SERVICES_ENDPOINT);
// const socket = socketio.connect(SERVICES_ENDPOINT);

const SocketContext = createContext({
  gameId: '',
  hasGameStarted: false,
  hasGameEnded: false,
  isRoundActive: false,
  isRoundCompleted: false,
  setEndTurn: () => {},
  shouldNotifyJoinGame: false,
  notifyJoinGame: () => {},
  socket,
});

export default SocketContext;
