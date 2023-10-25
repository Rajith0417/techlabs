import React, { useEffect, useState } from "react";
// import logo from './logo.svg';
import "./App.scss";
import CustomButton from "./components/CustomButton";
import { CharacterList } from "./components";
import { Character } from "./types";

function App() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(false);
  const [displayFavorites, setDisplayFavorites] = useState(false);
  const [favoriteCharacterIds, setFavoriteCharacterIds] = useState<number[]>(
    []
  );

  const filteredCharacters = displayFavorites
    ? characters.filter((character) =>
        favoriteCharacterIds.includes(character.id)
      )
    : characters;

  useEffect(() => {
    //get characters from api
    const api = async () => {
      try {
        setLoading(true);
        const data = await fetch("https://rickandmortyapi.com/api/character", {
          method: "GET",
        });
        if (!data.ok) {
          throw new Error("Network response was not ok");
        }
        const CharacterData = await data.json();
        setCharacters(CharacterData.results);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    api();

    // Check localStorage for favorite character IDs on page load
    const storageFavoriteIds = JSON.parse(
      localStorage.getItem("favoriteCharacterIds") || "[]"
    );
    setFavoriteCharacterIds(storageFavoriteIds);
  }, []);

  // function toggleFavorite(character: Character): void {
  function toggleFavorite(characterId: number): void {
    if (favoriteCharacterIds.includes(characterId)) {
      setFavoriteCharacterIds(
        favoriteCharacterIds.filter(
          (favoriteCharacterId) => favoriteCharacterId !== characterId
        )
      );
      localStorage.setItem(
        "favoriteCharacterIds",
        JSON.stringify(
          favoriteCharacterIds.filter(
            (favoriteCharacterId) => favoriteCharacterId !== characterId
          )
        )
      );
    } else {
      setFavoriteCharacterIds([...favoriteCharacterIds, characterId]);
      localStorage.setItem(
        "favoriteCharacterIds",
        JSON.stringify([...favoriteCharacterIds, characterId])
      );
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <CustomButton
          className="button-display"
          title={displayFavorites ? "Display Favorite" : "Display All"}
          buttonType="button"
          handleClick={() => setDisplayFavorites(!displayFavorites)}
        />
      </header>
      <section className="card-wrapper">
        {loading && <div className="loading">Loading...</div>}
        <CharacterList
          characters={filteredCharacters}
          onToggleFavorite={toggleFavorite}
          favoriteCharacterIds={favoriteCharacterIds}
        />
      </section>
    </div>
  );
}

export default App;
