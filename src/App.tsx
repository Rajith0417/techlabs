import React, { useEffect, useState } from "react";
// import logo from './logo.svg';
import "./App.scss";
import CustomButton from "./components/CustomButton";
import { CharacterList } from "./components";
import { Character } from "./types";
import throttle from "lodash/throttle";
import { debounce } from "lodash";

function App() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(false);
  const [displayFavorites, setDisplayFavorites] = useState(false);
  const [favoriteCharacterIds, setFavoriteCharacterIds] = useState<number[]>(
    []
  );
  const [pageCount, setPageCount] = useState<number>(1);

  const filteredCharacters = displayFavorites
    ? characters.filter((character) =>
        favoriteCharacterIds.includes(character.id)
      )
    : characters;

  useEffect(() => {
    //get characters from api
    api(pageCount);

    // Check localStorage for favorite character IDs on page load
    const storageFavoriteIds = JSON.parse(
      localStorage.getItem("favoriteCharacterIds") || "[]"
    );
    setFavoriteCharacterIds(storageFavoriteIds);

    // Attach the event listener when the component mounts
    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
      console.log("at bottom unmount-----");
    };
  }, [pageCount]);

  const api = async (count: number) => {
    try {
      console.log("api---");

      setLoading(true);
      const data = await fetch(
        `https://rickandmortyapi.com/api/character?page=${count}`,
        {
          method: "GET",
        }
      );
      if (!data.ok) {
        throw new Error("Network response was not ok");
      }
      const CharacterData = await data.json();
      setCharacters([...characters, ...CharacterData.results]);
      console.log(CharacterData.results);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleScroll = debounce(() => {
    console.log("throttle");
    const windowHeight = window.innerHeight;
    const scrollPosition = window.scrollY;
    const documentHeight = document.documentElement.scrollHeight;

    // Check if the user has scrolled to the bottom
    if (scrollPosition + windowHeight >= documentHeight) {
      console.log("at bottom-----"+pageCount);
      setPageCount((prevPageCount) => prevPageCount + 1);
    }
  }, 400);

  function toggleFavorite(characterId: number): void {
    console.log("fav cara id - "+characterId);
    
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
        <CharacterList
          characters={filteredCharacters}
          onToggleFavorite={toggleFavorite}
          favoriteCharacterIds={favoriteCharacterIds}
        />
        {loading && <div className="loading">Loading...</div>}
      </section>
    </div>
  );
}

export default App;
