import './App.css';
import { Route, Switch } from 'react-router-dom';
import routes from './routes';

function App() {
  return (
    <div className="App">
      <Switch>
        {routes.map((routeObj) => (
          <Route key={routeObj.path} exact path={routeObj.path}>
            {routeObj.component}
          </Route>
        ))}
      </Switch>
    </div>
  );
}

export default App;
