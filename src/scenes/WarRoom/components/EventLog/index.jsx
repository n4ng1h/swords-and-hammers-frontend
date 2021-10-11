import { useContext, useRef } from 'react';
import ResourceContext from 'contexts/Resource';
import { Paper, TextField } from '@mui/material';
import styles from './styles';

const EventLog = () => {
  const textAreaRef = useRef();
  const { eventLog } = useContext(ResourceContext);

  return (
    <div>
      <Paper sx={styles.paper}>
        <TextField
          inputProps={{ ref: textAreaRef }}
          sx={styles.logText}
          multiline
          maxRows={7}
          value={eventLog}
        />
      </Paper>
    </div>
  );
};

export default EventLog;
