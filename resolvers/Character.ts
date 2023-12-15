import { EpisodeAPI, CharacterAPI } from "../types.ts";

export const Character = {
  episode: async (parent: CharacterAPI): Promise<Array<EpisodeAPI>> => {
    const episodes = await Promise.all(
      parent.episode.map(async (episode) => {
        const ep = await fetch(episode);
        return ep.json();
      })
    );
    return episodes;
  },
};
