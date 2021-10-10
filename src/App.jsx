import './App.css';
import { useContext, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import SocketContext from 'contexts/Socket';
import getFirstUrlSection from 'services/utils';
import Loading from 'components/Loading';
import Content from 'content';
import routes from './routes';

function App() {
  const { gameId, setGameId } = useContext(SocketContext);

  useEffect(() => {
    setGameId(getFirstUrlSection(window.location.pathname));
  }, [setGameId]);

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
