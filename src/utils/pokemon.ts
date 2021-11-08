type ApiPokemonDto = {
  name: string;
  url: string;
  types: {
    slot: number;
    type: {
      name: string;
      url: string;
    };
  }[];
  moves: {
    move: {
      name: string;
      url: string;
    };
  }[];
  stats: {
    stat: {
      name: string;
      url: string;
    };
    effort: number;
    base_stat: number;
  }[];
  height: number;
  weight: number;
  abilities: {
    ability: {
      name: string;
      isHidden: boolean;
    };
  }[];
  base_experience: number;
};

type Pokemon = {
  name: string;
  ability1: string;
  ability2: string;
  type1: string;
  type2: string;
  move1: string;
  move2: string;
  move3: string;
  move4: string;
  hp: number;
  attack: number;
  defense: number;
  specialAttack: number;
  specialDefense: number;
  speed: number;
  height: number;
  weight: number;
  experience: number;
};

const fetchPokemon = async (
  limit?: number,
  offset?: number
): Promise<ApiPokemonDto[]> => {
  try {
    const allPokemon = await (
      await fetch(
        `https://pokeapi.co/api/v2/pokemon/${limit ? "?limit=" + limit : ""}${
          offset ? "&offset=" + offset : ""
        }`
      )
    ).json();
    const pokemonDetailsRequests = allPokemon.results.map(
      async (pokemon: ApiPokemonDto) => await (await fetch(pokemon.url)).json()
    );

    return Promise.all(pokemonDetailsRequests);
  } catch (error) {
    console.log(`Failed to fetch pokemon: ${error}`);
  }
  return [];
};

export const fetchPokemonDataset = async (
  limit?: number,
  offset?: number
): Promise<Pokemon[]> =>
  (await fetchPokemon(limit, offset)).map((p) => ({
    name: p.name,
    ability1: p.abilities[0]?.ability.name,
    ability2: p.abilities[1]?.ability.name,
    type1: p.types[0].type.name,
    type2: p.types[1]?.type.name,
    move1: p.moves[0]?.move.name,
    move2: p.moves[1]?.move.name,
    move3: p.moves[2]?.move.name,
    move4: p.moves[3]?.move.name,
    hp: p.stats[5].base_stat,
    attack: p.stats[4].base_stat,
    defense: p.stats[3].base_stat,
    specialAttack: p.stats[2].base_stat,
    specialDefense: p.stats[1].base_stat,
    speed: p.stats[0].base_stat,
    height: p.height,
    weight: p.weight,
    experience: p.base_experience,
  }));
