/* eslint-disable no-unused-vars */
import PropTypes from 'prop-types';
import { Avatar, Box, ButtonBase, Grid, Typography } from '@mui/material';
import ActionResources from 'components/Action/Resources';
import CurrentOwned from 'components/Action/CurrentOwned';
import { styled } from '@mui/material/styles';
import styles from './styles';

const ActionButton = styled(ButtonBase)(() => styles.btn);

const Action = ({
  btnImg,
  btnCaption,
  resourceCost,
  numOwned,
  onClick,
  disableNumOwned,
  disabled,
}) => {
  return (
    <Box>
      <CurrentOwned disableNumOwned={disableNumOwned} numOwned={numOwned} />
      <ActionButton onClick={onClick} disabled={disabled}>
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
    </Box>
  );
};

Action.defaultProps = {
  onClick: null,
  resourceCost: null,
  disableNumOwned: false,
  numOwned: null,
  disabled: false,
};

Action.propTypes = {
  btnImg: PropTypes.string.isRequired,
  btnCaption: PropTypes.string.isRequired,
  resourceCost: PropTypes.shape({
    steel: PropTypes.number.isRequired,
    lumber: PropTypes.number.isRequired,
    gold: PropTypes.number.isRequired,
  }),
  numOwned: PropTypes.number,
  onClick: PropTypes.func,
  disableNumOwned: PropTypes.bool,
  disabled: PropTypes.bool,
};

export default Action;
