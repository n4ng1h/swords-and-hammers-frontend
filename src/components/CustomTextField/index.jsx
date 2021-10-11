/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable react/jsx-props-no-spreading */
import PropTypes from 'prop-types';
import { Box, Grid, TextField, Typography } from '@mui/material';
import styles from './styles';

const CustomTextField = (props) => {
  const { title, errorMsg, maxLength, ...otherProps } = props;

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="flex-start"
    >
      <Grid item sx={styles.title}>
        <Typography variant="h5" sx={styles.textFieldTitle}>
          {title}
        </Typography>
      </Grid>
      <Grid item>
        <Box sx={styles.textFieldContainer}>
          <TextField
            {...otherProps}
            sx={styles.textField}
            variant="standard"
            InputProps={{ disableUnderline: true }}
            inputProps={{
              maxLength,
            }}
          />
        </Box>
      </Grid>
      <Grid item sx={styles.errorMsgContainer}>
        <Typography variant="body1" sx={styles.errorMsg}>
          {errorMsg}
        </Typography>
      </Grid>
    </Grid>
  );
};

CustomTextField.defaultProps = {
  title: null,
  maxLength: null,
  errorMsg: null,
};

CustomTextField.propTypes = {
  title: PropTypes.string,
  maxLength: PropTypes.number,
  errorMsg: PropTypes.string,
};

export default CustomTextField;
