import PropTypes from 'prop-types';
import { useContext } from 'react';
import ViewContext from 'contexts/View';
import { Box, Grid, Typography } from '@mui/material';
import styles from './styles';

const MiniBoard = ({ title, content }) => {
  const { isMobileView } = useContext(ViewContext);

  return (
    <Box sx={isMobileView ? styles.boardMobile : styles.boardWeb}>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignContent="center"
        sx={isMobileView ? styles.contentMobile : styles.contentWeb}
      >
        <Grid
          item
          sx={
            isMobileView
              ? styles.contentElementMobile
              : styles.contentElementWeb
          }
        >
          <Typography sx={styles.text} variant="body">
            {title}
          </Typography>
        </Grid>
        <Grid item sx={styles.contentElement}>
          <Typography sx={styles.text}>{content}</Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

MiniBoard.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.node.isRequired,
};

export default MiniBoard;
