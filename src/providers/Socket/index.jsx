import PropTypes from 'prop-types';
import { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import SocketIOClient from 'socket.io-client';
import {
  ROUTE_PATH,
  SERVICES_ENDPOINT,
  SOCKET_EVENT,
  SOCKET_EVENT_ROLE_TYPE,
  SOCKET_EVENT_TYPE,
  GAME_STATUS,
} from 'constant';
import checkMatchingGameRoom from 'services/socket';
import { setTimerStart, fetcher, getTimerLeft } from 'services/utils';
import SocketContext from 'contexts/Socket';
import useSWR, { mutate } from 'swr';

const SocketProvider = ({ children }) => {
  const history = useHistory();
  const socketRef = useRef(SocketIOClient(SERVICES_ENDPOINT));
  const [gameData, setGameData] = useState({
    gameId: '',
    setGameId: (_gameId) => {
      setGameData((prevState) => ({
        ...prevState,
        gameId: _gameId,
      }));
    },

    hasGameStarted: false,
    hasGameEnded: false,
    isRoundActive: false,
    setEndTurn: () => {
      setGameData((prevState) => ({
        ...prevState,
        isRoundActive: false,
      }));
    },

    notifyJoinGame: () => {
      socketRef.current.emit('trigger', {
        gameId: gameData.gameId,
        uuid: localStorage.getItem('deviceId'),
      });
    },
  });

  const { data, error } = useSWR(`/api/v1/games/${gameData.gameId}`, fetcher, {
    revalidateOnFocus: false,
  });

  useEffect(() => {
    if (data && !error && data !== null) {
      setGameData((prevState) => ({
        ...prevState,
        hasGameStarted: data.status === GAME_STATUS.STARTED,
        hasGameEnded: data.status === GAME_STATUS.ENDED,
        isRoundActive:
          data.status === GAME_STATUS.STARTED &&
          data.status !== GAME_STATUS.ENDED &&
          getTimerLeft(60) > 0,
      }));
    }
  }, [data, error]);

  useEffect(() => {
    const intSocketRef = socketRef.current;
    intSocketRef.on(SOCKET_EVENT, (resp) => {
      if (resp.role === SOCKET_EVENT_ROLE_TYPE.USER) {
        switch (resp.type) {
          case SOCKET_EVENT_TYPE.START_GAME: {
            setTimerStart();
            setGameData((prevState) => ({
              ...prevState,
              hasGameStarted: checkMatchingGameRoom(
                prevState.gameId,
                resp.GameId
              ),
              isRoundActive: true,
            }));
            break;
          }

          case SOCKET_EVENT_TYPE.GAME_COMPLETED: {
            setGameData((prevState) => ({
              ...prevState,
              hasGameEnded: checkMatchingGameRoom(
                prevState.gameId,
                resp.GameId
              ),
              isRoundActive: false,
            }));
            history.push(`/${gameData.gameId}${ROUTE_PATH.leaderboard}`);
            break;
          }

          case SOCKET_EVENT_TYPE.NEXT_ROUND: {
            mutate(`/api/v1/games/${gameData.gameId}`);
            setTimerStart();
            setGameData((prevState) => ({
              ...prevState,
              isRoundActive: true,
            }));
            break;
          }

          default:
            break;
        }
      }
    });

    // Cleanup to ensure that we disconnect from the socket
    return () => {
      intSocketRef.disconnect();
    };
  }, [gameData.gameId, history]);

  return (
    <SocketContext.Provider value={gameData}>{children}</SocketContext.Provider>
  );
};

SocketProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default SocketProvider;
