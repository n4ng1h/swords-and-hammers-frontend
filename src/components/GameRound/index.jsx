import { useContext, useEffect } from 'react';
import SocketContext from 'contexts/Socket';
import GameRoundDisplay from 'components/GameRound/Display';
import { fetchRoundInfo } from 'services/api';

const GameRound = () => {
  const { currRound, totalRounds, setRoundInfo } = useContext(SocketContext);

  useEffect(() => {
    const getRoundInfo = async () => {
      const roundInfo = await fetchRoundInfo();
      if (roundInfo !== null) {
        setRoundInfo(roundInfo.currRound, roundInfo.totalRounds);
      }
    };

    if (currRound === 0) {
      getRoundInfo();
    }
  }, [setRoundInfo, currRound]);

  return <GameRoundDisplay currRound={currRound} maxRounds={totalRounds} />;
};

export default GameRound;
