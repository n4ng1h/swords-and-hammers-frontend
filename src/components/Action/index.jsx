/* eslint-disable no-unused-vars */
import PropTypes from 'prop-types';
import { Avatar, Box, ButtonBase, Grid, Typography } from '@mui/material';
import ActionResources from 'components/Action/Resources';
import { styled } from '@mui/material/styles';
import styles from './styles';

const ActionButton = styled(ButtonBase)(() => styles.btn);

const Action = ({ btnImg, btnCaption, resourceCost, numOwned, onClick }) => {
  return (
    <ActionButton onClick={onClick}>
      <Grid container direction="column">
        <Grid item>
          <Box sx={styles.board}>
            <Box sx={styles.btnContent}>
              <Avatar src={btnImg} sx={styles.innerImg} />
              <Typography sx={styles.innerText} variant="h6">
                {btnCaption}
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item>
          <ActionResources resourceCost={resourceCost} />
        </Grid>
      </Grid>
    </ActionButton>
  );
};

Action.defaultProps = {
  onClick: null,
  resourceCost: null,
};

Action.propTypes = {
  btnImg: PropTypes.string.isRequired,
  btnCaption: PropTypes.string.isRequired,
  resourceCost: PropTypes.shape({
    steel: PropTypes.number.isRequired,
    lumber: PropTypes.number.isRequired,
    gold: PropTypes.number.isRequired,
  }),
  numOwned: PropTypes.number.isRequired,
  onClick: PropTypes.func,
};

export default Action;
