import { FC, useEffect, useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import { fetchPokemonDataset } from "../utils/pokemon";
import { generateTree, predict, TreeNode } from "../utils/decision-tree";
import { TreeDiagram } from "../components/TreeDiagram";
import { Button } from "@chakra-ui/react";

type Props = {};

export const PokemonListPage: FC<Props> = ({}) => {
  const { data: pokemon } = useQuery("pokemon", () => fetchPokemonDataset(20, 300));
  const [tree, setTree] = useState<TreeNode | null>(null);
  const queryClient = useQueryClient();

  useEffect(() => {
    if (pokemon) {
      console.log(pokemon);

      const decisionTree = generateTree(pokemon, "name", [
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
        "experience",
      ]);
      console.log(decisionTree);

      setTree(decisionTree);
    }
  }, [pokemon]);

  const refreshData = () => {
    queryClient.invalidateQueries("pokemon");
  };

  return (
    <div>
      <Button onClick={refreshData}>Refresh</Button>
      {tree && <TreeDiagram data={tree} />}
    </div>
  );
};
