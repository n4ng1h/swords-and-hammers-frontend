import { useContext } from 'react';
import SocketContext from 'contexts/Socket';
import { Typography } from '@mui/material';
import styles from './styles';

const KingdomTitle = () => {
  const { currKingdomName } = useContext(SocketContext);

  return (
    <Typography variant="h4" sx={styles.text}>
      {currKingdomName}
    </Typography>
  );
};

export default KingdomTitle;
