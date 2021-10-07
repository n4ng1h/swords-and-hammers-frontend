import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import MiniBoard from 'components/MiniBoard';
import Content from 'content';

const TimerDisplay = ({ startCountdownFrom }) => {
  const [countdownValue, setCountdownValue] = useState(startCountdownFrom);
  const reduceCountdown = () => {
    setCountdownValue((prevState) => prevState - 1);
  };
  const timerRef = useRef();

  // Each time the startCountdownFrom changes, we reset the countdown timer
  // to presumably update the current countdown timer
  useEffect(() => {
    if (startCountdownFrom > 0) {
      // If we still have time, update the countdown
      timerRef.current = setInterval(reduceCountdown, 1000);
    } else {
      // TODO: If we receive 0 or less as the time remaining, send a notification to the backend
    }
  }, [startCountdownFrom]);

  useEffect(() => {
    if (countdownValue <= 0) {
      // Clear the countdown timer
      clearInterval(timerRef.current);
      // TODO: Send a notification to the backend
    }
  }, [countdownValue]);

  return (
    <MiniBoard title={Content.timerTitle} content={String(countdownValue)} />
  );
};

TimerDisplay.propTypes = {
  startCountdownFrom: PropTypes.number.isRequired,
};

export default TimerDisplay;
