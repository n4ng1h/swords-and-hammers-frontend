import PropTypes from 'prop-types';
import { useCallback, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import SocketIOClient from 'socket.io-client';
import {
  ROUTE_PATH,
  SERVICES_ENDPOINT,
  SOCKET_EVENT,
  SOCKET_EVENT_ROLE_TYPE,
  SOCKET_EVENT_TYPE,
} from 'constant';
import { checkGameStarted } from 'services/socket';
import { setTimerStart } from 'services/utils';
import { fetchRoundInfo } from 'services/api';
import SocketContext from 'contexts/Socket';

const SocketProvider = ({ children }) => {
  const history = useHistory();
  const [data, setData] = useState({
    gameId: '',
    setGameId: (_gameId) => {
      setData((prevState) => ({
        ...prevState,
        gameId: _gameId,
      }));
    },

    hasGameStarted: false,
    hasGameEnded: false,
    isRoundActive: false,
    setEndTurn: () => {
      setData((prevState) => ({
        ...prevState,
        isRoundActive: false,
      }));
    },

    currRound: 0,
    totalRounds: 0,
    setRoundInfo: (currRound, totalRounds) => {
      setData((prevState) => ({
        ...prevState,
        currRound,
        totalRounds,
      }));
    },
  });

  // For fetching the round information
  const getRoundInfo = useCallback(async () => {
    const roundInfo = await fetchRoundInfo();
    if (roundInfo !== null) {
      data.setRoundInfo(roundInfo.currRound, roundInfo.totalRounds);
    }
  }, [data]);

  useEffect(() => {
    getRoundInfo();
  }, [getRoundInfo]);

  useEffect(() => {
    const socket = SocketIOClient(SERVICES_ENDPOINT);
    socket.on(SOCKET_EVENT, (resp) => {
      if (resp.role === SOCKET_EVENT_ROLE_TYPE.USER) {
        switch (resp.type) {
          case SOCKET_EVENT_TYPE.START_GAME: {
            setTimerStart();
            setData((prevState) => ({
              ...prevState,
              hasGameStarted: checkGameStarted(prevState.gameId, resp.GameId),
              isRoundActive: true,
            }));
            break;
          }

          case SOCKET_EVENT_TYPE.GAME_COMPLETED: {
            setData((prevState) => ({
              ...prevState,
              hasGameEnded: true,
              isRoundActive: false,
            }));
            history.push(`/${data.gameId}${ROUTE_PATH.leaderboard}`);
            break;
          }

          case SOCKET_EVENT_TYPE.NEXT_ROUND: {
            getRoundInfo();
            setTimerStart();
            setData((prevState) => ({
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
      socket.disconnect();
    };
  }, [data.gameId, getRoundInfo, history]);

  return (
    <SocketContext.Provider value={data}>{children}</SocketContext.Provider>
  );
};

SocketProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default SocketProvider;
