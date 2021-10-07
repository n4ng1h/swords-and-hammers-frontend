/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import Content from 'content';

const KingdomTitle = () => {
  const [kingdomName, setKingdomName] = useState(Content.kingdomNameLoading);
  useEffect(() => {
    // TODO: Retrieve the user's kingdom name from the API
  }, []);

  return <Typography variant="h5">{kingdomName}</Typography>;
};

export default KingdomTitle;
