import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import Action from 'components/Action';
import Loading from 'components/Loading';
import AttackImage from 'assets/images/buttons/attack.png';
import Content from 'content';
import { OPPONENT_STATS_TEMPLATE, INFO_DIALOG_TYPE } from 'constant';
import InfoDialog from 'components/InfoDialog';
import AttackList from './AttackList';
import PreAttack from './PreAttack';
import styles from './styles';

const AttackKingdom = ({ numOwned }) => {
  const [isAttackListOpen, setAttackListOpen] = useState(false);
  const handleOpenAttackList = () => {
    setAttackListOpen(true);
  };
  const handleCloseAttackList = () => {
    setAttackListOpen(false);
  };

  const [isPreAttackOpen, setPreAttackOpen] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const handleOpenPreAttack = () => {
    setPreAttackOpen(true);
  };
  const handleClosePreAttack = () => {
    setPreAttackOpen(false);
  };

  const [isLoading, setIsLoading] = useState(false);
  // TODO: Update the opponent stats from the fetched server data
  // eslint-disable-next-line no-unused-vars
  const [oppStats, setOppStats] = useState(OPPONENT_STATS_TEMPLATE);

  // eslint-disable-next-line no-unused-vars
  const checkPreAttackStats = (playerId) => {
    // Close the AttackList
    handleCloseAttackList();
    // Set page to loading
    setIsLoading(true);
    // TODO: Fetch opponent stats from server
    // TODO: Update the opponent stats from the fetched server data
    // Remove the loading screen
    setIsLoading(false);
    // Open the PreAttack dialog
    handleOpenPreAttack();
  };

  // eslint-disable-next-line no-unused-vars
  const [playerList, setPlayerList] = useState([]);
  useEffect(() => {
    // TODO: Retrieve the player list
  });

  const [infoDialogType, setInfoDialogType] = useState(null);
  const [isInfoDialogOpen, setInfoDialogOpen] = useState(false);
  const handleOpenInfoDialog = () => {
    setInfoDialogOpen(true);
  };
  const handleCloseInfoDialog = () => {
    setInfoDialogOpen(false);
    setInfoDialogType(null);
  };

  const performAttack = () => {
    // Set the page to loading
    setIsLoading(true);
    // TODO: Make a backend call to submit the attack action
    const IS_ATTACK_SUCCESS = true;
    // If the attack is not successful (e.g. Player is already being attacked)
    // Set the error display dialog
    if (!IS_ATTACK_SUCCESS) {
      setInfoDialogType(INFO_DIALOG_TYPE.ALR_ATTACKED);
    } else {
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
        oppStats={oppStats}
        performAttack={performAttack}
      />
      <AttackList
        open={isAttackListOpen}
        closeDialog={handleCloseAttackList}
        contentArray={playerList}
        nextStep={checkPreAttackStats}
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
