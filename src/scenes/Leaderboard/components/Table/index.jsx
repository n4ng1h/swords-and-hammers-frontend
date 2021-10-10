import PropTypes from 'prop-types';
import { List, ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import GoldMedalImage from 'assets/images/awards/gold-medal.png';
import SilverMedalImage from 'assets/images/awards/silver-medal.png';
import BronzeMedalImage from 'assets/images/awards/bronze-medal.png';
import Content from 'content';
import styles from './styles';

const LeaderboardTable = ({ resultsArr }) => {
  const topThree = resultsArr.slice(0, 3);
  const idxToImg = {
    0: {
      altText: Content.images.altText.goldMedal,
      img: GoldMedalImage,
    },
    1: { altText: Content.images.altText.silverMedal, img: SilverMedalImage },
    2: {
      altText: Content.images.altText.bronzeMedal,
      img: BronzeMedalImage,
    },
  };

  return (
    <List>
      {topThree.map((user, idx) => (
        <ListItem>
          <ListItemAvatar>
            <img
              src={idxToImg[idx].img}
              alt={idxToImg[idx].altText}
              style={styles.img}
            />
          </ListItemAvatar>
          <ListItemText
            primary={user.gameName}
            sx={styles.infoDialogDescText}
          />
        </ListItem>
      ))}
    </List>
  );
};

LeaderboardTable.defaultProps = {
  resultsArr: [],
};

LeaderboardTable.propTypes = {
  resultsArr: PropTypes.arrayOf(
    PropTypes.shape({
      village: PropTypes.number.isRequired,
      castle: PropTypes.number.isRequired,
      army: PropTypes.number.isRequired,
      lumber: PropTypes.number.isRequired,
      iron: PropTypes.number.isRequired,
      gold: PropTypes.number.isRequired,
      totalWealth: PropTypes.number.isRequired,
      status: PropTypes.string.isRequired,
      participantId: PropTypes.string.isRequired,
      gameId: PropTypes.string.isRequired,
      scoreId: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
      updatedAt: PropTypes.string.isRequired,
      _id: PropTypes.string.isRequired,
      uuid: PropTypes.string.isRequired,
      gameName: PropTypes.string.isRequired,
    })
  ),
};

export default LeaderboardTable;
