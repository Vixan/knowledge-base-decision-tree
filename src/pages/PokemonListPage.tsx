import { FC, useEffect, useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import { fetchPokemonDataset } from "../utils/pokemon";
import { generateTree, predict, TreeNode } from "../utils/decision-tree";
import { TreeDiagram } from "../components/TreeDiagram";
import {
  Box,
  Button,
  Heading,
  useColorModeValue,
  useToken,
} from "@chakra-ui/react";

type Props = {};

export const PokemonListPage: FC<Props> = ({}) => {
  const { data: pokemon } = useQuery("pokemon", () =>
    fetchPokemonDataset(20, 0)
  );
  const [tree, setTree] = useState<TreeNode | null>(null);
  const queryClient = useQueryClient();

  const treeDiagrambackgroundColor = useColorModeValue("gray.100", "gray.900");

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

      setTree(decisionTree);
    }
  }, [pokemon]);

  const refreshData = () => {
    queryClient.invalidateQueries("pokemon");
  };

  return (
    <Box display="flex" flexDirection="column" height="100%">
      <Heading as="h1" mb={8}>
        Pokemon demo
      </Heading>
      {/* <Button onClick={refreshData}>Refresh</Button> */}
      <Box
        backgroundColor={treeDiagrambackgroundColor}
        height="100%"
        borderRadius="xl"
      >
        {tree && <TreeDiagram data={tree} />}
      </Box>
    </Box>
  );
};
