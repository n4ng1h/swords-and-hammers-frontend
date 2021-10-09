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
  return (
    <TableContainer>
      <Table size="small">
        <TableBody>
          <TableRow>
            <TableCell sx={styles.tableText}>
              {Content.resource.village}
            </TableCell>
            <TableCell sx={styles.tableText}>{oppStats.village}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell sx={styles.tableText}>
              {Content.resource.castle}
            </TableCell>
            <TableCell sx={styles.tableText}>{oppStats.castle}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell sx={styles.tableText}>{Content.resource.army}</TableCell>
            <TableCell sx={styles.tableText}>{oppStats.army}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell sx={styles.tableText}>
              {Content.resource.winProb}
            </TableCell>
            <TableCell
              sx={styles.tableText}
            >{`${oppStats.winProb} %`}</TableCell>
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
    kingdomName: PropTypes.string.isRequired,
    village: PropTypes.number.isRequired,
    castle: PropTypes.number.isRequired,
    army: PropTypes.number.isRequired,
    winProb: PropTypes.number.isRequired,
  }),
};

export default StatsTable;
