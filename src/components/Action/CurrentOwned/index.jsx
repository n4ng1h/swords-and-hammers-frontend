import PropTypes from 'prop-types';
import { useContext } from 'react';
import ViewContext from 'contexts/View';
import { Paper, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import styles from './styles';

const CustomResourceDisplay = styled(Paper, {
  shouldForwardProp: (prop) =>
    prop !== 'disableNumOwned' && prop !== 'isMobile',
})(({ disableNumOwned, isMobile }) => {
  const styleType = isMobile
    ? styles.ownedContainerMobile
    : styles.ownedContainer;
  return {
    ...styleType,
    backgroundColor: disableNumOwned ? `rgba(0,0,0,0)` : 'white',
  };
});

const CurrentOwned = ({ disableNumOwned, numOwned }) => {
  const { isMobileView } = useContext(ViewContext);

  return (
    <CustomResourceDisplay
      disableNumOwned={disableNumOwned}
      elevation={0}
      isMobile={isMobileView}
    >
      {disableNumOwned ? null : (
        <Typography sx={styles.text} variant="h4">{`${numOwned}`}</Typography>
      )}
    </CustomResourceDisplay>
  );
};

CurrentOwned.defaultProps = {
  numOwned: null,
};

CurrentOwned.propTypes = {
  disableNumOwned: PropTypes.bool.isRequired,
  numOwned: PropTypes.number,
};

export default CurrentOwned;
