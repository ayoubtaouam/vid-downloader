import { useEffect, useState } from 'react';
import Header from './Components/header/Header';
import SearchBar from './Components/searchBar/SearchBar';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  useEffect(() => {
    document.body.setAttribute("data-theme", darkMode ? "dark" : "light");
  }, [darkMode]);
  return (
          <div className={darkMode ? "bg-dark text-light min-vh-100" : "bg-light text-dark min-vh-100"}>
            <Header darkMode={darkMode} setDarkMode={setDarkMode} />
            <SearchBar darkMode={darkMode} />
          </div>
  );
}

export default App;
