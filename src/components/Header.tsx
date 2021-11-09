import { IconButton } from "@chakra-ui/button";
import { useColorMode } from "@chakra-ui/color-mode";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { Image } from "@chakra-ui/image";
import { Flex, HStack, Text } from "@chakra-ui/layout";
import { FC } from "react";

export const Header: FC = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  const isDarkMode = colorMode === "dark";

  return (
    <Flex
      as="header"
      justify="space-between"
      alignContent="end"
      width="100%"
      alignItems="center"
    >
      <HStack alignItems="center">
        <Image src="/images/tree-logo.svg" boxSize="40px"></Image>
        <Text fontWeight="bold" fontSize="2xl" textColor="purple.400">
          Decision tree
        </Text>
      </HStack>
      <IconButton
        aria-label="Theme"
        onClick={toggleColorMode}
        icon={isDarkMode ? <SunIcon /> : <MoonIcon />}
      ></IconButton>
    </Flex>
  );
};
