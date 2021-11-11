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
  useColorModeValue,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { FC, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { TreeDiagram } from "../components/TreeDiagram";
import musicGenreDatasetJson from "../datasets/music-genre.json";
import { generateTree, predict, TreeNode } from "../utils/decision-tree";

const musicGenreDataset = musicGenreDatasetJson as Record<string, any>[];

export const MusicGenreDemoPage: FC = () => {
  const treeDiagrambackgroundColor = useColorModeValue("gray.100", "gray.700");
  const treeBoxBorderColor = useColorModeValue("gray.300", "gray.600");
  const inputBackgroundColor = useColorModeValue("white", "gray.900");

  const [tree, setTree] = useState<TreeNode | null>(null);
  const [predictedMusicGenre, setPredictedMusicGenre] = useState<number | null>(
    null
  );
  const [musicToPredict, setMusicToPredict] = useState<string>("");
  const autoFilledMusic = {
    artist_name: "Thievery Corporation",
    track_name: "The Shining Path",
    popularity: "30.0",
    key: "D",
    mode: "Major",
    obtained_date: "4-Apr",
  };

  const toast = useToast();

  useEffect(() => {
    if (musicGenreDataset.length) {
      const decisionTree = generateTree(musicGenreDataset, "music_genre", [
        "popularity",
        "key",
        "mode",
        "obtained_date",
      ]);

      setTree(decisionTree);
    }
  }, [musicGenreDataset]);

  const autoFillInput = async () => {
    setMusicToPredict(JSON.stringify(autoFilledMusic));
  };

  const predictMusicGenre = async () => {
    if (tree && musicToPredict) {
      try {
        const jsonMusicToPredict = JSON.parse(musicToPredict);
        const predictedMusicGenre = await predict(
          tree,
          jsonMusicToPredict as any
        );
        setPredictedMusicGenre(predictedMusicGenre);
        toast({
          title: `Prediction: ${predictedMusicGenre}`,
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
          <BreadcrumbLink href="/demo/music-genre">Music genre</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <HStack mb={8} alignItems="center">
        <Link as={NavLink} to="/" _hover={{ color: "blue.400" }}>
          <ChevronLeftIcon boxSize="2rem" />
        </Link>
        <Heading as="h1">Music genre demo</Heading>
      </HStack>
      <Box
        backgroundColor={treeDiagrambackgroundColor}
        borderColor={treeBoxBorderColor}
        borderWidth={1}
        borderRadius="xl"
        overflow="hidden"
        height="100%"
        width="100%"
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
            <Button size="xs" onClick={autoFillInput}>
              Autofill
            </Button>
          </InputLeftElement>
          <Input
            paddingLeft={20}
            placeholder="Paste JSON attributes"
            value={musicToPredict}
            onChange={(e) => setMusicToPredict(e.target.value)}
          />
          <InputRightElement>
            <IconButton
              colorScheme="green"
              size="sm"
              icon={<ChevronRightIcon />}
              aria-label="Predict"
              onClick={predictMusicGenre}>
              Predict
            </IconButton>
          </InputRightElement>
        </InputGroup>
        <Link
          position="absolute"
          right={5}
          bottom={2}
          fontSize="sm"
          href="https://www.kaggle.com/vicsuperman/prediction-of-music-genre"
          textColor="blue.400">
          from Kaggle
        </Link>

        {tree && <TreeDiagram data={tree} initialDepth={100} />}
      </Box>
    </VStack>
  );
};
