/* eslint-disable no-unused-vars */
import PropTypes from 'prop-types';
import { useContext } from 'react';
import ViewContext from 'contexts/View';
import { Avatar, Box, ButtonBase, Grid, Typography } from '@mui/material';
import ActionResources from 'components/Action/Resources';
import CurrentOwned from 'components/Action/CurrentOwned';
import { styled } from '@mui/material/styles';
import styles from './styles';

const ActionButton = styled(ButtonBase, {
  shouldForwardProp: (prop) => prop !== 'isMobileView',
})(({ isMobileView }) => (isMobileView ? styles.btnMobile : styles.btn));

const Action = ({
  btnImg,
  btnCaption,
  resourceCost,
  numOwned,
  onClick,
  disableNumOwned,
  disabled,
}) => {
  const { isMobileView } = useContext(ViewContext);

  return (
    <Box>
      <CurrentOwned disableNumOwned={disableNumOwned} numOwned={numOwned} />
      <ActionButton
        onClick={onClick}
        disabled={disabled}
        isMobileView={isMobileView}
      >
        <Grid container direction="column" alignItems="stretch">
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
    iron: PropTypes.number.isRequired,
    lumber: PropTypes.number.isRequired,
    gold: PropTypes.number.isRequired,
  }),
  numOwned: PropTypes.number,
  onClick: PropTypes.func,
  disableNumOwned: PropTypes.bool,
  disabled: PropTypes.bool,
};

export default Action;
