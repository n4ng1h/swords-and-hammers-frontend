import './App.css';
import { useContext, useEffect } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import SocketContext from 'contexts/Socket';
import RoundContext from 'contexts/Round';
import ViewContext from 'contexts/View';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Loading from 'components/Loading';
import Content from 'content';
import {
  ROUTE_PATH,
  SOCKET_EVENT,
  SOCKET_EVENT_ROLE_TYPE,
  SOCKET_EVENT_TYPE,
} from 'constant';
import { setTimerStart } from 'services/utils';
import routes from './routes';

function App() {
  const history = useHistory();
  const { gameId, hasGameEnded, setGameStart, setGameEnd, setNextRound } =
    useContext(RoundContext);

  const socket = useContext(SocketContext);
  useEffect(() => {
    socket.on(SOCKET_EVENT, (resp) => {
      if (resp.role === SOCKET_EVENT_ROLE_TYPE.USER) {
        switch (resp.type) {
          case SOCKET_EVENT_TYPE.START_GAME: {
            setTimerStart();
            setGameStart(resp.GameId);
            break;
          }

          case SOCKET_EVENT_TYPE.GAME_COMPLETED: {
            setGameEnd(resp.GameId);
            break;
          }

          case SOCKET_EVENT_TYPE.NEXT_ROUND: {
            setTimerStart();
            setNextRound();
            break;
          }

          default:
            break;
        }
      }
    });

    socket.emit('ADD_PLAYER', {
      gameId,
      uuid: localStorage.getItem('deviceId'),
    });
  }, [gameId, setGameEnd, setGameStart, setNextRound, socket]);

  // Cleanup function to ensure that the socket is disconnected
  // once the window is closed
  useEffect(() => {
    window.addEventListener('beforeunload', (ev) => {
      ev.preventDefault();
      socket.disconnect();
    });
  }, [socket]);

  const { setIsMobileViewType } = useContext(ViewContext);
  const theme = useTheme();
  const isMobileView = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    setIsMobileViewType(isMobileView);
  }, [isMobileView, setIsMobileViewType]);

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
