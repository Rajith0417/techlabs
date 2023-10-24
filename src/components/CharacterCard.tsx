import React from "react";
import { CharacterCardProps } from "../types";
import CustomButton from "./CustomButton";

function CharacterCard({
  character,
  episodes,
  isFavorite,
  onToggleFavorite,
  onExpand,
  isExpanded,
  isEpisodesLoading,
}: CharacterCardProps) {
  return (
    <div
      id={character.id.toString()}
      className={`character ${isExpanded ? "character--expand" : ""}`}
    >
      <div className="character__top">
        <figure className="character__image">
          <img src={character.image} alt={character.name} />
        </figure>
        <div className="character__right">
          <h2>{character.name}</h2>
          <p>Species: {character.species}</p>
          <p>Gender: {character.gender}</p>
          {/* <p>Origin: {character.origin}</p> */}
          <p>Status: {character.status}</p>
          <button onClick={onToggleFavorite}>
            {isFavorite ? 'Unfavorite' : 'Favorite'}
          </button>
          <CustomButton
            className="character__favorite-button"
            handleClick={() => onToggleFavorite()}
            buttonType="button"
            isFavorite={isFavorite}
          />
          <CustomButton
            className="character__more-button"
            title={isExpanded ? "Less" : "More"}
            handleClick={() => onExpand()}
            buttonType="button"
            isDisable={isEpisodesLoading}
          />
        </div>
      </div>

      {isExpanded && (
        <div className="episodes">
          <h3>Latest Episodes</h3>
          {isEpisodesLoading ? (
            <div className="episodes__loading">Loading...</div>
          ) : (
            <ul>
              {episodes.map((singleEpisode) => (
                <li key={singleEpisode.id}>{singleEpisode.name}</li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

export default CharacterCard;
