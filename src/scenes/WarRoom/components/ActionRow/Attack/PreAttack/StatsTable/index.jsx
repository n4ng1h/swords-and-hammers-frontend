import PropTypes from 'prop-types';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from '@mui/material';
import Content from 'content';
import styles from './styles';

const StatsTable = ({ oppStats }) => {
  if (oppStats === null) {
    return null;
  }

  return (
    <TableContainer>
      <Table size="small">
        <TableBody>
          <TableRow>
            <TableCell sx={styles.tableText}>
              {Content.resource.village}
            </TableCell>
            <TableCell sx={styles.tableText}>
              {oppStats.defenderCard.village}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell sx={styles.tableText}>
              {Content.resource.castle}
            </TableCell>
            <TableCell sx={styles.tableText}>
              {oppStats.defenderCard.castle}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell sx={styles.tableText}>{Content.resource.army}</TableCell>
            <TableCell sx={styles.tableText}>
              {oppStats.defenderCard.army}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell sx={styles.tableText}>
              {Content.resource.winProb}
            </TableCell>
            <TableCell sx={styles.tableText}>{`${
              oppStats.chanceOfWinning * 100
            } %`}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

StatsTable.defaultProps = {
  oppStats: null,
};

StatsTable.propTypes = {
  oppStats: PropTypes.shape({
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
};

export default StatsTable;
