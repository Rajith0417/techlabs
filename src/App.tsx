import React, { useState } from 'react';
// import logo from './logo.svg';
import './App.scss';
import CustomButton from './components/CustomButton';

function App() {

  const [isAllFavorite, setIsAllFavorite] = useState(false)

  function showAllFavorite(): void {
    setIsAllFavorite(!isAllFavorite);
  }

  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a> */}
        <CustomButton
          className="button-display"
          title={isAllFavorite ? "Display Favorite" : "Display All"}
          buttonType="button"
          handleClick={() => showAllFavorite()}
        />
      </header>
      <section>

      </section>
    </div>
  );
}

export default App;
