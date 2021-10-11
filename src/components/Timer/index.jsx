import { useContext, useEffect, useRef, useState } from 'react';
import SocketContext from 'contexts/Socket';
import MiniBoard from 'components/MiniBoard';
import { getTimerLeft } from 'services/utils';
import Content from 'content';
import { takeTurn } from 'services/api';
import { ACTION_TYPE } from 'constant';

const Timer = () => {
  const { gameId, setEndTurn, isRoundActive } = useContext(SocketContext);
  const [hasTimerStarted, setTimerStarted] = useState(false);
  const [countdownValue, setCountdownValue] = useState(getTimerLeft(60));
  const reduceCountdown = () => {
    setCountdownValue((prevState) => prevState - 1);
  };
  const timerRef = useRef();

  // For initializing the timer's starting countdown value
  useEffect(() => {
    if (isRoundActive && !hasTimerStarted) {
      setCountdownValue(getTimerLeft(60));
      setTimerStarted(true);
    }
  }, [hasTimerStarted, isRoundActive]);

  // For triggering the countdown
  useEffect(() => {
    // If the countdown value is valid, and the timer is not yet started
    if (countdownValue > 0 && !hasTimerStarted) {
      // Start the countdown
      timerRef.current = setInterval(reduceCountdown, 1000);
    }
  }, [countdownValue, hasTimerStarted]);

  // For stopping the countdown
  useEffect(() => {
    // If we receive 0 or less as the time remaining
    // OR if the game has ended
    // If we have run out of time
    if (countdownValue <= 0 && isRoundActive) {
      // Clear the countdown timer
      clearInterval(timerRef.current);
      // END THE TURN
      setEndTurn();
      setTimerStarted(false);
      // SKIP TURN
      takeTurn(gameId, ACTION_TYPE.SKIP);
    }
  }, [countdownValue, setEndTurn, isRoundActive, gameId]);

  return (
    <MiniBoard title={Content.timerTitle} content={String(countdownValue)} />
  );
};

export default Timer;
