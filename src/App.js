import React from "react";
import "App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import Home from "./components/pages/Home/Home";
import MainLogin from "./components/mainLogin/mainLogin";
import Login from "./components/login/login";

import Profile from "./components/Profile/profile";
import Traveler from "./components/pages/Traveler/Traveler";
import UpdateTravelAccount from "./components/pages/Traveler/UpdateTravelAccount";
import CreateSheddule from "./components/pages/Home/CreateSheddule";
import AddBooking from "./components/pages/Traveler/AddBooking";

function App() {
  return (
    <div>
      <Router>
        <Switch>
          {/* Student */}
          <Route exact path="/home" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/mainLogin" component={MainLogin} />
          <Route exact path="/profile" component={Profile} />


          <Route exact path="/traveler" component={Traveler} />
          <Route exact path="/updateTravelAccount" component={UpdateTravelAccount} />
          <Route exact path="/addBooking" component={AddBooking} />



          <Route exact path="/createTrain" component={CreateSheddule} />

          <Redirect to="/mainLogin" component={MainLogin} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
