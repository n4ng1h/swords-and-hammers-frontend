import { useState } from 'react';
import Title from 'components/Title';
import CustomButton from 'components/CustomButton';
import CustomTextField from 'components/CustomTextField';
import { Grid } from '@material-ui/core';
import Content from 'content';
import BUTTON_TYPE from 'constant';
import useStyles from './styles';

const MainPage = () => {
  const classes = useStyles();
  // eslint-disable-next-line no-unused-vars
  const [kingdomName, setKingdomName] = useState('');

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
          <Title text={Content.title} />
        </Grid>
        <Grid item className={classes.item}>
          <CustomTextField
            title={Content.kingdomNameField}
            onChange={(e) => {
              setKingdomName(e.target.value);
            }}
            maxLength={20}
          />
        </Grid>
        <Grid item className={classes.item}>
          <CustomButton btnType={BUTTON_TYPE.NEXT}>
            {Content.startBtn}
          </CustomButton>
        </Grid>
      </Grid>
    </div>
  );
};

export default MainPage;
