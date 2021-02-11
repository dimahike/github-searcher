import { useState } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Header from './components/Header';

import HomePage from './pages/HomePage';
import UserPage from './pages/UserPage';

function App() {
  const [theme, setTheme] = useState(true);
  const year = new Date().getFullYear();

  const themeHandler = () => {
    setTheme(!theme);
  };

  return (
    <BrowserRouter>
      <div className={`${theme ? 'dark' : 'white'}`}>
        <div className="grid-container">
          <Header theme={theme} themeOnClick={themeHandler} />
          <main>
            <Switch>
              <Route path="/github-searcher" component={HomePage} exact />
              <Route path="/github-searcher/user/:username" component={UserPage} exxact />
              <Redirect to="/github-searcher" />
            </Switch>
          </main>
          <footer> © {year} TODO LIST</footer>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
