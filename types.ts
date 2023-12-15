export type CharacterAPI = {
  id: number;
  name: string;
  episode: string[];
};

export type EpisodeAPI = {
  id: number;
  name: string;
  characters: string[];
};
