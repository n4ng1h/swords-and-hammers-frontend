import PropTypes from 'prop-types';
import { useContext, useEffect, useState } from 'react';
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
import RoundContext from 'contexts/Round';
import ViewContext from 'contexts/View';
import CloseIcon from '@mui/icons-material/Close';
import CustomButton from 'components/CustomButton';
import { BUTTON_TYPE } from 'constant';
import Content from 'content';
import useSWR from 'swr';
import { fetcher } from 'services/utils';
import Loading from 'components/Loading';
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

const AttackList = ({ open, closeDialog, updateTargetOpponent, nextStep }) => {
  const { isMobileView } = useContext(ViewContext);
  const { gameId } = useContext(RoundContext);
  const [isListReady, setIsListReady] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [opponentList, setOpponentList] = useState([]);
  const { data, error } = useSWR(`/api/v1/games/${gameId}/opponents`, fetcher, {
    revalidateOnFocus: false,
  });

  useEffect(() => {
    if (data && !error) {
      setOpponentList(data);
      setIsListReady(true);
    } else {
      setIsListReady(false);
    }
  }, [data, error]);

  // useEffect(() => {
  //   if (error) {
  //     console.log(
  //       `Error encountered while fetching /api/v1/games/${gameId}/opponents: ${JSON.stringify(
  //         error
  //       )}`
  //     );
  //   }
  // }, [error, gameId]);

  const selectTargetOpponent = (oppIdx) => {
    setSelectedRow(oppIdx);
    updateTargetOpponent(opponentList[oppIdx]);
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
    <>
      <Loading open={!isListReady && open} msg={Content.fetchingOppStats} />
      <Backdrop
        open={open && isListReady}
        onClose={closeAndReset}
        sx={styles.backdrop}
      >
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
              sx={isMobileView ? styles.closeBtnMobile : styles.closeBtn}
              onClick={closeAndReset}
            >
              <CloseIcon sx={styles.closeIcon} />
            </CustomButton>
            <Box sx={isMobileView ? styles.listMobile : styles.list}>
              <List>
                {opponentList.map((user, idx) => (
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
    </>
  );
};

AttackList.propTypes = {
  open: PropTypes.bool.isRequired,
  closeDialog: PropTypes.func.isRequired,
  nextStep: PropTypes.func.isRequired,
  updateTargetOpponent: PropTypes.func.isRequired,
};

export default AttackList;
