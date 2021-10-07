import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import MiniBoard from 'components/MiniBoard';
import Content from 'content';
import { DEFAULT_ROUND_DISPLAY } from 'constant';

const GameRoundDisplay = ({ currRound, maxRounds }) => {
  const [displayContent, setDisplayContent] = useState(DEFAULT_ROUND_DISPLAY);

  useEffect(() => {
    setDisplayContent(`${String(currRound)} / ${String(maxRounds)}`);
  }, [currRound, maxRounds]);

  return <MiniBoard title={Content.roundTitle} content={displayContent} />;
};

GameRoundDisplay.propTypes = {
  currRound: PropTypes.number.isRequired,
  maxRounds: PropTypes.number.isRequired,
};

export default GameRoundDisplay;
