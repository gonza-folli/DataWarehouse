import { Header } from './components/Header/Header.js'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import { SearchProvider } from './components/Context/SearchProvider/SearchProvider.js';
import { LocationProvider } from './components/Context/LocationProvider/LocationProvider.js';
import { Body } from './components/BodyMain/Body.js'
import { Location } from './components/Location/Location.js';
import './App.css';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <SearchProvider>
        <LocationProvider>
          <Header />
          <Switch>
            <Route exact path="/">
              <Body />
            </Route>
            <Route exact path="/location">
              <Location />
            </Route>
          </Switch>
        </LocationProvider>
        </SearchProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
