import { GraphQLError } from "graphql";
import { CharacterAPI } from "../types.ts";

export const Query = {
  character: async (
    _: unknown,
    args: { id: string }
  ): Promise<CharacterAPI> => {
    try {
      if (!args.id || args.id === "" || typeof args.id !== "string") {
        throw new GraphQLError("Error");
      }
      const res = await fetch(
        `https://rickandmortyapi.com/api/character/${args.id}`
      );
      if (!res.ok) {
        throw new Error("Error");
      }

      const data = await res.json();
      if (data.length === 0) {
        throw new GraphQLError(`No character found with id ${args.id}`, {
          extensions: { code: "NOT_FOUND" },
        });
      }

      return {
        id: data.id,
        name: data.name,
        episode: data.episode,
      };
    } catch (error) {
      throw new GraphQLError(`Error fetching character: ${error.message}`, {
        extensions: { code: "INTERNAL_SERVER_ERROR" },
      });
    }
  },

  charactersByIds: async (
    _: unknown,
    args: { ids: string[] }
  ): Promise<CharacterAPI[]> => {
    try {
      if (
        args.ids.length === 0 ||
        args.ids.some((id) => id === "") ||
        args.ids.some((id) => typeof id !== "string")
      ) {
        throw new GraphQLError("Error");
      }
      const res = await fetch(
        `https://rickandmortyapi.com/api/character/${args.ids.toString()}`
      );
      if (!res.ok) {
        throw new GraphQLError("Error");
      }

      const data = await res.json();
      if (data.length === 0) {
        throw new GraphQLError(`No characters found with id ${args.ids}`, {
          extensions: { code: "NOT_FOUND" },
        });
      }

      return data.map((character: CharacterAPI) => ({
        id: character.id,
        name: character.name,
        episode: character.episode,
      }));
    } catch (error) {
      throw new GraphQLError(`Error fetching characters: ${error.message}`, {
        extensions: { code: "INTERNAL_SERVER_ERROR" },
      });
    }
  },
};
