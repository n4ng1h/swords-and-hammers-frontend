import PropTypes from 'prop-types';
import { Backdrop, Box, Grid, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CustomButton from 'components/CustomButton';
import { BUTTON_TYPE } from 'constant';
import styles from './styles';

const InfoDialog = ({ open, closeDialog, title, content, children }) => {
  return (
    <Backdrop open={open} sx={styles.backdrop}>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={4}
      >
        <Grid item>
          <CustomButton
            btnType={BUTTON_TYPE.SMALL}
            sx={styles.closeBtn}
            onClick={closeDialog}
          >
            <CloseIcon style={styles.closeIcon} />
          </CustomButton>
          <Box sx={styles.board}>
            <Grid
              container
              item
              direction="column"
              justifyContent="center"
              alignItems="center"
              sx={styles.boardTextContainer}
            >
              <Grid item sx={styles.boardTitle}>
                <Typography sx={styles.title} variant="h5">
                  {title}
                </Typography>
              </Grid>
              <Grid item sx={styles.boardContent}>
                {content}
              </Grid>
            </Grid>
          </Box>
        </Grid>
        <Grid item>{children}</Grid>
      </Grid>
    </Backdrop>
  );
};

InfoDialog.defaultProps = {
  children: null,
};

InfoDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  closeDialog: PropTypes.func.isRequired,
  children: PropTypes.node,
  title: PropTypes.string.isRequired,
  content: PropTypes.node.isRequired,
};

export default InfoDialog;
