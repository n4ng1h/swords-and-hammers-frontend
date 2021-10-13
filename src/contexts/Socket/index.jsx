import { createContext } from 'react';
import { io } from 'socket.io-client';
import { SERVICES_ENDPOINT } from 'constant';

export const socket = io(SERVICES_ENDPOINT);
const SocketContext = createContext(socket);

export default SocketContext;
