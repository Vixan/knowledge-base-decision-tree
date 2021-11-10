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
          title="Pokemon dataset"
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
          title="Heart disease dataset"
          description="Retrieved from Kaggle"
          link="/demos/heart-disease"
        />
      </SimpleGrid>
    </VStack>
  );
};
