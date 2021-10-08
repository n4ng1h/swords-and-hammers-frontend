import { Container, Grid } from '@mui/material';
import HeaderRow from 'scenes/WarRoom/components/HeaderRow';
import KingdomTitle from 'components/KingdomTitle';
import ResourceRow from 'scenes/WarRoom/components/ResourceRow';
import ActionRow from 'scenes/WarRoom/components/ActionRow';
import styles from './styles';

const WarRoomPage = () => {
  return (
    <Container>
      <Grid
        container
        direction="column"
        justifyContent="flex-start"
        alignItems="center"
        spacing={4}
      >
        <Grid item sx={styles.statsControls}>
          <HeaderRow />
        </Grid>
        <Grid item>
          <KingdomTitle />
        </Grid>
        <Grid item>
          <ResourceRow />
        </Grid>
        <Grid item>
          <ActionRow />
        </Grid>
      </Grid>
    </Container>
  );
};

export default WarRoomPage;
