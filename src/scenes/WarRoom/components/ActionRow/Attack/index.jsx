import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Action from 'components/Action';
import Loading from 'components/Loading';
import AttackImage from 'assets/images/buttons/attack.png';
import Content from 'content';
import { OPPONENT_STATS_TEMPLATE } from 'constant';
import AttackList from './AttackList';
import PreAttack from './PreAttack';

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

  useEffect(() => {
    // TODO: Retrieve the player list
  });

  const TEST_DATA = [
    { playerName: 'George Washington', id: '12345' },
    { playerName: 'Samantha Goh', id: '11223342' },
    { playerName: 'George Washington', id: '12346' },
    { playerName: 'Samantha Goh', id: '11223341' },
    { playerName: 'George Washington', id: '12347' },
    { playerName: 'Samantha Goh', id: '11223340' },
    { playerName: 'George Washington', id: '12348' },
    { playerName: 'Samantha Goh', id: '11223349' },
    { playerName: 'George Washington', id: '12349' },
    { playerName: 'Samantha Goh', id: '11223348' },
    { playerName: 'George Washington', id: '123410' },
    { playerName: 'Samantha Goh', id: '11223347' },
    { playerName: 'George Washington', id: '123411' },
    { playerName: 'Samantha Goh', id: '11223346' },
    { playerName: 'George Washington', id: '1234512' },
    { playerName: 'Samantha Goh', id: '11223345' },
    { playerName: 'George Washington', id: '1234513' },
    { playerName: 'Samantha Goh', id: '112233414' },
  ];

  return (
    <div>
      <Loading open={isLoading} msg={Content.fetchingOppStats} />
      <PreAttack
        open={isPreAttackOpen}
        closeDialog={handleClosePreAttack}
        oppStats={oppStats}
      />
      <AttackList
        open={isAttackListOpen}
        closeDialog={handleCloseAttackList}
        contentArray={TEST_DATA}
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
