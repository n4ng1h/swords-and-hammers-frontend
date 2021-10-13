import { useContext, useEffect, useRef, useState } from 'react';
import RoundContext from 'contexts/Round';
import MiniBoard from 'components/MiniBoard';
import { getTimerLeft } from 'services/utils';
import Content from 'content';
import { takeTurn } from 'services/api';
import { ACTION_TYPE } from 'constant';

const Timer = () => {
  const { gameId, setEndTurn, isRoundActive } = useContext(RoundContext);
  const setInProgressRef = useRef(false);
  const [countdownValue, setCountdownValue] = useState(getTimerLeft(60));
  const reduceCountdown = () => {
    setInProgressRef.current = false;
    setCountdownValue((prevState) => prevState - 1);
  };
  const timerRef = useRef();

  // For initializing the timer's starting countdown value
  useEffect(() => {
    if (isRoundActive) {
      const checkedCountdownValue = getTimerLeft(60);
      if (checkedCountdownValue > 0) {
        setCountdownValue(checkedCountdownValue);
        setInProgressRef.current = true;
        // Clear any current countdowns
        clearInterval(timerRef.current);
        // Start the countdown
        timerRef.current = setInterval(reduceCountdown, 1000);
      }
    }
  }, [isRoundActive]);

  // For stopping the countdown
  useEffect(() => {
    // If we have run out of time
    // and we are not in the middle of setting a new timer
    if (countdownValue === 0 && !setInProgressRef.current) {
      // Clear the countdown timer
      clearInterval(timerRef.current);

      // If the round is still active, i.e. No action has been taken
      if (isRoundActive) {
        // SKIP TURN
        takeTurn(gameId, ACTION_TYPE.SKIP);
      }

      // END THE TURN
      setEndTurn();
    }
  }, [countdownValue, setEndTurn, isRoundActive, gameId]);

  return (
    <MiniBoard title={Content.timerTitle} content={String(countdownValue)} />
  );
};

export default Timer;
