import { useContext, useRef } from 'react';
import ResourceContext from 'contexts/Resource';
import ViewContext from 'contexts/View';
import { Paper, TextField } from '@mui/material';
import styles from './styles';

const EventLog = () => {
  const textAreaRef = useRef();
  const { eventLog } = useContext(ResourceContext);
  const { isMobileView } = useContext(ViewContext);

  return (
    <div>
      <Paper sx={isMobileView ? styles.paperMobile : styles.paperWeb}>
        <TextField
          inputProps={{ ref: textAreaRef }}
          sx={isMobileView ? styles.logTextMobile : styles.logTextWeb}
          multiline
          maxRows={7}
          value={eventLog}
        />
      </Paper>
    </div>
  );
};

export default EventLog;
