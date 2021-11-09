import { ChevronLeftIcon } from "@chakra-ui/icons";
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Heading,
  HStack,
  Link,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import { FC, useEffect, useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import { NavLink } from "react-router-dom";
import { TreeDiagram } from "../components/TreeDiagram";
import { generateTree, TreeNode } from "../utils/decision-tree";
import { fetchPokemonDataset } from "../utils/pokemon";

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
    <VStack width="100%" alignItems="stretch" height="100%" spacing={4}>
      <Breadcrumb>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbItem>
          <BreadcrumbLink href="#">Demos</BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink href="/demo/pokemon">Pokemon</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <HStack mb={8}>
        <Link as={NavLink} to="/" _hover={{color: "blue.400"}}>
          <ChevronLeftIcon boxSize="2rem" />
        </Link>
        <Heading as="h1" >
          Pokemon demo
        </Heading>
      </HStack>
      <Box
        backgroundColor={treeDiagrambackgroundColor}
        height="100%"
        borderRadius="xl"
      >
        {tree && <TreeDiagram data={tree} />}
      </Box>
    </VStack>
  );
};
