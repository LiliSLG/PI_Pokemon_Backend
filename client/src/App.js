import { Route, useLocation } from "react-router-dom";
import "./App.css";
import { Home, LandingPage, Form, Detail } from "./views";
import NavBar from "./components/NavBar/NavBar";



function App() {
  const location = useLocation();
  return (
    <div className="App">
      <h1>Henry Pokemon</h1>
      {location.pathname !== "/" && <NavBar />}
      <Route exact path="/" component={LandingPage} />
      <Route path="/home" render={() => <Home />} />
      <Route path="/detail/:id" component={Detail} />
      <Route path="/create" component={Form} />
      <Route path="/update/:id" component={Form} />
      {/* <Route path="/delete/:id" component={Form} /> */}
    </div>
  );
}

export default App;
