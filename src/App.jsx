import './App.css';
import { useContext, useEffect } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import SocketContext from 'contexts/Socket';
import ViewContext from 'contexts/View';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { getFirstUrlSection } from 'services/utils';
import Loading from 'components/Loading';
import Content from 'content';
import { ROUTE_PATH } from 'constant';
import routes from './routes';

function App() {
  const history = useHistory();
  const { gameId, setGameId, hasGameEnded } = useContext(SocketContext);

  const { setIsMobileViewType } = useContext(ViewContext);
  const theme = useTheme();
  const isMobileView = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    setIsMobileViewType(isMobileView);
  }, [isMobileView, setIsMobileViewType]);

  useEffect(() => {
    setGameId(getFirstUrlSection(window.location.pathname));
  }, [setGameId]);

  useEffect(() => {
    if (hasGameEnded) {
      history.push(`/${gameId}${ROUTE_PATH.leaderboard}`);
    }
  }, [gameId, hasGameEnded, history]);

  return (
    <div className="App">
      <div className="Background">
        {gameId === '' ? (
          <Loading open msg={Content.pageLoading} />
        ) : (
          <Switch>
            {routes.map((routeObj) => (
              <Route
                key={routeObj.path}
                exact
                path={`/${gameId}${routeObj.path}`}
              >
                {routeObj.component}
              </Route>
            ))}
          </Switch>
        )}
      </div>
    </div>
  );
}

export default App;
