import { useColorModeValue } from "@chakra-ui/color-mode";
import {
  Heading,
  HStack,
  LinkBox,
  LinkOverlay,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/layout";
import { NavLink } from "react-router-dom";
import { ChewedHeartIcon } from "../components/ChewedHeartIcon";
import { DemoItem } from "../components/DemoItem";
import { MusicIcon } from "../components/MusicIcon";
import { PokeballIcon } from "../components/PokeballIcon";

export const HomePage = () => {
  return (
    <VStack width="100%" alignItems="stretch" height="100%" spacing={4}>
      <Heading as="h1">Demos</Heading>
      <SimpleGrid columns={[1, 1, 2, 3]} spacing={10}>
        <DemoItem
          icon={
            <PokeballIcon
              boxSize="3rem"
              padding={3}
              backgroundColor="purple.300"
              borderRadius="full"
              textColor="white"
            />
          }
          title="Pokemon"
          description="Retrieved using PokeAPI"
          link="/demos/pokemon"
        />
        <DemoItem
          icon={
            <ChewedHeartIcon
              boxSize="3rem"
              padding={3}
              backgroundColor="purple.300"
              borderRadius="full"
              textColor="white"
            />
          }
          title="Heart disease"
          description="Retrieved from Kaggle"
          link="/demos/heart-disease"
        />
        <DemoItem
          icon={
            <MusicIcon
              boxSize="3rem"
              padding={3}
              backgroundColor="purple.300"
              borderRadius="full"
              textColor="white"
            />
          }
          title="Music genre"
          description="Retrieved from Kaggle"
          link="/demos/music-genre"
        />
      </SimpleGrid>
    </VStack>
  );
};
