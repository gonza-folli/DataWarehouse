import { Header } from './components/Header/Header.js'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import { SearchProvider } from './components/Context/SearchProvider/SearchProvider.js';
import { LocationProvider } from './components/Context/LocationProvider/LocationProvider.js';
import { Contacts } from './components/Contacts/Contacts.js';
import { Location } from './components/Location/Location.js';
import { Companies } from './components/Companies/Companies.js';
import './App.css';
import { Users } from './components/Users/Users.js';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <SearchProvider>
        <LocationProvider>
          <Header />
          <Switch>
            <Route exact path="/contacts">
              <Contacts/>
            </Route>
            <Route exact path="/companies">
              <Companies />
            </Route>
            <Route exact path="/">
              <Users />
            </Route>
            <Route exact path="/users">
              <Users />
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
