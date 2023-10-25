import React, { useState } from "react";
import { CharacterListProps, Episode } from "../types";
import CharacterCard from "./CharacterCard";

function CharacterList({
  characters,
  onToggleFavorite,
  favoriteCharacterIds,
}: CharacterListProps) {
  const [expandedCharacterIndex, setExpandedCharacterIndex] =
    useState<number>(-1);
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [episodesLoading, setEpisodesLoading] = useState(false);

  const toggleExpand = (index: number) => {
    setExpandedCharacterIndex(expandedCharacterIndex === index ? -1 : index);
    fetchAllEpisodes(index);
  };
  //fetch single episodes
  const fetchEpisode = async (episodeUrl: string) => {
    const response = await fetch(episodeUrl);
    if (!response.ok) {
      throw new Error("Episode data network response was not ok");
    }
    return response.json();
  };
  //fetch all episodes
  const fetchAllEpisodes = async (id: number) => {
    setEpisodesLoading(true);
    const selectedEpisodes = characters[id].episode;
    const episodePromises = selectedEpisodes
      .slice(selectedEpisodes.length - Math.min(3, selectedEpisodes.length)) //get latest 3 episodes
      .map(async (episodeUrl) => {
        try {
          return await fetchEpisode(episodeUrl);
        } catch (error) {
          console.error("Error fetching episode data:", error);
          return null;
        }
      });

    try {
      const episodeDataArray = await Promise.all(episodePromises);
      setEpisodes(episodeDataArray);
    } catch (error) {
      // Handle any errors that occurred during the fetch process
      console.error("Error fetching episode data:", error);
    } finally {
      setEpisodesLoading(false);
    }
  };

  return (
    <>
      {characters.map((character, index) => (
        <CharacterCard
          key={character.id}
          character={character}
          episodes={episodes}
          isFavorite={favoriteCharacterIds.includes(character.id)}
          onToggleFavorite={() => onToggleFavorite(character.id)}
          onExpand={() => toggleExpand(index)}
          isExpanded={expandedCharacterIndex === index}
          isEpisodesLoading={episodesLoading}
        />
      ))}
    </>
  );
}

export default CharacterList;
