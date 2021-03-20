import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import carData from './data/data.json';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import { createContext, useEffect, useState } from 'react';
import Description from './components/Description/Description';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';


export const userContext = createContext();
export const carContext = createContext();
function App() {
  const [loggedInUser, setLoggedInUser]  = useState({})
  const [cars, setCars] = useState([]);
  useEffect( () => {
      setCars(carData);
  }, [])

  return (
    <userContext.Provider value={[loggedInUser, setLoggedInUser]} style={bgStyle}>
      <carContext.Provider value={[cars, setCars]}>
      <Router>
        <Header></Header>
        <Switch>
          <Route path="/home">
              <Home></Home>
          </Route>
          <Route exact path="/">
              <Home></Home>
          </Route>
          <PrivateRoute path="/description/:id">
              <Description></Description>
          </PrivateRoute>
          <Route path="/login">
              <Login></Login>
          </Route>
          <Route path="*">
              <Home></Home>
          </Route>
        </Switch>
      </Router>
     
    </carContext.Provider>
    </userContext.Provider>
  );
}

const bgStyle = {
  backgroundImage: 'url("https://lh3.googleusercontent.com/proxy/6xZIJGouYlb7gTwk2WMOXGe2wWuI_O4GeFrZDckfG_urpMjNwFq9I625NIf1R9gsB6WqhbcBo42l_HbNhCTfrBo")',
 position: "fixed",
 minWidth: "100%",
 minHeight: "100%",
 backgroundSize: "cover",
 backgroundPosition: "center"
}

export default App;
