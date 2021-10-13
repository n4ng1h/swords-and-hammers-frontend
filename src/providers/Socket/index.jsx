import PropTypes from 'prop-types';
import { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import {
  ROUTE_PATH,
  SOCKET_EVENT,
  SOCKET_EVENT_ROLE_TYPE,
  SOCKET_EVENT_TYPE,
  GAME_STATUS,
} from 'constant';
import checkMatchingGameRoom from 'services/socket';
import {
  setTimerStart,
  fetcher,
  getTimerLeft,
  getFirstUrlSection,
} from 'services/utils';
import SocketContext from 'contexts/Socket';
import useSWR, { mutate } from 'swr';

const SocketProvider = ({ children }) => {
  const { socket } = useContext(SocketContext);
  const history = useHistory();
  const [gameData, setGameData] = useState({
    gameId: getFirstUrlSection(window.location.pathname),

    hasGameStarted: false,
    hasGameEnded: false,
    isRoundActive: false,
    isRoundCompleted: false,
    setEndTurn: () => {
      setGameData((prevState) => ({
        ...prevState,
        isRoundActive: false,
      }));
    },

    shouldNotifyJoinGame: false,
    notifyJoinGame: () => {
      setGameData((prevState) => ({
        ...prevState,
        shouldNotifyJoinGame: true,
      }));
    },
  });

  // Cleanup function to ensure that the socket is disconnected
  // once the window is closed
  useEffect(() => {
    window.addEventListener('beforeunload', (ev) => {
      ev.preventDefault();
      socket.disconnect();
    });
  }, [socket]);

  const { data: retrievedGameData, error: retrievedGameError } = useSWR(
    `/api/v1/games/${gameData.gameId}`,
    fetcher,
    {
      revalidateOnFocus: false,
    }
  );

  useEffect(() => {
    if (
      retrievedGameData &&
      !retrievedGameError &&
      retrievedGameData !== null
    ) {
      setGameData((prevState) => ({
        ...prevState,
        hasGameStarted: retrievedGameData.status === GAME_STATUS.STARTED,
        hasGameEnded: retrievedGameData.status === GAME_STATUS.ENDED,
        isRoundActive:
          retrievedGameData.status === GAME_STATUS.STARTED &&
          retrievedGameData.status !== GAME_STATUS.ENDED &&
          getTimerLeft(60) > 0,
      }));
    }
  }, [retrievedGameData, retrievedGameError]);

  const { data: gameTurnData, error: gameTurnError } = useSWR(
    `/api/v1/gameTurn/${gameData.gameId}`,
    fetcher,
    {
      revalidateOnFocus: false,
    }
  );

  useEffect(() => {
    if (gameTurnData && !gameTurnError && gameTurnData !== null) {
      setGameData((prevState) => ({
        ...prevState,
        isRoundCompleted: gameTurnData.roundCompleted,
      }));
    }
  }, [gameTurnData, gameTurnError]);

  useEffect(() => {
    socket.on(SOCKET_EVENT, (resp) => {
      if (resp.role === SOCKET_EVENT_ROLE_TYPE.USER) {
        switch (resp.type) {
          case SOCKET_EVENT_TYPE.START_GAME: {
            console.log('START game event');
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
            console.log('COMPLETED game event');
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
            console.log('NEXT round event');
            setTimerStart();
            setGameData((prevState) => ({
              ...prevState,
              isRoundActive: true,
              isRoundCompleted: false,
            }));
            break;
          }

          default:
            break;
        }
      }
    });

    socket.emit('ADD_PLAYER', {
      gameId: gameData.gameId,
      uuid: localStorage.getItem('deviceId'),
    });
  }, [gameData, history, socket]);

  useEffect(() => {
    if (gameData.isRoundActive && !gameData.isRoundCompleted) {
      console.log('NEXT ROUND DETECTED: Calling 3 APIs');
      mutate(`/api/v1/games/${gameData.gameId}`);
      mutate(`/api/v1/games/${gameData.gameId}/feed`);
      mutate(`/api/v1/games/${gameData.gameId}/feed`);
    }
  }, [gameData.gameId, gameData.isRoundActive, gameData.isRoundCompleted]);

  return (
    <SocketContext.Provider value={gameData}>{children}</SocketContext.Provider>
  );
};

SocketProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default SocketProvider;
