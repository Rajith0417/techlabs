import { MouseEventHandler } from "react";

export interface ButtonProps {
  title?: string;
  buttonType: "submit" | "button";
  handleClick: MouseEventHandler<HTMLButtonElement>;
  className: string;
  isFavorite?: boolean;
  isDisable?: boolean;
}

export interface Character {
  id: number;
  image: string;
  name: string;
  status: string;
  species: string;
  gender: string;
  origin?: Origin;
  episode: string[];
  // type?: string;
  // location?: Location;
  // url?: string;
  // created?: string;
}

export interface Episode {
  id: number;
  name: string;
  // air_date: string
  // episode: string
  // characters: string[]
  // url: string
  created: string;
}

export interface Origin {
  name: string;
  url: string;
}

export interface CharacterCardProps {
  character: Character;
  episodes: Episode[];
  isFavorite: boolean;
  onToggleFavorite: () => void;
  onExpand: () => void;
  isExpanded: boolean;
  isEpisodesLoading: boolean;
}

export interface CharacterListProps {
  characters: Character[];
  favoriteCharacters: Character[];
  onToggleFavorite: (character: Character) => void;
}
