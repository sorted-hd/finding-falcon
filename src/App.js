import './App.css';

import { Redirect, Route, Switch } from 'react-router-dom';

import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import Result from './components/Result/Result';

function App() {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/reset" exact>
          <Redirect to="/" />
        </Route>
        <Route path="/results" exact>
          <Result />
        </Route>
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
