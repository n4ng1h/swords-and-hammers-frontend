import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { GAME_STATUS, ROUTE_PATH } from 'constant';
import checkMatchingGameRoom from 'services/socket';
import { fetcher, getTimerLeft, getFirstUrlSection } from 'services/utils';
import useSWR, { mutate } from 'swr';
import RoundContext from 'contexts/Round';

const RoundProvider = ({ children }) => {
  const history = useHistory();
  const [gameData, setGameData] = useState({
    gameId: getFirstUrlSection(window.location.pathname),

    hasGameStarted: false,
    setGameStart: (rcvdGameId) => {
      setGameData((prevState) => ({
        ...prevState,
        hasGameStarted: checkMatchingGameRoom(prevState.gameId, rcvdGameId),
        isRoundActive: true,
      }));
    },
    hasGameEnded: false,
    setGameEnd: (rcvdGameId) => {
      setGameData((prevState) => ({
        ...prevState,
        hasGameEnded: checkMatchingGameRoom(prevState.gameId, rcvdGameId),
        isRoundActive: false,
      }));
      history.push(`/${gameData.gameId}${ROUTE_PATH.leaderboard}`);
    },
    isRoundActive: false,
    isRoundCompleted: false,
    setEndTurn: () => {
      setGameData((prevState) => ({
        ...prevState,
        isRoundActive: false,
      }));
    },
    setNextRound: () => {
      setGameData((prevState) => ({
        ...prevState,
        isRoundActive: true,
        isRoundCompleted: false,
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
    if (gameData.isRoundActive && !gameData.isRoundCompleted) {
      console.log('NEXT ROUND DETECTED: Calling 3 APIs');
      mutate(`/api/v1/games/${gameData.gameId}`);
      mutate(`/api/v1/games/${gameData.gameId}/feed`);
      mutate(`/api/v1/games/${gameData.gameId}/feed`);
    }
  }, [gameData.gameId, gameData.isRoundActive, gameData.isRoundCompleted]);

  return (
    <RoundContext.Provider value={gameData}>{children}</RoundContext.Provider>
  );
};

RoundProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RoundProvider;
