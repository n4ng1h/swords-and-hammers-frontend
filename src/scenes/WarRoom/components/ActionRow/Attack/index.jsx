import PropTypes from 'prop-types';
import { useContext, useState } from 'react';
import { Typography } from '@mui/material';
import SocketContext from 'contexts/Socket';
import ResourceContext from 'contexts/Resource';
import Action from 'components/Action';
import Loading from 'components/Loading';
import AttackImage from 'assets/images/buttons/attack.png';
import Content from 'content';
import { ACTION_TYPE, INFO_DIALOG_TYPE } from 'constant';
import InfoDialog from 'components/InfoDialog';
import { fetchEventLogs, fetchOpponentList, takeTurn } from 'services/api';
import AttackList from './AttackList';
import PreAttack from './PreAttack';
import styles from './styles';

const AttackKingdom = ({ numOwned }) => {
  const { gameId, setEndTurn } = useContext(SocketContext);
  const { setEventLog } = useContext(ResourceContext);
  const [isLoading, setIsLoading] = useState(false);
  const [playerList, setPlayerList] = useState([]);
  const [oppIdx, setOppIdx] = useState(0);

  const refreshLogs = async () => {
    setEventLog(await fetchEventLogs(gameId));
  };

  const prepareAttackList = async () => {
    // Set page to loading
    setIsLoading(true);
    const attackStats = await fetchOpponentList(gameId);
    if (attackStats !== null) {
      setPlayerList(attackStats);
    }
    // Remove the loading screen
    setIsLoading(false);
  };

  const [isAttackListOpen, setAttackListOpen] = useState(false);
  const handleOpenAttackList = async () => {
    await prepareAttackList();
    setAttackListOpen(true);
  };
  const handleCloseAttackList = () => {
    setAttackListOpen(false);
  };

  const [isPreAttackOpen, setPreAttackOpen] = useState(false);
  const handleOpenPreAttack = () => {
    setPreAttackOpen(true);
  };
  const handleClosePreAttack = () => {
    setPreAttackOpen(false);
  };

  const checkPreAttackStats = async () => {
    // Close the AttackList
    handleCloseAttackList();

    // Open the PreAttack dialog
    handleOpenPreAttack();
  };

  const [infoDialogType, setInfoDialogType] = useState(null);
  const [isInfoDialogOpen, setInfoDialogOpen] = useState(false);
  const handleOpenInfoDialog = () => {
    setInfoDialogOpen(true);
  };
  const handleCloseInfoDialog = () => {
    setInfoDialogOpen(false);
    setInfoDialogType(null);
  };

  const attackAnOpponent = async () => {
    const attackOutcome = await takeTurn(
      gameId,
      ACTION_TYPE.ATTACK,
      playerList[oppIdx].participantId
    );
    return attackOutcome;
  };

  const performAttack = async () => {
    // Set the page to loading
    setIsLoading(true);
    const isAttackSuccess = await attackAnOpponent();
    refreshLogs();
    // If the attack is not successful (e.g. Player is already being attacked)
    // Set the error display dialog
    if (!isAttackSuccess) {
      setInfoDialogType(INFO_DIALOG_TYPE.ALR_ATTACKED);
    } else {
      setEndTurn();
      // Else set the attack success dialog
      setInfoDialogType(INFO_DIALOG_TYPE.ATTACKED);
    }
    // Remove the loading screen
    setIsLoading(false);
    // Display the response dialog
    handleOpenInfoDialog();
  };

  return (
    <div>
      <Loading open={isLoading} msg={Content.fetchingOppStats} />
      {infoDialogType ? (
        <InfoDialog
          open={isInfoDialogOpen}
          closeDialog={handleCloseInfoDialog}
          title={Content.attackOutcome[infoDialogType].title}
          content={
            <Typography sx={styles.infoDialogDescText}>
              {Content.attackOutcome[infoDialogType].desc}
            </Typography>
          }
        />
      ) : null}
      <PreAttack
        open={isPreAttackOpen}
        closeDialog={handleClosePreAttack}
        oppStats={playerList[oppIdx]}
        performAttack={performAttack}
      />
      <AttackList
        open={isAttackListOpen}
        closeDialog={handleCloseAttackList}
        contentArray={playerList}
        nextStep={checkPreAttackStats}
        updateTargetOpponent={setOppIdx}
      />
      <Action
        btnImg={AttackImage}
        btnCaption={Content.action.attack}
        disableNumOwned
        disabled={numOwned <= 0}
        onClick={handleOpenAttackList}
      />
    </div>
  );
};

AttackKingdom.propTypes = {
  numOwned: PropTypes.number.isRequired,
};

export default AttackKingdom;
