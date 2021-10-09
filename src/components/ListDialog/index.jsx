import PropTypes from 'prop-types';
import { useState } from 'react';
import {
  Backdrop,
  Box,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Radio,
  Typography,
} from '@mui/material';
import CustomButton from 'components/CustomButton';
import { BUTTON_TYPE } from 'constant';
import Content from 'content';
import styles from './styles';

const RowItemRenderer = ({ user, currSelected, setSelected }) => {
  if (user === null) {
    return null;
  }

  return (
    <ListItem>
      <ListItemButton onClick={setSelected}>
        <ListItemIcon>
          <Radio
            value={user.id}
            checked={currSelected === user.id}
            sx={styles.radio}
          />
        </ListItemIcon>
        <ListItemText
          sx={styles.itemText}
          primary={`Kingdom of ${user.playerName}`}
        />
      </ListItemButton>
    </ListItem>
  );
};

RowItemRenderer.defaultProps = {
  user: null,
  currSelected: null,
};

RowItemRenderer.propTypes = {
  user: PropTypes.shape({
    playerName: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  }),
  currSelected: PropTypes.string,
  setSelected: PropTypes.func.isRequired,
};

const ListDialog = ({ open, contentArray, closeDialog }) => {
  const [selectedRow, setSelectedRow] = useState(null);

  return (
    <Backdrop open={open} onClose={closeDialog} sx={styles.backdrop}>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={2}
        sx={styles.gridContainer}
      >
        <Grid item>
          <CustomButton
            btnType={BUTTON_TYPE.SMALL}
            sx={styles.closeBtn}
            onClick={closeDialog}
          >
            <Typography variant="h4">{Content.closeBtn}</Typography>
          </CustomButton>
          <Box sx={styles.list}>
            <List>
              {contentArray.map((user) => (
                <div key={user.id}>
                  <RowItemRenderer
                    user={user}
                    currSelected={selectedRow}
                    setSelected={() => {
                      setSelectedRow(user.id);
                    }}
                  />
                  <Divider />
                </div>
              ))}
            </List>
          </Box>
        </Grid>
        <Grid item>
          <CustomButton btnType={BUTTON_TYPE.ENTER}>
            {Content.attackBtn}
          </CustomButton>
        </Grid>
      </Grid>
    </Backdrop>
  );
};

ListDialog.defaultProps = {
  contentArray: [],
};

ListDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  contentArray: PropTypes.arrayOf(
    PropTypes.shape({
      playerName: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
    })
  ),
  closeDialog: PropTypes.func.isRequired,
};

export default ListDialog;
