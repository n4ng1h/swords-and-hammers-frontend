import PropTypes from 'prop-types';
import { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
// import SocketIOClient from 'socket.io-client';
import {
  ROUTE_PATH,
  // SERVICES_ENDPOINT,
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
  const history = useHistory();
  const socket = useContext(SocketContext);
  // const socket = SocketIOClient(SERVICES_ENDPOINT);
  // console.log(socket)
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

  const { data: retrievedGameData, error: retrievedGameError } = useSWR(
    `/api/v1/games/${gameData.gameId}`,
    fetcher,
    {
      revalidateOnFocus: false,
    }
  );

  useEffect(() => {
    console.log("test");
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
    socket.socket.on(SOCKET_EVENT, (resp) => {
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
            mutate(`/api/v1/games/${gameData.gameId}/feed`);
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

    socket.socket.emit('ADD_PLAYER', {
      gameId: gameData.gameId,
      uuid: localStorage.getItem('deviceId'),
    });

    // Cleanup to ensure that we disconnect from the socket
    return () => {
      // socket.socket.disconnect();
    };
  }, [gameData.gameId, history, gameData.shouldNotifyJoinGame]);

  return (
    <SocketContext.Provider value={gameData}>{children}</SocketContext.Provider>
  );
};

SocketProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default SocketProvider;
