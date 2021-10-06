/* eslint-disable react/jsx-props-no-spreading */
import PropTypes from 'prop-types';
import { Grid, TextField, Typography } from '@material-ui/core';
import useStyles from './styles';

const CustomTextField = (props) => {
  const classes = useStyles();
  const { title, ...otherProps } = props;

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="flex-start"
    >
      <Grid item className={classes.title}>
        <Typography variant="h5">{title}</Typography>
      </Grid>
      <Grid item>
        <div className={classes.textFieldContainer}>
          <TextField
            {...otherProps}
            className={classes.textField}
            InputProps={{ disableUnderline: true }}
          />
        </div>
      </Grid>
    </Grid>
  );
};

CustomTextField.defaultProps = {
  title: null,
};

CustomTextField.propTypes = {
  title: PropTypes.string,
};

export default CustomTextField;
