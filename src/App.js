import { useState } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
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
            <Route path="/user/:username" component={UserPage} />
            <Route path="/" component={HomePage} exact />
          </main>
          <footer> © {year} TODO LIST</footer>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
