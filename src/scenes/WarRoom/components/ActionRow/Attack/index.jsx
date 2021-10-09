import { useState } from 'react';
import PropTypes from 'prop-types';
import Action from 'components/Action';
import ListDialog from 'components/ListDialog';
import AttackImage from 'assets/images/buttons/attack.png';
import Content from 'content';

const AttackKingdom = ({ numOwned }) => {
  const [isAttackDialogOpen, setIsAttackDialogOpen] = useState(false);
  const handleOpenDialog = () => {
    setIsAttackDialogOpen(true);
  };
  const handleCloseDialog = () => {
    setIsAttackDialogOpen(false);
  };
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
      <ListDialog
        open={isAttackDialogOpen}
        closeDialog={handleCloseDialog}
        contentArray={TEST_DATA}
      />
      <Action
        btnImg={AttackImage}
        btnCaption={Content.action.attack}
        disableNumOwned
        disabled={numOwned <= 0}
        onClick={handleOpenDialog}
      />
    </div>
  );
};

AttackKingdom.propTypes = {
  numOwned: PropTypes.number.isRequired,
};

export default AttackKingdom;
