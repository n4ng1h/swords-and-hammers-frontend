import './App.css';
import { Route, Switch } from 'react-router-dom';
import routes from './routes';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Switch>
          {routes.map((routeObj) => (
            <Route exact path={routeObj.path}>
              {routeObj.component}
            </Route>
          ))}
        </Switch>
      </header>
    </div>
  );
}

export default App;
