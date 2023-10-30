import { Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import "./App.css";
import {
  Home,
  LandingPage,
  Form,
  Detail,
  NotFound404Page,
  About,
} from "./views";
import { NavBar, FooterBar } from "./components/bars";
import { loadPokemonInitialValues } from "./handlers/handleInitialValuesLoader";

function App() {
  const location = useLocation();
  const dispatch = useDispatch();

  // cuando se monta, hace el dispach de los pokemones, types y pagination
  useEffect(() => {
    loadPokemonInitialValues(dispatch);
  }, [dispatch]);

  return (
    <div className="App">      
      {/* <h1>Henry Pokemon</h1> */}
      {location.pathname !== "/" && (<NavBar />)}
      {location.pathname !== "/" && <FooterBar />}
      <Route exact path="/" component={LandingPage} />
      <Route path="/home" render={() => <Home />} />
      <Route path="/detail/:id" component={Detail} />
      <Route path="/create" component={Form} />
      <Route path="/update/:id" component={Form} />
      <Route path="/about" component={About} />
      {/* <Route path="*" component={NotFound404Page} /> */}
      {/* <Redirect to="/error404" component={NotFound404Page} /> */}
      {/* <Route path="/delete/:id" component={Form} /> */}
    </div>
  );
}

export default App;
