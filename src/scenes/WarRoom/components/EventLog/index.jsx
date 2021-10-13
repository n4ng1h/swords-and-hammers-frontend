import { useContext, useEffect, useRef, useState } from 'react';
import RoundContext from 'contexts/Round';
import { Paper, TextField } from '@mui/material';
import useSWR from 'swr';
import { fetcher, transformEventLogData } from 'services/utils';
import styles from './styles';

const EventLog = () => {
  const textAreaRef = useRef();
  const { gameId } = useContext(RoundContext);
  const [displayLog, setDisplayLog] = useState([]);
  const { data } = useSWR(`/api/v1/games/${gameId}/feed`, fetcher, {
    revalidateOnFocus: false,
  });

  useEffect(() => {
    if (data) {
      setDisplayLog(transformEventLogData(data));
    }
  }, [data]);

  // useEffect(() => {
  //   if (error) {
  //     console.log(
  //       `Error encountered while fetching /api/v1/games/${gameId}/feed: ${JSON.stringify(
  //         error
  //       )}`
  //     );
  //   }
  // }, [error, gameId]);

  return (
    <div>
      <Paper sx={styles.paper}>
        <TextField
          inputProps={{ ref: textAreaRef }}
          sx={styles.logText}
          multiline
          maxRows={7}
          value={displayLog}
        />
      </Paper>
    </div>
  );
};

export default EventLog;
