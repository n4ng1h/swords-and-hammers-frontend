/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import TimerDisplay from 'components/Timer/Display';

const Timer = () => {
  // Time in seconds
  const [timeLeft, setTimeLeft] = useState(3);

  // TODO: First time we render this component:
  // Check if there is a current timer state in the cookie
  // Otherwise, perform a fetch from the backend
  useEffect(() => {
    // Update the time left to commence displaying
    // Store the local timestamp at which the round start flag is
    // received from the backend in the cookie
    // timeLeft = timeNow - storedTimeStamp
    // Remember to update the cookie
  }, []);

  return <TimerDisplay startCountdownFrom={timeLeft} />;
};

export default Timer;
