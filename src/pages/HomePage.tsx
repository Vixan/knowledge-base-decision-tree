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
import { MobilePhoneIcon } from "../components/MobilePhoneIcon";
import { MusicIcon } from "../components/MusicIcon";
import { PokeballIcon } from "../components/PokeballIcon";

export const HomePage = () => {
  return (
    <VStack width="100%" alignItems="stretch" height="100%" spacing={4}>
      <Heading as="h1">Demos</Heading>
      <SimpleGrid columns={[1, 1, 2, 2, 3]} spacing={10} gridAutoRows="1fr">
        <DemoItem
          icon={
            <PokeballIcon
              overflow="visible"
              boxSize="3rem"
              padding={3}
              backgroundColor="red.300"
              borderRadius="full"
              textColor="white"
            />
          }
          title="Pokemon"
          description="Predict pokemon name using some of its features"
          link="/demos/pokemon"
        />
        <DemoItem
          icon={
            <ChewedHeartIcon
              overflow="visible"
              boxSize="3rem"
              padding={3}
              backgroundColor="purple.300"
              borderRadius="full"
              textColor="white"
            />
          }
          title="Heart disease"
          description="Predict the gender of a person with a heart disease"
          link="/demos/heart-disease"
        />
        <DemoItem
          icon={
            <MusicIcon
              overflow="visible"
              boxSize="3rem"
              padding={3}
              backgroundColor="pink.300"
              borderRadius="full"
              textColor="white"
            />
          }
          title="Music genre"
          description="Predict the genre of a song"
          link="/demos/music-genre"
        />
        <DemoItem
          icon={
            <MobilePhoneIcon
              overflow="visible"
              boxSize="3rem"
              padding={3}
              backgroundColor="blue.300"
              borderRadius="full"
              textColor="white"
            />
          }
          title="Mobile phones"
          description="Predict the clock speed of a mobile phone using other specs"
          link="/demos/mobile-phone"
        />
      </SimpleGrid>
    </VStack>
  );
};
