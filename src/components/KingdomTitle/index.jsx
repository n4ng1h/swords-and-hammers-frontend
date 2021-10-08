/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import Content from 'content';
import styles from './styles';

const KingdomTitle = () => {
  const [kingdomName, setKingdomName] = useState(Content.kingdomNameLoading);
  useEffect(() => {
    // TODO: Retrieve the user's kingdom name from the API
  }, []);

  return (
    <Typography variant="h4" sx={styles.text}>
      {kingdomName}
    </Typography>
  );
};

export default KingdomTitle;
