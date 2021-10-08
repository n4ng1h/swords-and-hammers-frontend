import { useEffect, useRef, useState } from 'react';
import { Paper, TextField } from '@mui/material';
import styles from './styles';

// TODO: Listen for new event logs and update the text field accordingly
const EventLog = () => {
  const textAreaRef = useRef();
  // eslint-disable-next-line no-unused-vars
  const [logs, setLogs] = useState('');
  useEffect(() => {
    // Probably create a subscription and a cleanup function
    // This is to scroll to the bottom of the text area once new messages are received
    textAreaRef.current.scrollTop = textAreaRef.current.scrollHeight;
  });

  return (
    <div>
      <Paper sx={styles.paper}>
        <TextField
          inputProps={{ ref: textAreaRef }}
          sx={styles.logText}
          multiline
          maxRows={7}
          value={logs}
        />
      </Paper>
    </div>
  );
};

export default EventLog;
