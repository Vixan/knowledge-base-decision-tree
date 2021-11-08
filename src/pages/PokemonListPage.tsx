import { FC, useEffect } from "react";
import { useQuery } from "react-query";
import { fetchPokemonDataset } from "../utils/pokemon";
import { generateTree, predict } from "../utils/decision-tree";

type Props = {};

export const PokemonListPage: FC<Props> = ({}) => {
  const { data: pokemon } = useQuery("pokemon", fetchPokemonDataset);

  useEffect(() => {
    if (pokemon) {
      console.log(pokemon);

      const tree = generateTree(pokemon, "name", [
        "type1",
        "type2",
        "ability1",
        "ability2",
        "move1",
        "move2",
        "move3",
        "move4",
        "hp",
        "attack",
        "defense",
        "specialAttack",
        "specialDefense",
        "speed",
        "experience"
      ]);
      console.log(tree);
    }
  }, [pokemon]);

  return (
    <div>
      <h1>Pokemon</h1>
      <p>{pokemon?.map((p) => p.name)}</p>
    </div>
  );
};
