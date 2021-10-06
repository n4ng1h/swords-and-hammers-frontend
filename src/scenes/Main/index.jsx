import Title from 'components/Title';
import ThemeButton from 'components/ThemeButton';
import { Grid } from '@material-ui/core';
import Content from 'content';
import useStyles from './styles';

const MainPage = () => {
  const classes = useStyles();

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
    >
      <Grid item>
        <Title text={Content.title} />
      </Grid>
      <Grid item className={classes.btn}>
        <ThemeButton color="secondary">{Content.startBtn}</ThemeButton>
      </Grid>
    </Grid>
  );
};

export default MainPage;
