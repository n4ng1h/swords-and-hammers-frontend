/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable react/jsx-props-no-spreading */
import PropTypes from 'prop-types';
import { Container, Grid, TextField, Typography } from '@mui/material';
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
        <Typography variant="h5">{title}</Typography>
      </Grid>
      <Grid item>
        <Container sx={styles.textFieldContainer}>
          <TextField
            {...otherProps}
            sx={styles.textField}
            variant="standard"
            InputProps={{ disableUnderline: true }}
            inputProps={{
              maxLength,
            }}
          />
        </Container>
      </Grid>
      <Grid item sx={styles.errorMsg}>
        <Typography variant="body1">{errorMsg}</Typography>
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
