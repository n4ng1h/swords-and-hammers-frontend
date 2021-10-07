/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import GameRoundDisplay from 'components/GameRound/Display';

const GameRound = () => {
  const [currRound, setCurrRound] = useState(1);
  const [maxRounds, setMaxRounds] = useState(999);

  // TODO: First time this component renders, retrieve the round information
  useEffect(() => {}, []);

  return <GameRoundDisplay currRound={currRound} maxRounds={maxRounds} />;
};

export default GameRound;
