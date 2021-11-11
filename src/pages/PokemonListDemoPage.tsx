import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  Heading,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Link,
  Skeleton,
  useColorModeValue,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { FC, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { NavLink } from "react-router-dom";
import { TreeDiagram } from "../components/TreeDiagram";
import { generateTree, predict, TreeNode } from "../utils/decision-tree";
import { fetchPokemonDataset } from "../utils/pokemon";

export const PokemonListDemoPage: FC = () => {
  const { data: pokemonList, isLoading: isPokemonListLoading } = useQuery(
    "pokemonList",
    async () => await fetchPokemonDataset(100, 0)
  );
  const {
    data: pokemon,
    isRefetching: isPokemonFetching,
    refetch: refetchPokemon,
  } = useQuery("pokemon", async () => await fetchPokemonDataset(1, 100), {
    enabled: false,
  });

  const [tree, setTree] = useState<TreeNode | null>(null);
  const [predictedPokemonName, setPredictedPokemonName] = useState<
    string | null
  >(null);

  const [pokemonToPredict, setPokemonToPredict] = useState<string>("");
  const treeDiagrambackgroundColor = useColorModeValue("gray.100", "gray.700");
  const treeBoxBorderColor = useColorModeValue("gray.300", "gray.600");
  const inputBackgroundColor = useColorModeValue("white", "gray.900");

  const toast = useToast();

  useEffect(() => {
    if (pokemonList && !isPokemonListLoading) {
      const decisionTree = generateTree(pokemonList, "name", [
        "type1",
        "type2",
        "ability1",
        "ability2",
        // "hp",
        // "attack",
        // "defense",
        // "specialAttack",
        // "specialDefense",
        // "speed",
        "experience",
      ]);

      setTree(decisionTree);
    }
  }, [pokemonList, isPokemonListLoading]);

  useEffect(() => {
    if (pokemon?.length) {
      setPokemonToPredict(JSON.stringify(pokemon[0]));
    }
  }, [pokemon]);

  const autoFillPokemon = async () => {
    await refetchPokemon();
  };

  const predictPokemonName = async () => {
    if (tree && pokemonToPredict) {
      try {
        const jsonPokemonToPredict = JSON.parse(pokemonToPredict);
        const predictedPokemon = await predict(
          tree,
          jsonPokemonToPredict as any
        );
        setPredictedPokemonName(predictedPokemon);
        toast({
          title: `Prediction: ${predictedPokemon}`,
          position: "top",
          isClosable: true,
          duration: null,
        });
      } catch (error) {
        console.error(error);
      }
    }
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
        <Link as={NavLink} to="/" _hover={{ color: "blue.400" }}>
          <ChevronLeftIcon boxSize="2rem" />
        </Link>
        <Heading as="h1">Pokemon demo</Heading>
      </HStack>
      <Box
        backgroundColor={treeDiagrambackgroundColor}
        borderColor={treeBoxBorderColor}
        borderWidth={1}
        height="100%"
        borderRadius="xl"
        overflow="hidden">
        <Skeleton
          isLoaded={!isPokemonListLoading && !!tree}
          startColor="pink.500"
          endColor="orange.500"
          width="100%"
          height="100%"
          position="relative">
          <InputGroup
            size="md"
            position="absolute"
            top={5}
            left={5}
            backgroundColor={inputBackgroundColor}
            width="auto"
            borderRadius="xl">
            <InputLeftElement marginLeft={2} width="4rem">
              <Button
                size="xs"
                onClick={autoFillPokemon}
                isLoading={isPokemonFetching}>
                Autofill
              </Button>
            </InputLeftElement>
            <Input
              paddingLeft={20}
              placeholder="Paste JSON attributes"
              value={pokemonToPredict}
              onChange={(e) => setPokemonToPredict(e.target.value)}
            />
            <InputRightElement>
              <IconButton
                colorScheme="green"
                size="sm"
                icon={<ChevronRightIcon />}
                aria-label="Predict"
                onClick={predictPokemonName}>
                Predict
              </IconButton>
            </InputRightElement>
          </InputGroup>
          {tree && <TreeDiagram data={tree} />}
        </Skeleton>
      </Box>
    </VStack>
  );
};
