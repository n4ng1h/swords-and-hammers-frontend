import PropTypes from 'prop-types';
import { useState } from 'react';
import {
  Backdrop,
  Box,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Radio,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CustomButton from 'components/CustomButton';
import { BUTTON_TYPE } from 'constant';
import Content from 'content';
import styles from './styles';

const RowItemRenderer = ({ user, currSelected, setSelected, rowIdx }) => {
  if (user === null) {
    return null;
  }

  return (
    <ListItem>
      <ListItemButton onClick={setSelected}>
        <ListItemIcon>
          <Radio
            value={rowIdx}
            checked={currSelected === rowIdx}
            sx={styles.radio}
          />
        </ListItemIcon>
        <ListItemText
          sx={styles.itemText}
          primary={`Kingdom of ${user.gameName}`}
        />
      </ListItemButton>
    </ListItem>
  );
};

RowItemRenderer.defaultProps = {
  user: null,
  currSelected: null,
};

RowItemRenderer.propTypes = {
  user: PropTypes.shape({
    chanceOfWinning: PropTypes.number.isRequired,
    defenderCard: PropTypes.shape({
      village: PropTypes.number.isRequired,
      castle: PropTypes.number.isRequired,
      army: PropTypes.number.isRequired,
    }),
    _id: PropTypes.string.isRequired,
    uuid: PropTypes.string.isRequired,
    gameName: PropTypes.string.isRequired,
    participantId: PropTypes.string.isRequired,
  }),
  currSelected: PropTypes.number,
  setSelected: PropTypes.func.isRequired,
  rowIdx: PropTypes.number.isRequired,
};

const AttackList = ({
  open,
  contentArray,
  closeDialog,
  updateTargetOpponent,
  nextStep,
}) => {
  const [selectedRow, setSelectedRow] = useState(null);

  const selectTargetOpponent = (oppIdx) => {
    setSelectedRow(oppIdx);
    updateTargetOpponent(oppIdx);
  };

  const performNextStep = () => {
    if (selectedRow !== null) {
      nextStep();
    }
  };

  const closeAndReset = () => {
    setSelectedRow(null);
    closeDialog();
  };

  return (
    <Backdrop open={open} onClose={closeAndReset} sx={styles.backdrop}>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={2}
        sx={styles.gridContainer}
      >
        <Grid item>
          <CustomButton
            btnType={BUTTON_TYPE.SMALL}
            sx={styles.closeBtn}
            onClick={closeAndReset}
          >
            <CloseIcon sx={styles.closeIcon} />
          </CustomButton>
          <Box sx={styles.list}>
            <List>
              {contentArray.map((user, idx) => (
                <div key={user.participantId}>
                  <RowItemRenderer
                    user={user}
                    currSelected={selectedRow}
                    setSelected={() => {
                      selectTargetOpponent(idx);
                    }}
                    rowIdx={idx}
                  />
                  <Divider />
                </div>
              ))}
            </List>
          </Box>
        </Grid>
        <Grid item>
          <CustomButton
            btnType={BUTTON_TYPE.ENTER}
            disabled={selectedRow === null}
            onClick={() => {
              performNextStep(selectedRow);
            }}
          >
            {Content.attackBtn}
          </CustomButton>
        </Grid>
      </Grid>
    </Backdrop>
  );
};

AttackList.defaultProps = {
  contentArray: [],
};

AttackList.propTypes = {
  open: PropTypes.bool.isRequired,
  contentArray: PropTypes.arrayOf(
    PropTypes.shape({
      chanceOfWinning: PropTypes.number.isRequired,
      defenderCard: PropTypes.shape({
        village: PropTypes.number.isRequired,
        castle: PropTypes.number.isRequired,
        army: PropTypes.number.isRequired,
      }),
      _id: PropTypes.string.isRequired,
      uuid: PropTypes.string.isRequired,
      gameName: PropTypes.string.isRequired,
      participantId: PropTypes.string.isRequired,
    })
  ),
  closeDialog: PropTypes.func.isRequired,
  nextStep: PropTypes.func.isRequired,
  updateTargetOpponent: PropTypes.func.isRequired,
};

export default AttackList;
