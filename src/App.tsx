import React, { useEffect, useState } from "react";
// import logo from './logo.svg';
import "./App.scss";
import CustomButton from "./components/CustomButton";
import { CharacterList } from "./components";
import { Character } from "./types";
import { debounce } from "lodash";

function App() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(false);
  const [displayFavorites, setDisplayFavorites] = useState(false);
  const [favoriteCharacterIds, setFavoriteCharacterIds] = useState<number[]>([]);
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
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageCount]);

  const api = async (count: number) => {
    try {
      console.log("api---");
      //page is loading
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
      //merge next page characters with prev page characters
      setCharacters([...characters, ...CharacterData.results]);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      //page loaded
      setLoading(false);
    }
  };

  //debounce used to reduce cost
  const handleScroll = debounce(() => {
    const windowHeight = window.innerHeight;
    const scrollPosition = window.scrollY;
    const documentHeight = document.documentElement.scrollHeight;

    // Check if the user has scrolled to the bottom
    if (scrollPosition + windowHeight >= documentHeight) {
      setPageCount((prevPageCount) => prevPageCount + 1);
    }
  }, 400);

  function toggleFavorite(characterId: number): void {
    //if selected character id is already available in favorite id, remove from favorites
    if (favoriteCharacterIds.includes(characterId)) {
      setFavoriteCharacterIds(
        favoriteCharacterIds.filter(
          (favoriteCharacterId) => favoriteCharacterId !== characterId
        )
      );
      //update local storage
      localStorage.setItem(
        "favoriteCharacterIds",
        JSON.stringify(
          favoriteCharacterIds.filter(
            (favoriteCharacterId) => favoriteCharacterId !== characterId
          )
        )
      );
    } else {
      //else add to favorite
      setFavoriteCharacterIds([...favoriteCharacterIds, characterId]);
      //update local storage
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
