import PropTypes from 'prop-types';
import { useContext, useState } from 'react';
import { Typography } from '@mui/material';
import SocketContext from 'contexts/Socket';
import Action from 'components/Action';
import Loading from 'components/Loading';
import AttackImage from 'assets/images/buttons/attack.png';
import Content from 'content';
import { ACTION_TYPE, INFO_DIALOG_TYPE } from 'constant';
import InfoDialog from 'components/InfoDialog';
import { takeTurn } from 'services/api';
import { useSWRConfig } from 'swr';
import AttackList from './AttackList';
import PreAttack from './PreAttack';
import styles from './styles';

const AttackKingdom = ({ numOwned }) => {
  const { gameId, setEndTurn } = useContext(SocketContext);
  const { mutate } = useSWRConfig();

  const [opponent, setOpponent] = useState(null);

  const refreshLogs = () => {
    mutate(`/api/v1/games/${gameId}/feed`);
  };

  const [isAttackListOpen, setIsAttackListOpen] = useState(false);
  const handleOpenAttackList = () => {
    setIsAttackListOpen(true);
  };
  const handleCloseAttackList = () => {
    setIsAttackListOpen(false);
  };

  const [isPreAttackOpen, setPreAttackOpen] = useState(false);
  const handleOpenPreAttack = () => {
    setPreAttackOpen(true);
  };
  const handleClosePreAttack = () => {
    setPreAttackOpen(false);
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

  const [isLoading, setIsLoading] = useState(false);
  const attackAnOpponent = async () => {
    const attackOutcome = await takeTurn(
      gameId,
      ACTION_TYPE.ATTACK,
      opponent.participantId
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
      setIsAttackListOpen(false);
    }
    // Remove the loading screen
    setIsLoading(false);
    // Display the response dialog
    handleOpenInfoDialog();
  };

  return (
    <div>
      <Loading open={isLoading} msg={Content.attackingOpp} />
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
        oppStats={opponent}
        performAttack={performAttack}
      />
      <AttackList
        open={isAttackListOpen}
        closeDialog={handleCloseAttackList}
        nextStep={handleOpenPreAttack}
        updateTargetOpponent={setOpponent}
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
