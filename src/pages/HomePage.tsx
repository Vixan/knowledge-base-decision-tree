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
import { PokeballIcon } from "../components/PokeballIcon";

export const HomePage = () => {
  const demoItemBackgroundColor = useColorModeValue("gray.100", "gray.700");
  const demoItemBorderColor = useColorModeValue("gray.300", "gray.600");

  return (
    <VStack width="100%" alignItems="stretch" height="100%" spacing={4}>
      <Heading as="h1">Demos</Heading>
      <SimpleGrid columns={[1, 1, 2, 3]} spacing={10}>
        <LinkBox
          backgroundColor={demoItemBackgroundColor}
          borderRadius="xl"
          padding={6}
          borderWidth={1}
          borderColor={demoItemBorderColor}
        >
          <HStack>
            <PokeballIcon
              boxSize="3rem"
              padding={3}
              backgroundColor="purple.300"
              borderRadius="full"
              textColor="white"
            />
            <LinkOverlay as={NavLink} to="/demos/pokemon">
              <Text as="p" fontSize="lg" fontWeight="semibold">
                Pokemon dataset
              </Text>
              <Text fontSize="normal">Retrieved using PokeAPI</Text>
            </LinkOverlay>
          </HStack>
        </LinkBox>
      </SimpleGrid>
    </VStack>
  );
};
