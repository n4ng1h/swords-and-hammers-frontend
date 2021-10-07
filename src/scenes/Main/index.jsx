import { useState } from 'react';
import Title from 'components/Title';
import CustomButton from 'components/CustomButton';
import CustomTextField from 'components/CustomTextField';
import { Grid } from '@mui/material';
import Content from 'content';
import BUTTON_TYPE from 'constant';
import isKingdomNameValid from 'services/validation';
import useStyles from './styles';

const MainPage = () => {
  const classes = useStyles();
  // eslint-disable-next-line no-unused-vars
  const [kingdomName, setKingdomName] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [errorMsg, setErrorMsg] = useState('');
  const resetErrorMsg = () => {
    setErrorMsg('');
  };

  // eslint-disable-next-line no-unused-vars
  const handleStartGame = () => {
    if (isKingdomNameValid(kingdomName)) {
      resetErrorMsg();
      // If it is valid, we proceed to the next step
      // TODO: API call to submit user details to backend
    } else {
      // Display error to the user
      setErrorMsg(Content.invalidKingdomName);
    }
  };

  return (
    <div>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={0}
        className={classes.gridContainer}
      >
        <Grid item>
          <Title>{Content.title}</Title>
        </Grid>
        <Grid item className={classes.item}>
          <CustomTextField
            title={Content.kingdomNameField}
            onChange={(e) => {
              setKingdomName(e.target.value);
            }}
            maxLength={20}
            errorMsg={errorMsg}
          />
        </Grid>
        <Grid item className={classes.item}>
          <CustomButton btnType={BUTTON_TYPE.NEXT} onClick={handleStartGame}>
            {Content.startBtn}
          </CustomButton>
        </Grid>
      </Grid>
    </div>
  );
};

export default MainPage;
